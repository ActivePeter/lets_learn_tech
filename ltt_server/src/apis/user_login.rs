use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::{User, UserId};
use std::future::Future;
/*
用户创建逻辑：
1. 检查用户各个参数是否合理，合理才继续
2. 然后检查邮箱和用户名的唯一性，均为出现过则继续
3. 异步写入全局用户，同时分配id，随后写入数据库，使用读写锁保护并发
 */
pub async fn user_login(
    Json(payload): Json<UserLoginRequest>,
) -> impl IntoResponse {
    let uid = match G_USER_MANAGER.search_user(&payload.name_or_email).await
    {
        Some(user) => {
            if user.password != payload.password {
                return (StatusCode::BAD_REQUEST, "wronginfo").into_response();
            }
            user.id
        }
        None => {
            return (StatusCode::BAD_REQUEST, "wronginfo").into_response();
        }
    };
    //经过检测之后，返回token
    let tokenres = token::maketoken(uid).await;
    let resp = UserLoginResponse {
        token: tokenres,
        uid,
    };
    return (StatusCode::OK, serde_json::to_string(&resp).unwrap()).into_response();
}

// the input to our `create_user` handler
#[derive(Deserialize, Serialize)]
pub struct UserLoginResponse {
    pub token: String,
    pub uid: UserId,
}

// the input to our `create_user` handler
#[derive(Deserialize, Serialize)]
pub struct UserLoginRequest {
    pub name_or_email: String,
    pub password: String,
    // the password of user
    pub verify: String,   // verify code from verifycode
}


