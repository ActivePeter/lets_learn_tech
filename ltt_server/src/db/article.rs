//操作article的表

use crate::db::sql::DbHandler;
use crate::models::tag::{TagInfo, TagId};

// 表划分
// article_info
//   articleid
//   author_uid
//   tag_ids
//   content
//   comment_ids
impl DbHandler{
    pub async fn create_article_table(&self){

    }

    pub async fn db_create_article(&self){

    }
    pub async fn db_remove_article(&self){

    }
    pub async fn db_edit_article(&self){

    }

    pub async fn db_search_article_bytags(&self,tags:Vec<TagId>){
        // 由user_manger调用
        if tags.len()
        let mut insert_cmd = format!("SELECT * FROM public.article_info\n
            WHERE articleid in\n
            (SELECT articleid FROM public.article_tag_relation\n
            WHERE tagid in (1,2))"
                                     , );
        println!("insert_cmt {}", insert_cmd);

        let insert_result = self.get().await
            .query(&insert_cmd, &[]).await;
    }
}