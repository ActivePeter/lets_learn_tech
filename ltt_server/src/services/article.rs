use crate::db::sql::get_dbhandler;
use crate::models::tag::TagId;
use crate::models::user::UserId;
use crate::models::article::{ArticleId, Article};
use crate::services;
pub struct ArticleManager {}

lazy_static::lazy_static! {
    pub static ref G_ARTICLE_MAN : ArticleManager = ArticleManager::new();
}

impl ArticleManager {
    pub fn new() -> ArticleManager {
        return ArticleManager {};
    }

    pub async fn update_article(
        &self,
        aid:ArticleId,
        tags:Vec<TagId>,
        content:String,
        rawtext:String,
        title:String,
    )->bool{

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

            services::tag::G_TAG_MAN.memonly_add_articles_2_tags(
                &*tags,&[res]
            ).await;
        }
        res
    }

    pub async fn get_article_by_id(&self, id:ArticleId) -> Option<Article> {
        get_dbhandler().await
            .db_get_article_by_id(id).await
    }
}

//
