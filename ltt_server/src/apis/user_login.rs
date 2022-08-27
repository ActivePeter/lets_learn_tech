use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::UserId;


pub async fn user_login(
    Json(payload): Json<UserLoginRequest>,
) -> impl IntoResponse {
    let uid = match G_USER_MANAGER.search_user(&payload.name_or_email).await
    {
        Some(user) => {
            if user.check_pw_right( &payload.password ){
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
    pub password: String, // the password of user
    pub verify: String,   // verify code from verifycode
}


