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
use crate::models::article::{Article, ArticleId};
use crate::services;
pub async fn article_update(
    Json(payload): Json<RequestContent>,
) -> impl IntoResponse {

    match token::checktoken(payload.uid,payload.token).await{
        CheckTokenRes::Valid => {
            let res=services::article::G_ARTICLE_MAN.update_article(
                payload.aid,payload.tags,payload.content,payload.rawtext,payload.title
            ).await;
            if let Some(res)=res{
                return (StatusCode::OK, "").into_response();
            }else{
                return (StatusCode::BAD_REQUEST, "token_invalid").into_response();
            }
        }
        v=>{
            return v.invalid().into_response();
        }
    }
}

// // the input to our `create_user` handler
// #[derive(Deserialize,Serialize)]
// pub struct  ArticleNewResponse {
//     pub articleid:ArticleId
// }

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct RequestContent {
    pub aid:ArticleId,
    pub uid:UserId,
    pub token:String,
    pub tags:Vec<TagId>,
    pub content:String,
    pub rawtext:String,
    pub title:String,
}


