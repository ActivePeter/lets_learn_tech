//操作article的表

use crate::db::sql::DbHandler;
use crate::models::tag::{TagInfo, TagId};
use deadpool_postgres::tokio_postgres::{Error, Row};
use crate::models::article::{Article, ArticleId, ArticlePreview};
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

    async fn create_article_table(&self) {}
    pub async fn db_get_article_by_id(&self,id:ArticleId)->Option<Article>{
        let mut cmd=format!("SELECT articleid,
       author_uid,
       content,
       tags,
       title,
       to_char(createtime, 'yyyy-mm-dd hh24:mi:ss'),
       to_char(edittime, 'yyyy-mm-dd hh24:mi:ss')
        FROM public.article_info
        WHERE articleid = {}",id);
        let res=self.get().await
            .query(&*cmd,&[]).await;
        match res{
            Ok(vec) => {
                if vec.len()>0{
                    let row=&vec[0];
                    let tagstr:String=row.get(3);
                    return Some(Article{
                        id,
                        title: row.get(4),
                        content: row.get(2),
                        author_id: row.get::<usize, i64>(1) as UserId,
                        create_time: row.get(5),
                        edit_time:row.get(6),
                        tag_ids: serde_json::from_str(&*tagstr).unwrap()
                    })
                }
                None
            }
            Err(_) => {
                None
            }
        }
    }
    pub async fn db_update_article(
        &self,
        aid:ArticleId,
        tags:&Vec<TagId>,
        content: String,
        rawtext: String,
        title: String,
    )->bool{
        let res=self.get().await.query(
            &*format!("select update_article({},$1::TEXT,$2::TEXT,$3::TEXT,ARRAY{}::integer[])"
            ,aid,serde_json::to_string(tags).unwrap()
        ), &[&title,&content,&rawtext,]).await;
        match res{
            Ok(res) => {
                if res.len()>0 &&res[0].get::<usize,i64>(0)==1 {
                    return true;
                }
                return false;
            }
            Err(e) => {
                eprintln!("db error {:?}", e);
                false
            }
        }
    }
    pub async fn db_create_article(
        &self,
        uid:UserId,
        tags: &Vec<TagId>,
        content: String,
        rawtext: String,
        title: String, )->Option<ArticleId>{
        let tagsstr=serde_json::to_string(&tags).unwrap();
        let mut cmd=format!("select create_article($1::TEXT,$2::TEXT,$3::TEXT,{},ARRAY{}::integer[]);",
                         uid,tagsstr);
        let db=self.get().await;
        let ret=match db.query(&*cmd,&[
            &title,&content,&rawtext
        ]).await{
            Ok(row) => {
                let v:i64=row[0].get(0);
                Some(v as ArticleId)
            }
            Err(e) => {
                eprintln!("db err cmd {:?}",cmd);
                eprintln!("db err{:?}",e);
                None
            }
        };
        ret
    }
    pub async fn db_remove_article(&self) {}
    pub async fn db_edit_article(&self) {}

    pub async fn db_articlepreview_search_bytags(&self, tags: &Vec<TagId>) -> Option<Vec<ArticlePreview>> {
        // 由user_manger调用
        let cmd = if tags.len() == 0 {
            "SELECT articleid,author_uid,substring(rawtext,0,100),tags,title, \
                    to_char(createtime,'yyyy-mm-dd hh24:mi:ss'),\
                    to_char(edittime,'yyyy-mm-dd hh24:mi:ss') \
                FROM public.article_info ORDER BY edittime DESC"
                .to_string()
        } else {
            let mut cmdmake =
                "SELECT articleid,author_uid,rawtext,tags,title, \
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
            cmdmake += ")) ORDER BY edittime DESC";

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
                    let mut ar: ArticlePreview = Default::default();
                    ar.id = v.get::<usize, i64>(0) as ArticleId;
                    ar.author_id = v.get::<usize, i64>(1) as UserId;
                    ar.preview = v.get(2);
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