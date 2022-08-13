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

/// Our claims struct, it needs to derive `Serialize` and/or `Deserialize`
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
pub async fn init_from_config(mut secret:String){
    {
        let mut sec = TOKEN_SECRET.write().await;
        mem::swap(sec.deref_mut(), &mut secret);
    }
}

//需要保证uid有效
pub async fn maketoken(uid:UserId) -> String {
    let second=chrono::Local::now().timestamp();

    encode(&Header::default(), &Claims{
        uid,
        exp: second as u64+EXPIRE_SEC
    }, &EncodingKey::from_secret(TOKEN_SECRET.read().await.as_bytes())).unwrap()
}

pub enum CheckTokenRes{
    FailParse,
    Valid,
    Expire,
    NotMatchUid
}
pub async fn checktoken(uid:UserId,token:String)->CheckTokenRes{
    let token = decode::<Claims>(&token, &DecodingKey::from_secret(TOKEN_SECRET.read().await.as_bytes()), &Validation::default());
    match token{
        Ok(data) => {
            let second=chrono::Local::now().timestamp()  as u64;
            if data.claims.uid!=uid{
                return CheckTokenRes::NotMatchUid;
            }
            if second-data.claims.exp>0 {
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