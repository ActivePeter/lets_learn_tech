use std::collections::HashMap;
use std::ops::Sub;
use chrono::Utc;
use lazy_static::lazy_static;
use tokio::sync::RwLock;

use rand::prelude::*;

#[derive(Copy,Clone)]
struct ValueCode{
    code : u32,
    get_time : chrono::DateTime<Utc>
}

pub struct VerifyCodeManager{
    codes : RwLock<HashMap<String,ValueCode>>
}

/*
超过一分钟可重新发送，超过五分钟失效

 */

// 秒为单位,超时后失效，从map移除
pub static FAIL_TIME: i64 = 120;
static NEW_CODE_PERMIT_TIME:i64=60;

impl VerifyCodeManager{
    pub fn new() -> VerifyCodeManager {
        VerifyCodeManager{
            codes : RwLock::new(HashMap::new())
        }
    }

    pub async fn verify_code(&self,key:&String,code:u32)->bool{
        self.fresh_code().await;
        if let Some(v)=self.codes.read().await.get(key){
            if code==v.code {
                return true
            }
        }
        return false
    }

    pub async fn fresh_code(&self)  {
        let mut failed_code = Vec::new();
        for (k,v) in self.codes.write().await.iter() {
           // 负数
            if Utc::now().sub(v.get_time).num_seconds()  >= FAIL_TIME {
                failed_code.push(k.clone());
            }
        }
        println!("Failed num : {}",failed_code.len());
        if failed_code.len()!=0{
            let mut hold=self.codes.write().await;
            for s in failed_code {
                hold.remove(&s);
            }
        }
    }

    pub async fn get_code(&self, content : &String) -> Option<u32> {
        self.fresh_code().await;
        // 这里为什么获取写锁，因为先获取读锁，这个锁不会释放，再次申请写锁，由于同一线程，会造成死锁问题
        let mut hash_table = self.codes.write().await;
        let value_code = hash_table.get(content);
        match value_code {
            None => {
                let mut rng = rand::thread_rng();
                let result: u32 = rng.gen_range(100000..999999);
                hash_table.insert(content.clone(),ValueCode{get_time:Utc::now(),code : result});
                Some(result)
            }
            Some(get_value) => {
                // 小于60秒不重发
                if Utc::now().sub(get_value.get_time).num_seconds() <= NEW_CODE_PERMIT_TIME{
                    return None
                }
                let result = get_value.code;
                Some(result)
            }
        }
    }

}
lazy_static! {
    pub static ref G_VERIFY_MANAGER : VerifyCodeManager = VerifyCodeManager::new();
}
