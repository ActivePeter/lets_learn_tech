use crate::*;
use std::cmp::Ordering;
use std::ptr::null;
use lazy_static::lazy_static;
use tokio_postgres::{Client, Error, Row};
use crate::models::user::User;
use tokio::sync::RwLock;
use crate::db::user::{UserDbHandler};
use std::mem;
use std::ops::{DerefMut, Deref};

// use std::alloc::Global;

pub struct UserManager {
    dbhandler : RwLock<UserDbHandler>,//更新连接时写，操作数据库时读
    //将manager锁移到内部
    users : RwLock<Vec<User>>,//
    inited:RwLock<bool>//在链接生效前和失效后，都置为false
}


impl UserManager {
    pub fn new() -> UserManager {
        UserManager{
            // user_client : Vec::new(),
            dbhandler: RwLock::new(UserDbHandler::new()),
            users : RwLock::new(Vec::new()),
            inited:RwLock::new(false)
        }
    }
    pub async fn on_db_disco(&self){
        (*self.inited.write().await)=false;
    }
    pub async fn update_user_db_client(&self, mut client:Client){
        //还未初始化完，要避免业务操作。
        self.dbhandler.write().await.update_db_client_handle(client);
        let rows_ =self.dbhandler.read().await
            .db_get_all_user().await;
        if let Some(rows)=rows_{
            for row in rows.iter(){
                let id : i32 = row.get(0);
                let username : String = row.get(1);
                let password : String = row.get(2);
                let email :String = row.get(3);
                let new_user = User{id,username: username.trim_end().parse().unwrap(),password :
                password.trim_end().parse().unwrap(),email:email.trim_end().parse().unwrap()};
                println!("db : user : {} {} {} {}",new_user.id,new_user.username,
                         new_user.password,new_user.email);
                self.push_user(new_user,true).await;
                //global_db.g_users.push(new_user);
            }
            (*self.inited.write().await)=true;
        }
    }
    // 此处将userclient移到 db::sql 下，因为这是数据库client，与用户并没有关联
    // pub async fn set_client(&mut self, client : Client ) {
    //     if self.user_client.is_empty() == false {
    //         self.user_client[0] = client;
    //     }else{
    //         self.user_client.push(client);
    //     }
    // }
    pub async fn check_username(&self , username : &String) -> bool{
        if !self.inited.read().await.deref(){
            return false;
        }
        for user in self.users.read().await.iter() {
            match user.username.cmp(username){
                Ordering::Equal => {
                    return false
                }
                _ => {}
            }
        }
        true
    }

    //没有返回true
    pub async fn check_email(&self , email : &String) -> bool{
        if !self.inited.read().await.deref(){
            return false;
        }

        for user in self.users.read().await.iter() {
            match user.email.cmp(email){
                Ordering::Equal => {
                    return false
                }
                _ => {}
            }
        }
        true
    }

    pub async fn check_password(&self,is_name : bool,key : &String, password : &String) -> bool {
        if !self.inited.read().await.deref(){
            return false;
        }

        for user in self.users.read().await.iter() {
            let cmp_value : &String;
            if is_name {
                cmp_value = &user.username;
            }else {
                cmp_value = &user.email;
            }
            match key.cmp(cmp_value) {
                Ordering::Equal => {
                        match user.password.cmp(password){
                            Ordering::Equal =>{
                                return true
                            }
                            _ => {}
                        }
                }
                _ => {}
            }
        }
        return false
    }

    pub async fn add_user(&self, new_user : User ) -> bool {
        if !self.inited.read().await.deref(){
            return false;
        }
        //由于这里有数据库操作，所以usermanager不应该加锁，只对内部存储数据加锁
        match self.dbhandler.read().await.db_create_user(&new_user).await{
            None => {false}
            Some(_) => {

                self.users.write().await.push(new_user);
                true
            }

        }
        // let mut insert_cmd = format!("insert into user_info values ({},'{}','{}','{}')"
        //                              ,new_user.id,new_user.username,new_user.password,new_user.email);
        // println!("insert_cmt {}",insert_cmd);
        // let insert_result =
        //     .query(&insert_cmd,&[]).await;
        // if insert_result.is_err() {
        //     eprintln!("insert error: {}", insert_result.unwrap_err());
        // }else{
        // }
    }

    //一种情况是数据库初始化时。
    //一种是初始化后的业务操作
    pub async fn push_user(&self, new_user : User,initing:bool ){
        if initing || *self.inited.read().await {
            println!("New user !");
            self.users.write().await.push(new_user);
        }
    }
}

lazy_static! {
    pub static ref G_USER_MANAGER : UserManager = UserManager::new();
}
