// 验证码是发到邮箱里的，根据随机函数随机生成一个六位整数
// 然后将这样一个pair加入到一个哈希表中
// 最后就是定时功能，超过一定时间这个验证码就失效。

use axum::{Json, http};
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::verifycode::G_VERIFY_MANAGER;
use crate::services::email_service::{G_EMAIL_MANAGER, EmailSendResult};
use crate::models::user::UserId;
use axum::body::{HttpBody, Body};
use axum::extract::ConnectInfo;
use std::net::SocketAddr;
use std::future::Future;
use crate::models::tag::TagId;
use crate::db::sql::get_dbhandler;
use crate::models::article::{Article, ArticlePreview, ArticleId};
// use std::alloc::Global;
use crate::services;
use crate::models::comment::CommentId;
use crate::services::comment::{CommentManager, AddCommentRes};
use crate::services::token::CheckTokenRes;

pub async fn comment_to(
    ConnectInfo(_addr): ConnectInfo<SocketAddr>,
    mut req: Json<RequestContent>,
) -> impl IntoResponse {
    let mut t=String::new();
    std::mem::swap(&mut t ,&mut req.token);
    match token::checktoken(req.uid,t).await{
        CheckTokenRes::Valid => {
        }
        v=>{
            return v.invalid().into_response();
        }
    }
    match CommentManager::get().add_comment(
        req.uid,&req.content,req.to_comment_or_article,req.to_cid,req.aid
    ).await{
        AddCommentRes::ArticleNotExist => {
            (StatusCode::BAD_REQUEST, "ArticleNotExist").into_response()}
        AddCommentRes::UserNotExist => {
            (StatusCode::BAD_REQUEST, "UserNotExist").into_response()}
        AddCommentRes::ToCommentNotOk => {
            (StatusCode::BAD_REQUEST, "ToCommentNotOk").into_response()}
        AddCommentRes::Succ(id) => {
            (StatusCode::OK, serde_json::to_string(
                &ResponseContent{
                    cid: id
                }
            ).unwrap()).into_response()
        }
        AddCommentRes::DbFail => {
            (StatusCode::BAD_REQUEST, "dbfail").into_response()
        }
    }

}

// the input to our `create_user` handler
#[derive(Deserialize, Serialize)]
pub struct RequestContent {
    pub uid:UserId,
    pub token:String,
    pub content:String,
    pub to_comment_or_article:bool,
    pub to_cid:CommentId,
    pub aid:ArticleId,
}

#[derive(Deserialize, Serialize)]
pub struct ResponseContent{
    pub cid:CommentId
}