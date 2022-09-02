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
    token : String,
    article_id : ArticleId
}

pub async fn article_del(
    Json(payload) : Json<ArticleDelRequest>
) -> impl IntoResponse {
    // 解码token里的uid
    let uid = match get_uid_bytoken(payload.token).await {
        Some(user) => {
            user
        }
        None => {
            return StatusCode::BAD_REQUEST
        }
    };
    // 得到该文章的作者的uid
    let author_id = match G_ARTICLE_MAN.get_author_id(payload.article_id).await {
        Some(id) => {
            id
        }
        None => {
            return StatusCode::BAD_REQUEST
        }
    };

    // token里的uid是否是作者的uid
    if uid != author_id  {
        return StatusCode::BAD_REQUEST
    }

    // 用户是该文章的作者
    G_ARTICLE_MAN.article_del(payload.article_id).await;
    return StatusCode::OK
}



