use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use std::io;
use crate::memstate_lock;
use crate::memstate_lock::{add_user, email_query, user_query};
use crate::models::user::User;


pub async fn create_user(
    Json(payload): Json<CreateUserRequest>,
) -> impl IntoResponse {
    // 用户创建逻辑
    // todo:首先检查验证码，交给验证码模块处理

    let new_user = User{ id: -1, email:payload.email.clone(),
        username:payload.username.clone(),password:payload.password.clone()};
    let mut check = new_user.check();

    // 不符合要求
    if let Some(r) =check{
        return (StatusCode::BAD_REQUEST,r).into_response()
    }
    // 然后见检查邮箱和用户名的唯一性
    println!("username:{} email:{}",payload.username,payload.email);
    let userexist= user_query(&payload.username).await;
    if userexist{
        return (StatusCode::BAD_REQUEST,"user exist").into_response()
    }
    let emailexist=email_query(&payload.email).await;
    if(emailexist){
        return (StatusCode::BAD_REQUEST,"email exist").into_response()
    }
    // println!("Check result : {check}");
    // 两个检查都通过才返回201，否则返回一个其他值，另论
    // if check == true {
    let new_user = User{ id: -1, email:payload.email.clone(),
        username:payload.username.clone(),password:payload.password.clone()};
    tokio::spawn(add_user(new_user));
    // todo : 异步写入数据库
    // todo : id
    return (StatusCode::CREATED, "user create success").into_response()
    // }
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct CreateUserRequest {
    username:String, // the username utf8?
    email:String,    // the email
    password:String,  // the password of user
    verify:String   // verify code from verifycode
}


