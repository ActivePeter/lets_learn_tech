use serde::{Deserialize, Serialize};
use serde_json::json;
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey, TokenData};
use chrono;
use std::borrow::BorrowMut;
use tokio::sync::RwLock;
use std::ops::DerefMut;
use std::mem;
use jsonwebtoken::errors::Error;
use lazy_static::lazy_static;
use crate::models::user::UserId;

// Our claims struct, it needs to derive `Serialize` and/or `Deserialize`
#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    uid:UserId,
    exp: u64,
}

lazy_static! {
    pub static ref TOKEN_SECRET: RwLock<String> =RwLock::new( String::new());
    // pub static ref TEST:Test=Test::new();
}
const EXPIRE_SEC:u64=60*60*24*15;//15 day

// todo : 不知道哪里调用了这个函数
pub async fn init_from_config(mut secret:String){
    {
        let mut sec = TOKEN_SECRET.write().await;
        mem::swap(sec.deref_mut(), &mut secret);
    }
}

//需要保证uid有效
pub async fn maketoken(uid:UserId) -> String {
    // 用于设置过期时间
    let second=chrono::Local::now().timestamp();

    // 生成JWT，主要用于保存uid
    // 用于加密的key是服务器配置的
    // todo : 安全性思考
    encode(&Header::default(), &Claims{
        uid,
        exp: second as u64
            +EXPIRE_SEC
    }, &EncodingKey::from_secret(TOKEN_SECRET.read().await.as_bytes())).unwrap()
}

pub enum CheckTokenRes{
    FailParse,
    Valid,
    Expire,
    NotMatchUid
}

// 解析token
pub async fn checktoken(uid:UserId,token:String)->CheckTokenRes{
    // 解析用于验证的token
    let token = decode::<Claims>(&token,
                                 &DecodingKey::from_secret(TOKEN_SECRET.read().await.as_bytes()),
                                 &Validation::default());
    match token{
        Ok(data) => {
            let second=chrono::Local::now().timestamp()  as u64;

            println!("{} {}",serde_json::to_string(&data.claims).unwrap(),second);
            if data.claims.uid!=uid{
                return CheckTokenRes::NotMatchUid;
            }
            // 过期
            if second > data.claims.exp{
                return CheckTokenRes::Expire;
            }
            CheckTokenRes::Valid
            // Ch
        }
        Err(e) => {
            log::debug!("{}",e);

            CheckTokenRes::FailParse
        }
    }
}