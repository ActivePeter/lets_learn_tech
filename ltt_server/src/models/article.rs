use crate::models::user::{UserId, UserSimpleInfo};
pub type ArticleId=u32;

// article_info table in sql
/*
文章存储在本地的命名格式: 日期_文章id
 */

#[derive(Default)]
pub struct Article{
    pub id:ArticleId, // 文呼唤你u章id,用于在其他表里检索信息
    pub title:String,  // 文章标题
    pub content:String,
    // pub file_path:String,  // 文章存储在本地的位置
    pub author_id:UserId,  // 作者id，user表中的id
    pub create_time : String,  // 发布日期
    pub edit_time:String,
    pub tag_ids : Vec<i32> // 标签，至多有三个
}

//列表内 文章预览内容
pub struct ArticlePreview{
    pub id:ArticleId,
    pub title:String,
    pub contentcut:String,//局部内容
    pub authorinfo:UserSimpleInfo
}

//一页文章预览
pub struct PageOfArticle{
    pub pageindex:u32,
    pub articles:Vec<ArticlePreview>
}