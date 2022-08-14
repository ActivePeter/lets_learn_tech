use crate::*;
use std::cmp::Ordering;
use std::ptr::null;
use lazy_static::lazy_static;
use tokio_postgres::{Client, Error, Row};
use crate::models::user::{User, UserId};
use tokio::sync::RwLock;
use std::mem;
use std::ops::{DerefMut, Deref};
use crate::db::sql::{DbHandler, get_dbhandler};

pub struct UserManager {
    users : RwLock<Vec<User>>,//内存状态的修改再数据库后，所以不用担心断开后与数据库不一致，
}

impl UserManager {
    pub fn new() -> UserManager {
        UserManager{
            users : RwLock::new(Vec::new()),
        }
    }
    pub async fn update_user_from_db(&self){
        let handler=get_dbhandler().await;
            let rows_ =handler.db_get_all_user().await;
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
                    self.users.write().await.push(new_user);
                    //global_db.g_users.push(new_user);
                }
            }
    }

    pub async fn search_user_by_id(&self,uid:UserId)->Option<User>{
        for user in self.users.read().await.iter() {
            if user.id==uid {
                return Some(user.clone())
            }
        }
        return None
    }

    pub async fn search_user(&self,username_or_email:&String)->Option<User>{
        for user in self.users.read().await.iter() {
            match user.username.cmp(&username_or_email){
                Ordering::Equal => {
                    return Some(user.clone())
                }
                _ => {}
            }
            if user.email==*username_or_email{
                return Some(user.clone())
            }
        }
        return None
    }

    pub async fn check_username(&self , username : &String) -> bool{
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

    // 调用db_handler的读锁,添加成功返回true,添加失败返回false
    pub async fn add_user(&self, mut new_user: User ) -> bool {
        match get_dbhandler().await.db_create_user(&mut new_user).await{
            false => {false}
            true => {
                self.users.write().await.push(new_user);
                true
            }
        }
    }

}
lazy_static! {
    pub static ref G_USER_MANAGER : UserManager = UserManager::new();
}
