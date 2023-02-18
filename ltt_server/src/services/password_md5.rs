/*
密码原则：
1. 不直接传输密码明文
2. 明文不落地，不存储在任何地方 包括 ： 数据库，缓存等

加密算法选用： hash + 盐值
盐值 ： 一个随机数，与加密后的密码同时保存
加密过程 ： 接口收到明文密码后，判断正常注册逻辑后，随机得到一个盐值，
然后进行hash，得到加密的密码，同时要存储盐值
验证过程 ： 取出对应盐值，重复上述操作，判断是否相等。

盐值混入逻辑：

 */

const SALT_LENGTH: u32 = 6;

use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use std::ptr::hash;
use rand::{random, Rng};

//数据库只能存i64
pub fn hash_u64_to_i64(hash:u64)->i64{
    let num = unsafe {
        std::mem::transmute::<u64, i64>(hash)
    };
    num
}
pub fn hash_i64_to_u64(hash_in_db:i64)->u64{
    let num = unsafe {
        std::mem::transmute::<i64, u64>(hash_in_db)
    };
    num
}

/*
  @参数: length : 获取随机字符串的长度
  @返回值： 一个随机字符串长度为length
 */
pub async fn get_random_string(length : u32) ->String {
    let mut result = String::with_capacity(length as usize);
    let mut  rng = rand::thread_rng();
    //use visible string
    let chars = String::from("ABCDEFGHIJKLMNOPQRSZUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_=+-*/");
    for _ in 0..length {
        result.push(chars.get(rng.next_u32() % chars.len()).unwrap());
    }
    return result;
}

/*
    @参数 : password : 待加密字符串
    @返回值 ： 元祖（加密结果，盐值） 两者都需保存都数据库中
 */

pub async fn encrypt_password(password : &String) -> (u64,String) {
    let salt = get_random_string(SALT_LENGTH).await;
    let mut hash_value = password.clone();

    return (get_hash_value(&salt,password),salt)
}

/*
使用盐值加密字符串返回结果
 */
pub fn get_hash_value(salt : &String, password :&String) -> u64 {
    let mut hash_value = password.clone();
    hash_value.reserve(hash_value.len() + salt.len());
    for char_of_salt in salt.chars() {
        hash_value.push(char_of_salt);
    }
    //FIXME:use sha256
    //https://docs.rs/sha256/latest/sha256/
    //use sha256::{digest, try_digest};
    //let input = String::from("hello");
    //let val = digest(input);
    let mut hasher = DefaultHasher::default();
    hash_value.hash(&mut hasher);
    hasher.finish()
}