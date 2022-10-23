use crate::models::article::ArticleId;
use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::UserId;
use crate::services::article::G_ARTICLE_MAN;
use crate::services::token::get_uid_bytoken;

#[derive(Deserialize, Serialize)]
pub struct ArticleDelRequest {
    str : String,
}

pub async fn print(
    Json(payload) : Json<ArticleDelRequest>
) -> impl IntoResponse {
    println!("{}",payload.str);
    return StatusCode::OK
}



