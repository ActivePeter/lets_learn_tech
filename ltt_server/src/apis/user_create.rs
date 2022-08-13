use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::models::user::User;
// use crate::services::user::{user_query, email_query, add_user};
use crate::services::user_manager::G_USER_MANAGER;

/*
用户创建逻辑：
1. 检查用户各个参数是否合理，合理才继续
2. 然后检查邮箱和用户名的唯一性，均为出现过则继续
3. 异步写入全局用户，同时分配id，随后写入数据库，使用读写锁保护并发
 */
pub async fn create_user(
    Json(payload): Json<CreateUserRequest>,
) -> impl IntoResponse {
    // todo: 验证码处理
    // todo : id处理
    let new_user = User{ id: -1, email:payload.email.clone(),
        username:payload.username.clone(),password:payload.password.clone()};
    let check = new_user.check();


    if let Some(r) =check{
        return (StatusCode::BAD_REQUEST,r).into_response()
    }

    // todo : 检查优化
    println!("username:{} email:{}",payload.username,payload.email);
    let userexist=  G_USER_MANAGER.check_username(&payload.username).await;
    if userexist{
        return (StatusCode::BAD_REQUEST,"user exist").into_response()
    }
    let emailexist=G_USER_MANAGER.check_email(&payload.email).await;
    if emailexist {
        return (StatusCode::BAD_REQUEST,"email exist").into_response()
    }
    // // 异步写入数据库
    // tokio::spawn();
    let res=G_USER_MANAGER.add_user(new_user).await;
    // 不返回id,出于安全问题，id仅后端与数据库交互使用，不直接作为参数。
    if res == true {
        return (StatusCode::CREATED, "user create success").into_response()
    }
    return (StatusCode::BAD_REQUEST,"db error").into_response()
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct CreateUserRequest {
    username:String, // the username utf8?
    email:String,    // the email
    password:String,  // the password of user
    verify:String   // verify code from verifycode
}


