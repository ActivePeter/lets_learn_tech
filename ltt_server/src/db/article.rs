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
const INITCMDS:&'static[&'static str]= &[
    // create_article func
    "CREATE OR REPLACE FUNCTION create_article( \
	 title_ text,content_ text,uid_ bigint,tagids bigint[]) \
  RETURNS bigint \
  LANGUAGE plpgsql \
 AS \
 $$ \
 declare \
  count bigint; \
  id_ bigint; \
 begin \
  with jjj as (insert into article_info(author_uid,content, \
   						 createtime,edittime,title, \
   						tags)					\
   			values(uid_,content_,now(), now(),title_, \
				   '['||array_to_string(tagids,',')||']') \
   			 RETURNING articleid) \
 	select * from jjj into count; \
	FOREACH id_ in  ARRAY tagids LOOP \
		insert into article_tag_relation(articleid,tagid) \
		values(count,id_); \
	END LOOP; \
  return count; \
 end; \
 $$"
];


impl DbHandler {

    pub async fn article_init(&self){
        self.create_article_table().await;
        let db=self.get().await;
        for cmd in INITCMDS{
            db.query(*cmd,&[]).await.unwrap();
        }

    }
    async fn create_article_table(&self) {}

    pub async fn db_create_article(
        &self,
        uid:UserId,
        tags: &Vec<TagId>,
        content: String,
        preview: String,
        title: String, )->Option<ArticleId>{
        let tagsstr=serde_json::to_string(&tags).unwrap();
        let mut cmd=format!("select create_article({},{},{},ARRAY{});",
                         title,content,uid,tagsstr);
        let db=self.get().await;
        let ret=match db.query(&*cmd,&[]).await{
            Ok(row) => {
                let v:i64=row[0].get(0);
                Some(v as ArticleId)
            }
            Err(_) => {
                None
            }
        };
        ret
    }
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
        match result {
            Ok(rows) => {
                let mut vec = Vec::new();
                for v in rows {
                    let mut ar: Article = Default::default();
                    ar.id = v.get::<usize, i64>(0) as ArticleId;
                    ar.author_id = v.get::<usize, i64>(1) as UserId;
                    ar.content = v.get(2);
                    ar.title = v.get(4);
                    ar.create_time = v.get(5);
                    ar.edit_time = v.get(6);
                    let tags: String = v.get(3);
                    ar.tag_ids = serde_json::from_str(&*tags).unwrap();
                    vec.push(ar)
                }
                Some(vec)
            }
            Err(_) => { None }
        }
    }
}