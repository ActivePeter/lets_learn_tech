use std::thread;
use std::thread::Thread;
use std::time::Duration;
use crate::G_VERIFY_MANAGER;
use crate::services::verifycode::FAIL_TIME;

pub async fn verifycode_check(){
    let get_str = "127.0.0.1".to_string();

    let first_result = G_VERIFY_MANAGER.get_code(&get_str).await;

    match first_result{
        None =>{
            println!("First get error !");
            return
        }
        Some(value) => {
            println!("First get result {}",value);
        }
    }

    let second_result = G_VERIFY_MANAGER.get_code(&get_str).await;
    match second_result {
        None => {
            println!("Second get nothing , success!");
        }
        Some(value) => {
            println!("Second get {}",value);
            return;
        }
    }
    thread::sleep(Duration::from_secs(FAIL_TIME  as u64 ));

    let third_result = G_VERIFY_MANAGER.get_code(&get_str).await;
    match third_result {
        None => {
            println!("Third get nothing , failed!");
            return;
        }
        Some(value) => {
            println!("Third get {}",value);
        }
    }
}