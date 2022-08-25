use crate::models::user::UserId;
use crate::models::article::ArticleId;

pub type CommentId=i64;

pub struct Comment{
    pub uid:UserId,
    pub content:String,
    pub to_comment_or_article:bool,
    pub cid:CommentId,
    pub to_cid:CommentId,
    pub aid:ArticleId,
    pub time:String
}