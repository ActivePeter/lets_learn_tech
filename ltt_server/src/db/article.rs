//操作article的表

use crate::db::sql::DbHandler;
use crate::models::tag::{TagInfo, TagId};
use deadpool_postgres::tokio_postgres::{Error, Row};
use crate::models::article::{Article, ArticleId};
use crate::models::user::UserId;
// use deadpool_postgres::tokio_postgres;
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

    pub async fn db_article_search_bytags(&self, tags: &Vec<TagId>) -> Option<Vec<Article>> {
        // 由user_manger调用
        let cmd = if tags.len() == 0 {
            "SELECT articleid,author_uid,content,tags,title, \
                    to_char(createtime,'yyyy-mm-dd hh24:mi:ss'),\
                    to_char(edittime,'yyyy-mm-dd hh24:mi:ss') \
                FROM public.article_info"
                .to_string()
        } else {
            let mut cmdmake =
                "SELECT articleid,author_uid,content,tags,title, \
                    to_char(createtime,'yyyy-mm-dd hh24:mi:ss'),\
                    to_char(edittime,'yyyy-mm-dd hh24:mi:ss')\
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
        println!("article search {:?}", result);
        match result{
            Ok(rows) => {
                let mut vec=Vec::new();
                for v in rows{
                    let mut ar:Article=Default::default();
                    ar.id=v.get::<usize,i64>(0) as ArticleId;
                    ar.author_id=v.get::<usize,i64>(1) as UserId;
                    ar.content=v.get(2);
                    ar.title=v.get(4);
                    ar.create_time=v.get(5);
                    ar.edit_time=v.get(6);
                    let tags:String=v.get(3);
                    ar.tag_ids=serde_json::from_str(&*tags).unwrap();
                    vec.push(ar)
                }
                Some(vec)
            }
            Err(_) => {None}
        }
    }
}