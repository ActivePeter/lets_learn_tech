use std::cmp::Ordering;
use tokio::sync::RwLock;
use lazy_static::*;
use crate::user::User;
////有锁
pub struct MemStateWithLock{
    pub g_users : Vec<User>
}
impl MemStateWithLock{//如果数据相关性不大，就把大锁拆开
    pub fn new() -> RwLock<MemStateWithLock> {
        //tokio的读写锁有运行时优化
        RwLock::new(MemStateWithLock{
                g_users : Vec::new()
        })
    }
}
//很多数据结构需要用到堆区，所以需要在运行期初始化
lazy_static! {
    pub static ref MEM_STATE_WITH_LOCK: RwLock<MemStateWithLock> = MemStateWithLock::new();
}
async fn v(){
    //读
    // MEM_STATE_WITH_LOCK.read().await.xxx

    //写
    // MEM_STATE_WITH_LOCK.write().await.xxx
}

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
    users.g_users.push(new_user)
}