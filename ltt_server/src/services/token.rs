use serde::{Deserialize, Serialize};
use serde_json::json;
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey, TokenData};
use chrono;
use std::borrow::BorrowMut;
use tokio::sync::RwLock;
use std::ops::DerefMut;
use std::mem;
use jsonwebtoken::errors::Error;

/// Our claims struct, it needs to derive `Serialize` and/or `Deserialize`
#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    exp: u64,
}
// pub struct Test{
//     pub testchildlock1:RwLock<u64>,//writable
//     pub testchildlock2:RwLock<u64>,//writable
//     pub testchildnolock:u64//cant write
// }
// impl Test{
//     pub fn new() -> Test {
//         return Test{
//             testchildlock1: RwLock::new(0),
//             testchildlock2: RwLock::new(0),
//             testchildnolock: 0
//         }
//     }
// }
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

pub async fn maketoken() -> jsonwebtoken::errors::Result<String> {
    let second=chrono::Local::now().timestamp();

    encode(&Header::default(), &Claims{
        exp: second as u64+EXPIRE_SEC
    }, &EncodingKey::from_secret(TOKEN_SECRET.read().await.as_bytes()))
}
pub enum CheckTokenRes{
    FailParse,
    Valid,
    Expire,
}
pub async fn checktoken(token:String)->CheckTokenRes{
    let token = decode::<Claims>(&token, &DecodingKey::from_secret(TOKEN_SECRET.read().await.as_bytes()), &Validation::default());
    match token{
        Ok(data) => {
            let second=chrono::Local::now().timestamp()  as u64;
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