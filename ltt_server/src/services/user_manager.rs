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
use crate::services::password_md5::{encrypt_password, get_hash_value, hash_i64_to_u64, hash_u64_to_i64};

pub struct UserManager {
    users: RwLock<Vec<User>>,//内存状态的修改再数据库后，所以不用担心断开后与数据库不一致，
}

impl UserManager {
    pub fn get() -> &'static UserManager {
        &G_USER_MANAGER
    }
    pub fn new() -> UserManager {
        UserManager {
            users: RwLock::new(Vec::new()),
        }
    }
    pub async fn update_user_from_db(&self) {
        let handler = get_dbhandler().await;
        let rows_ = handler.db_get_all_user().await;
        if let Some(rows) = rows_ {
            for row in rows.iter() {
                let id: i32 = row.get(0);
                let username: String = row.get(1);
                let mut password: String = row.get(2);
                password= password.trim_end().parse().unwrap();
                let email: String = row.get(3);
                let mut pw_hash:Option<i64>=row.get(4);
                if pw_hash.is_none(){//未加密密码，
                    let (hash,salt)=encrypt_password(&password).await;
                    handler.db_update_user_pw(id as UserId,&salt,hash).await;
                    pw_hash=Some(hash_u64_to_i64(hash));
                    password=salt;
                }
                let new_user = User {
                    id,
                    username: username.trim_end().parse().unwrap(),
                    pw_salt:password,
                    pw_hash:hash_i64_to_u64(pw_hash.unwrap()),
                    email: email.trim_end().parse().unwrap(),
                };
                // println!("db : user : {} {} {} {}", new_user.id, new_user.username,
                //          new_user.password, new_user.email);
                self.users.write().await.push(new_user);
                //global_db.g_users.push(new_user);
            }
        }
    }

    pub async fn search_user_by_id(&self, uid: UserId) -> Option<User> {
        for user in self.users.read().await.iter() {
            if user.id == uid {
                return Some(user.clone());
            }
        }
        return None;
    }

    pub async fn search_user(&self, username_or_email: &String) -> Option<User> {
        for user in self.users.read().await.iter() {
            match user.username.cmp(&username_or_email) {
                Ordering::Equal => {
                    return Some(user.clone());
                }
                _ => {}
            }
            if user.email == *username_or_email {
                return Some(user.clone());
            }
        }
        return None;
    }

    pub async fn check_username(&self, username: &String) -> bool {
        for user in self.users.read().await.iter() {
            match user.username.cmp(username) {
                Ordering::Equal => {
                    return false;
                }
                _ => {}
            }
        }
        true
    }

    //没有返回true
    pub async fn check_email(&self, email: &String) -> bool {
        for user in self.users.read().await.iter() {
            match user.email.cmp(email) {
                Ordering::Equal => {
                    return false;
                }
                _ => {}
            }
        }
        true
    }

    pub async fn check_both_exist(&self, username: &String, email: &String) -> bool {
        for user in self.users.read().await.iter() {
            match user.email.cmp(email) {
                Ordering::Equal => {
                    return true;
                }
                _ => {}
            }
            match user.username.cmp(username) {
                Ordering::Equal => {
                    return true;
                }

                _ => {}
            }
        }
        false
    }


    // 先对user pw进行加密
    // 调用db_handler的读锁,添加成功返回true,添加失败返回false
    pub async fn add_user(&self, new_user: &mut User) -> bool {
        let (hash,salt)=encrypt_password(&new_user.pw_salt).await;
        new_user.pw_hash=hash;
        new_user.pw_salt=salt;
        match get_dbhandler().await.db_create_user(new_user).await {
            false => { false }
            true => {
                // println!("new user {}",new_user.id);
                self.users.write().await.push(new_user.clone());
                true
            }
        }
    }
}
lazy_static! {
    pub static ref G_USER_MANAGER : UserManager = UserManager::new();
}
