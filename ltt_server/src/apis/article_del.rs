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
use crate::apis::api_generated::{ArticleDeleteReq, ArticleDeleteResp};


pub(crate) async fn article_del(
    Json(payload) : Json<ArticleDeleteReq>
) -> impl IntoResponse {
    let invalid=|info:&str|{
        (StatusCode::OK, serde_json::to_string(&ArticleDeleteResp {
            succ1_fail0: 0,
            info: info.to_string()
        }).unwrap()).into_response()
    };
    // 解码token里的uid
    let uid = match get_uid_bytoken(payload.token).await {
        Some(user) => {
            user
        }
        None => {
            return invalid( "invalid token")
        }
    };
    // 得到该文章的作者的uid
    let author_id = match G_ARTICLE_MAN.get_author_id(payload.articleid).await {
        Some(id) => {
            id
        }
        None => {
            return invalid( "invalid token")
        }
    };

    // token里的uid是否是作者的uid
    if uid != author_id  {
        return invalid( "invalid token")
    }

    // 用户是该文章的作者
    G_ARTICLE_MAN.article_del(payload.articleid).await;
    (StatusCode::OK, serde_json::to_string(&ArticleDeleteResp {
        succ1_fail0: 1,
        info: "".to_string()
    }).unwrap()).into_response()
}



