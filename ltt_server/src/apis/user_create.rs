use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::models::user::User;
// use crate::services::user::{user_query, email_query, add_user};
use crate::services::user_manager::G_USER_MANAGER;
use crate::services::verifycode::G_VERIFY_MANAGER;
use crate::services::token::maketoken;
use crate::apis::user_login::UserLoginResponse;
/*
用户创建逻辑：
1. 检查用户各个参数是否合理，合理才继续
2. 然后检查邮箱和用户名的唯一性，均为出现过则继续
3. 异步写入全局用户，同时分配id，随后写入数据库，使用读写锁保护并发
 */
pub async fn create_user(
    Json(payload): Json<CreateUserRequest>,
) -> impl IntoResponse {
    let mut new_user = User {
        id: -1,
        email: payload.email.clone(),
        username: payload.username.clone(),
        pw_salt: payload.password.clone(),
        pw_hash: 0,
    };
    // 检查用户名，邮箱名，密码中是否含有空格
    let check = new_user.check();

    if let Some(r) = check {
        return (StatusCode::BAD_REQUEST, r).into_response();
    }
    println!("username:{} email:{}", payload.username, payload.email);

    // 检查用户名和邮箱的唯一性
    let is_exist = G_USER_MANAGER
        .check_both_exist(&new_user.username, &new_user.email).await;

    if is_exist {
        return (StatusCode::BAD_REQUEST, "Username or email already exist").into_response();
    }

    // 验证验证码
    if G_VERIFY_MANAGER.verify_code(&payload.email, payload.verify).await {
        let res = G_USER_MANAGER.add_user(&mut new_user).await;
        // 不返回id,出于安全问题，id仅后端与数据库交互使用，不直接作为参数。
        // 返回JWT
        if res == true {
            let token = maketoken(new_user.id).await;
            let resp = UserLoginResponse {
                token,
                uid: new_user.id,
            };
            return (StatusCode::CREATED, serde_json::to_string(&resp).unwrap()).into_response();
        }
        return (StatusCode::BAD_REQUEST, "db error").into_response();
    }
    return (StatusCode::BAD_REQUEST, "wrong verify").into_response();
}

// the input to our `create_user` handler
#[derive(Deserialize, Serialize)]
pub struct CreateUserRequest {
    username: String,
    // the username utf8?
    email: String,
    // the email
    password: String,
    // the password of user
    verify: u32,   // verify code from verifycode
}


