use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::{G_USER_MANAGER, UserManager};
use crate::models::user::{User, UserId};
use std::future::Future;
use crate::services::token::CheckTokenRes;
use crate::models::tag::TagId;
use crate::models::article::{Article, ArticleId};
use crate::services;
use crate::models::path::article_path;

pub async fn article_update(
    Json(payload): Json<RequestContent>,
) -> impl IntoResponse {

    match token::checktoken(payload.uid,payload.token).await{
        CheckTokenRes::Valid => {
            if services::article::G_ARTICLE_MAN.is_article_exist(payload.aid).await{
                let res=services::article::G_ARTICLE_MAN.update_article(
                    payload.aid,payload.tags,payload.content,payload.rawtext,payload.title.clone()
                ).await;
                if res{
                    services::robot_service::G_ROBOT_MAN.send_msg(
                        &format!("{} 在社区更新了文章 《{}》, 快去看看吧！{}",
                            UserManager::get().search_user_by_id(payload.uid).await.unwrap().username,
                            payload.title.trim_end(),
                            article_path(payload.aid)
                        )
                    ).await;
                    return (StatusCode::OK, "").into_response();
                }else{
                    return (StatusCode::BAD_REQUEST, "fail").into_response();
                }
            }
            return (StatusCode::BAD_REQUEST, "notexist").into_response();
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


