use std::thread;
use std::thread::Thread;
use std::time::Duration;
use crate::G_VERIFY_MANAGER;
use crate::services::verifycode::FAIL_TIME;

#[tokio::test(flavor = "multi_thread", worker_threads = 1)]
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
            let result = G_VERIFY_MANAGER.verify(&get_str,value).await;
            if result == true {
                println!("First get success");
            }else{
                return
            }
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
            let f_result =
                G_VERIFY_MANAGER.verify(&get_str,first_result.unwrap()).await;
            assert_eq!(f_result,false);

            let l_result =
                G_VERIFY_MANAGER.verify(&get_str,third_result.unwrap()).await;
            assert_eq!(l_result,true);
        }
    }
    println!("Pass all verify code test")
}