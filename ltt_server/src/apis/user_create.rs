use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use std::io;
use crate::memstate_lock;
use crate::memstate_lock::{add_user, email_query, user_query};
use crate::user;
use crate::user::User;

pub async fn create_user(
    Json(payload): Json<CreateUser>,
) -> impl IntoResponse {
    // 用户创建逻辑
    // todo:首先检查验证码，交给验证码模块处理

    let new_user = User{ id: -1, email:payload.email.clone(),
        username:payload.username.clone(),password:payload.password.clone()};
    let mut check = new_user.check();

    // 不符合要求
    if check == false {
        return (StatusCode::BAD_REQUEST,"Valid parameters").into_response()
    }
    // 然后见检查邮箱和用户名的唯一性
    println!("username:{} email:{}",payload.username,payload.email);
    check = !(user_query(&payload.username).await
        || email_query(&payload.email).await);
    println!("Check result : {check}");
    // 两个检查都通过才返回201，否则返回一个其他值，另论
    if check == true {
        let new_user = User{ id: -1, email:payload.email.clone(),
            username:payload.username.clone(),password:payload.password.clone()};
        tokio::spawn(add_user(new_user));
        // todo : 异步写入数据库
        // todo : id
        return (StatusCode::CREATED, "user create success").into_response()
    }
    return (StatusCode::BAD_REQUEST,"username or email already exist").into_response()
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct CreateUser {
    username:String, // the username utf8?
    email:String,    // the email
    password:String,  // the password of user
    verify:String   // verify code from verifycode
}