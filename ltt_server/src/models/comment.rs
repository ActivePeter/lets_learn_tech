use crate::models::user::UserId;
use crate::models::article::ArticleId;
use serde::{Deserialize, Serialize};

pub type CommentId=i64;

#[derive(Deserialize, Serialize)]
pub struct Comment{
    pub uid:UserId,
    pub content:String,
    pub to_comment_or_article:bool,
    pub cid:CommentId,
    pub to_cid:CommentId,
    pub aid:ArticleId,
    pub time:String
}