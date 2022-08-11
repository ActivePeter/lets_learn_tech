use std::cmp::Ordering;
use crate::models::user::User;
use crate::db::user::db_create_user;
use crate::memstate_lock::MEM_STATE_WITH_LOCK;

//用户相关的逻辑，给api层调用
pub async fn user_query(query_username : &String) -> bool {
    let users = MEM_STATE_WITH_LOCK.read().await;
    for user in users.g_users.iter() {
        match user.username.cmp(query_username){
            Ordering::Equal => {
                return true;
            }
            _ => {}
        }
    }
    false
}

pub async fn email_query(query_email : &String) -> bool {
    let users = MEM_STATE_WITH_LOCK.read().await;
    println!("Emial query !");
    for user in users.g_users.iter() {
        match user.email.cmp(query_email){
            Ordering::Equal => {
                println!("Find !");
                return true;
            }
            _ => {
                println!("Emial not found #{}# #{}#",query_email,user.email);
            }
        }
    }
    false
}

pub async fn add_user(new_user : User) {
    let mut users = MEM_STATE_WITH_LOCK.write().await;
    println!("Add new user !");
    db_create_user(&new_user,&users.db_client[0]).await;
    users.g_users.push(new_user);
}