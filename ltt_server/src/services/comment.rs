use crate::models::user::UserId;
use crate::models::comment::{CommentId, Comment};
use crate::models::article::ArticleId;
use crate::db::sql::get_dbhandler;
use crate::services::user_manager::UserManager;
use crate::services::article::ArticleManager;
use std::collections::HashMap;
use tokio::sync::RwLock;
lazy_static::lazy_static! {
    pub static ref G_COMMENT_MAN : CommentManager = CommentManager::new();
}


pub struct CommentManager {
    comment2some: RwLock<HashMap<CommentId, (ArticleId)>>,
}

pub enum AddCommentRes {
    // CantCommentSelf,
    ArticleNotExist,
    UserNotExist,
    ToCommentNotOk,
    Succ(CommentId),
    DbFail,
}

impl CommentManager {
    pub fn new() -> CommentManager {
        CommentManager {
            comment2some: Default::default()
        }
    }
    pub fn get() -> &'static G_COMMENT_MAN {
        &G_COMMENT_MAN
    }
    pub async fn load_all(&self) {
        //加载commentmap
    }

    pub async fn _add_comment_nocheck(
        &self, uid: UserId,
        content: &String,
        to_comment_or_article: bool,
        to_cid: CommentId,
        aid: ArticleId, ) -> Option<CommentId> {
        let res = get_dbhandler().await.db_create_comment(uid,
                                                          content,
                                                          to_comment_or_article,
                                                          to_cid,
                                                          aid).await;
        if let Some(res) = res {
            self.comment2some.write().await.insert(res, aid);
        }
        res
        // self.comment2some.write().await.insert()
    }
    pub async fn get_comments_of_article(
        &self,
        aid: ArticleId,
    ) -> Vec<Comment> {
        if !ArticleManager::get().is_article_exist(aid).await {
            eprintln!("article not exist");
            return Vec::new();
        }
        return get_dbhandler().await.db_get_comments_of_article(aid).await;
    }
    pub async fn add_comment(
        &self,
        uid: UserId,
        content: &String,
        to_comment_or_article: bool,
        to_cid: CommentId,
        aid: ArticleId,
    ) -> AddCommentRes {
        //1.user
        if UserManager::get().search_user_by_id(uid).await.is_none() {
            return AddCommentRes::UserNotExist;
        }
        //文章不存在
        let a = ArticleManager::get().get_article_by_id(aid).await;
        if a.is_none() {
            return AddCommentRes::ArticleNotExist;
        }
        if to_comment_or_article {
            let hold=self.comment2some.read().await;
            let c2a = hold.get(&to_cid);
            match c2a {
                None => {
                    eprintln!("cmt not fount {}",to_cid);
                    return AddCommentRes::ToCommentNotOk;
                }
                Some(c2a) => {
                    if *c2a != aid {//指向的评论个文章id不匹配
                        eprintln!("cmt not match art");
                        return AddCommentRes::ToCommentNotOk;
                    }
                }
            }
        }
        if let Some(id) = self._add_comment_nocheck(
            uid,
            content,
            to_comment_or_article,
            to_cid,
            aid,
        ).await {
            return AddCommentRes::Succ(id);
        }
        AddCommentRes::DbFail
    }
}