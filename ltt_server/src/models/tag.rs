use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use crate::models::article::{Article, ArticleId};

/*
标签数据模型的设计：
2.  用户可以通过检索比标签id检索对应文章
3. 如果这样频繁与数据库交互会有性能问题，缓存怎么设计？
缓存问题后期再想一想，现在数据量不大，直接问数据库也不是不行
但后期数据量假如起来了，比如有一百多篇文章，缓存热门标签对应的文章
hash<TagId,Vec<ArticleId>> 现在暂时不考虑这个东西
 */

#[derive(Deserialize, Serialize)]
pub struct TagInfo{
    tag_id:u32,
    tag_name:String,
}

pub struct TagSet {
    tag_id : u32,
    tag_name : String,
    articles : Vec<ArticleId>
}

pub struct TagQuery {
    m_tag : HashMap<String,TagSet>
}