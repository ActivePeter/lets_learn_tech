use crate::models::user::UserId;
use crate::models::comment::{CommentId, Comment};
use crate::models::article::ArticleId;
use crate::db::sql::get_dbhandler;
use crate::services::user_manager::UserManager;
use crate::services::article::ArticleManager;
use std::collections::HashMap;
use tokio::sync::RwLock;
use std::ops::DerefMut;
use serde::__private::de::TagContentOtherField::Tag;
use crate::models::path::article_path;
use crate::models::tag::TagId;
use crate::services;
use crate::services::tag::{TagManager, tags_format_string, tags_format_string2};
lazy_static::lazy_static! {
    pub static ref G_COMMENT_MAN : CommentManager = CommentManager::new();
}


pub type CommentManager_Comment2Some=HashMap<CommentId, (ArticleId)>;

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
        let mut res =get_dbhandler().await.db_comment_loadall().await;
        std::mem::swap(&mut res,
                       self.comment2some.write().await.deref_mut());
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
    pub async fn update_comment(&self){

    }
    pub async fn add_comment(
        &self,
        uid: UserId,
        content: &String,
        to_comment_or_article: bool,
        to_cid: CommentId,
        aid: ArticleId,
    )
        -> AddCommentRes {
        //1.user
        if UserManager::get().search_user_by_id(uid).await.is_none() {
            return AddCommentRes::UserNotExist;
        }
        //文章不存在
        let a = ArticleManager::get().get_article_by_id(aid).await;
        if a.is_none() {
            return AddCommentRes::ArticleNotExist;
        }
        let a=a.unwrap();
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
            let tagids=a.tag_ids.iter().map(|v|{*v as TagId}).collect::<Vec<TagId>>();
            let tags=TagManager::get().get_tags_clone(
                &tagids).await;
            services::robot_service::G_ROBOT_MAN.send_msg(
                &format!("{} 在文章《{}》下发表了评论, 快去围观围观～{}, {}",
                         UserManager::get().search_user_by_id(uid).await.unwrap().username,
                         a.title.trim_end(),
                         article_path(aid),tags_format_string2(tags.iter())
                )
            ).await;
            return AddCommentRes::Succ(id);
        }
        AddCommentRes::DbFail
    }
}