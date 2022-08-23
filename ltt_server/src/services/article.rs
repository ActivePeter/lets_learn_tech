use crate::db::sql::get_dbhandler;
use crate::models::tag::TagId;
use crate::models::user::UserId;
use crate::models::article::ArticleId;

pub struct ArticleManager {}

lazy_static::lazy_static! {
    pub static ref G_ARTICLE_MAN : ArticleManager = ArticleManager::new();
}

impl ArticleManager {
    pub fn new() -> ArticleManager {
        return ArticleManager {};
    }
    pub async fn new_article(
        &self,
        uid:UserId,
        tags: Vec<TagId>,
        content: String,
        preview: String,
        title: String,
    ) -> Option<ArticleId> {
        let db=get_dbhandler().await;
        let res=db.db_create_article(
            uid,
            &tags,
            content,
            preview,
            title,
        ).await;
        res
    }
}

//
