use crate::services::password_md5;
use crate::services::password_md5::{encrypt_password, get_hash_value, get_random_string};

#[tokio::test(flavor = "multi_thread", worker_threads = 1)]
pub async fn random_string_check() {
    /*
    测试盐值正常生成
     */
    for i in 1..10 {
        print!("Get random string  {}  \n",get_random_string(6).await);
    }
}

#[tokio::test(flavor = "multi_thread", worker_threads = 1)]
pub async fn encrypt_test() {
    let password = String::from("fortesthhh123");
    let (result,salt) = encrypt_password(&password).await;
    /*
   相同盐值，再次加密，得到的hash值应该相同
     */
    let check_result = get_hash_value(
        &salt,&password
    );
    if result == check_result {
        println!("Pass encrypt password test ! ");
    }else {
        panic!("Encrypt password get different result ");
    }
    /*
    不同盐值，相同密码，得出的hash值应不同，当然也有可能碰撞，但是概率太小太小
     */
    let wrong_salt = String::from("hhh123");
    let wrong_result = get_hash_value(&wrong_salt,&password);
    if result == wrong_result {
        panic!("Wrong salt get right password ");
    }else {
        println!("Pass all encrypt_test");
    }
}

