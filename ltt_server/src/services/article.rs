use crate::db::sql::get_dbhandler;
use crate::models::tag::TagId;
use crate::models::user::UserId;
use crate::models::article::{ArticleId, Article};
use crate::services;
use std::collections::HashMap;
use tokio::sync::RwLock;

pub type ArticleManagerMapSome=HashMap<ArticleId,UserId>;
pub struct ArticleManager {
    aid2some:RwLock<ArticleManagerMapSome>
}

lazy_static::lazy_static! {
    pub static ref G_ARTICLE_MAN : ArticleManager = ArticleManager::new();
}

impl ArticleManager {
    pub fn new() -> ArticleManager {
        return ArticleManager { aid2some: Default::default() };
    }
    pub fn get() -> &'static G_ARTICLE_MAN {
        &G_ARTICLE_MAN
    }
    pub async fn first_load(&self){
        let res=get_dbhandler().await.get().await.query(
            "select articleid,author_uid from article_info",&[]).await.unwrap();
        let mut hold =self.aid2some.write().await;
        for r in res{
            let aid:i64=r.get(0);
            let uid:i64=r.get(1);
            hold.insert(aid as u32, uid as i32);
        }
    }
    pub async fn is_article_exist(&self, aid:ArticleId) -> bool {
        self.aid2some.read().await.get(&aid).is_some()
    }
    pub async fn update_article(
        &self,
        aid:ArticleId,
        tags:Vec<TagId>,
        content:String,
        rawtext:String,
        title:String,
    )->bool{
        let res=get_dbhandler().await
            .db_update_article(aid,&tags,content,rawtext,title).await;
        if res {
            //更新tag状态
            services::tag::G_TAG_MAN.memonly_article_tags_rebind(aid,&tags).await;
        }
        res
    }
    pub async fn new_article(
        &self,
        uid:UserId,
        tags: Vec<TagId>,
        content: String,
        rawtext: String,
        title: String,
    ) -> Option<ArticleId> {
        let db=get_dbhandler().await;
        let res=db.db_create_article(
            uid,
            &tags,
            content,
            rawtext,
            title,
        ).await;
        if let Some(res)=res{

            services::tag::G_TAG_MAN.memonly_article_tags_rebind(
                res,&tags
            ).await;
            self.aid2some.write().await.insert(res,uid);
        }
        res
    }

    pub async fn get_article_by_id(&self, id:ArticleId) -> Option<Article> {
        get_dbhandler().await
            .db_get_article_by_id(id).await
    }
}

//
