use crate::models::user::{UserId, UserSimpleInfo};
pub type ArticleId=u32;
//store in sql
pub struct Article{
    pub id:ArticleId,
    pub title:String,
    pub content:String,
    pub author:UserId
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