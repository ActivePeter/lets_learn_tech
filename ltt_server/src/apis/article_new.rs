use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::{User, UserId};
use std::future::Future;
use crate::services::token::CheckTokenRes;
use crate::models::tag::TagId;
use crate::models::article::Article;

pub async fn article_new(
    Json(payload): Json<ArticleNewRequest>,
) -> impl IntoResponse {
    match token::checktoken(payload.uid,payload.token).await{
        CheckTokenRes::Valid => {

        }
        v=>{
          return v.into_common_response();
        }
    }
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct  ArticleNewResponse {
    pub article:Article
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct ArticleNewRequest {
    pub uid:UserId,
    pub token:String,
    pub tags:Vec<TagId>,
    pub content:String,
    pub preview:String,
    pub title:String,
}


