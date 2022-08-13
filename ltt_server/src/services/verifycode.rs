use std::collections::HashMap;
use std::ops::Sub;
use chrono::Utc;
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

impl VerifyCodeManager{
    pub fn new() -> VerifyCodeManager {
        VerifyCodeManager{
            codes : RwLock::new(HashMap::new())
        }
    }

    pub async fn fresh_code(&mut self)  {
        let mut failed_code = Vec::new();
        for (k,v) in self.codes.write().await.iter() {
            if v.get_time.sub(Utc::now()).num_minutes() >= 5 {
                failed_code.push(k.clone());
            }
        }
        for s in failed_code {
            self.codes.write().await.remove(&s);
        }
    }

    pub async fn get_code(&mut self, content : &String) -> Option<u32> {
        self.fresh_code().await;
        let hash_table = self.codes.read().await;
        let value_code = hash_table.get(content);
        match value_code {
            None => {
                let mut rng = rand::thread_rng();
                let result: u32 = rng.gen();
                self.codes.write().await.insert(content.clone(),ValueCode{get_time:Utc::now(),code : result});
                Some(result)
            }
            Some(ValueCode) => {
                if value_code.unwrap().get_time.sub(Utc::now()).num_seconds() <= 60{
                    return None
                }
                let result = value_code.unwrap().code;
                Some(result)
            }
        }
    }

}
