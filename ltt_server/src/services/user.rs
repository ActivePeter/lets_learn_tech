use std::cmp::Ordering;
use crate::models::user::User;
use crate::db::user::db_create_user;
use crate::services::user_manager::G_USER_MANAGER;
use crate::memstate_lock::MEM_STATE_WITH_LOCK;

//用户相关的逻辑，给api层调用
pub async fn user_query(query_username : &String) -> bool {
    G_USER_MANAGER.check_username(query_username).await
}

pub async fn email_query(query_email : &String) -> bool {
    G_USER_MANAGER.check_email(query_email).await
}

pub async fn add_user(new_user : User)->bool {
    G_USER_MANAGER.add_user(new_user).await
}