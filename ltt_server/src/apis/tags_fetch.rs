use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::{User, UserId};
use std::future::Future;
use crate::services::token::CheckTokenRes;

pub async fn tags_fetch(
    Json(payload): Json<UserBasicInfoRequest>,
) -> impl IntoResponse {
    //     return (StatusCode::OK,serde_json::to_string(&resp).unwrap() ).into_response()

    return (StatusCode::BAD_REQUEST, "notfound").into_response()
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct UserBasicInfoResponse {
    pub uid:UserId,
    pub username: String,//用户名
    pub email:String
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct UserBasicInfoRequest {
    pub uid:UserId,
}


