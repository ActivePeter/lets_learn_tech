use std::cmp::Ordering;
use std::ptr::null;
use lazy_static::lazy_static;
use tokio_postgres::Client;
use crate::models::user::User;
use tokio::sync::RwLock;

pub struct UserManager {
    user_client : Vec<Client>,
    users : Vec<User>
}


impl UserManager {
    pub fn new() -> RwLock<UserManager> {
        RwLock::new(UserManager{
            user_client : Vec::new(),
            users : Vec::new()
        })
    }
    pub async fn set_client(&mut self, client : Client ) {
        if self.user_client.is_empty() == false {
            self.user_client[0] = client;
        }else{
            self.user_client.push(client);
        }
    }
    pub async fn check_username(&self , username : &String) -> bool{
        for user in self.users.iter() {
            match user.username.cmp(username){
                Ordering::Equal => {
                    return false
                }
                _ => {}
            }
        }
        true
    }

    pub async fn check_email(&self , email : &String) -> bool{
        for user in self.users.iter() {
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
        for user in self.users.iter() {
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

    pub async fn add_user(&mut self, new_user : User ){
        let mut insert_cmd = format!("insert into user_info values ({},'{}','{}','{}')"
                                     ,new_user.id,new_user.username,new_user.password,new_user.email);
        println!("insert_cmt {}",insert_cmd);
        let insert_result = self.user_client[0].
            query(&insert_cmd,&[]).await;
        if insert_result.is_err() {
            eprintln!("insert error: {}", insert_result.unwrap_err());
        }else{
            self.users.push(new_user);
        }
    }

    pub fn push_user(&mut self, new_user : User ){
        println!("New user !");
        self.users.push(new_user);
    }
}

lazy_static! {
    pub static ref G_USER_MANAGER : RwLock<UserManager> = UserManager::new();
}
