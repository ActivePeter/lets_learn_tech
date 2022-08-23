//操作article的表

use crate::db::sql::DbHandler;
use std::collections::{HashMap, HashSet};
use crate::models::tag::{TagId, TagInfo};
use deadpool_postgres::tokio_postgres::{Error, Row};
use crate::models::article::ArticleId;

// 表划分
// article_info
//   articleid
//   author_uid
//   tag_ids
//   content
//   comment_ids
impl DbHandler{
    pub async fn create_tag_table(&self){

    }
    // pub fn makecmd_insert_relation_tags_to_article(
    //     &self,tags:Vec<TagId>,article:ArticleId)->String{
    //     if tags.len()==0{
    //         return String::new();
    //     }
    //     let mut cmd="insert into article_tag_relation(articleid,tagid) values".to_string();
    //     let mut first=true;
    //     for t in &tags{
    //         if !first{
    //             cmd+= &*format!(",({},{})", article, t)
    //         }else{
    //             cmd+= &*format!("({},{})", article, t)
    //         }
    //         first=false
    //     }
    //     cmd+=";";
    //     cmd
    // }
    pub async fn db_create_tag(&self){

    }
    pub async fn db_remove_tag(&self){

    }
    pub async fn db_edit_tag(&self){

    }
    pub async fn db_get_all_taginfo(&self)->Option<( HashMap<TagId,TagInfo>,
                                                    HashMap<String,HashSet<TagId>> )>{
        let res=
            self.get().await.query("select * from tag_info",&[]).await;

        return match res{
            Ok(res) => {
                let mut map:HashMap<TagId,TagInfo>=Default::default();
                let mut groups:HashMap<String,HashSet<TagId>>=Default::default();
                for row in res{
                    let tagid:TagId=row.get::<usize,i64>(0) as TagId;
                    let tagname:String=row.get(1);
                    let group:String=row.get(2);
                    map.insert(tagid,TagInfo{
                        tag_id:tagid,
                        tag_name:tagname,
                        articles: Default::default()
                    });
                    if groups.get(&group).is_none(){
                        groups.insert(group.clone(),Default::default());
                    }
                    let a= groups.get_mut(&group).unwrap();
                    a.insert(tagid);
                }
                let res=self.get().await.query(
                    "select tagid,articleid from article_tag_relation \
                    order by tagid",&[]).await.unwrap();
                for r in res{
                    let tagid:TagId=r.get::<usize,i64>(0) as TagId;
                    let artid:ArticleId=r.get::<usize,i64>(1) as ArticleId;
                    map.get_mut(&tagid).unwrap().articles.insert(artid);
                }
                Some((map,groups))
            }
            Err(e) => {
                eprintln!("{:?}",e);
                None}
        }
    }
}