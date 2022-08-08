use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use std::io;

pub async fn create_user(
    Json(payload): Json<CreateUser>,
) -> impl IntoResponse {
    // 用户创建逻辑
    // 首先检查验证码，交给验证码模块处理
    // 然后见检查邮箱和用户名的唯一性
    // 两个检查都通过才返回201，否则返回一个其他值，另论
    (StatusCode::CREATED, Json(payload))
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct CreateUser {
    username:String, // the username utf8?
    email:String,    // the email
    password:String,  // the password of user
    verify:String   // verify code from verifycode
}