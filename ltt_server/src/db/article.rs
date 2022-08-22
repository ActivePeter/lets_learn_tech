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
impl DbHandler {
    pub async fn create_article_table(&self) {}

    pub async fn db_create_article(&self) {}
    pub async fn db_remove_article(&self) {}
    pub async fn db_edit_article(&self) {}

    pub async fn db_article_search_bytags(&self, tags: &Vec<TagId>) {
        // 由user_manger调用
        let cmd = if tags.len() == 0 {
            format!("SELECT * FROM public.article_info")
        } else {
            let mut cmdmake =
                "SELECT articleid,author_uid,content,tags,title, \
                    createtime,\
                    edittime \
                 FROM public.article_info \
                WHERE articleid in \
                (SELECT articleid FROM public.article_tag_relation \
                WHERE tagid in ("
                    .to_string();
            let mut first = true;
            for i in tags {
                if !first {
                    cmdmake += &*format!(",{}", i)
                } else {
                    cmdmake = cmdmake + &*i.to_string()
                }
                first = false
            }
            cmdmake += "))";

            cmdmake
        };
        // let mut insert_cmd =

        let result = self.get().await
            .query(&cmd, &[]).await;
        println!("article search {:?}", result)
    }
}