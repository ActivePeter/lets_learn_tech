use tokio::sync::RwLock;
use std::collections::{HashMap, HashSet};
use crate::models::tag::{TagId, TagInfo};

pub struct TagManager{
    //setname->tagids
    tagsets:RwLock<HashMap<String,HashSet<TagId>>>,
    //tagname->tagid
    tagname_2_tagid:RwLock<HashMap<String,TagId>>,
    //tagid->taginfo
    tags:RwLock<HashMap<TagId,TagInfo>>
}
lazy_static::lazy_static! {
    pub static ref G_TAG_MAN : TagManager = TagManager::new();
}

pub enum AddTagRes{
    Exist,
    Ok(TagId)
}
pub enum RemoveTagRes{
    NotFound,
    Ok
}
impl TagManager{
    pub fn new() -> TagManager {
        TagManager{
            tagsets: Default::default(),
            tagname_2_tagid: Default::default(),
            tags:  Default::default()
        }
    }
    pub async fn addtag(&self, tagname:String) -> AddTagRes {
        if self.tagname_2_tagid.read().await.get(&tagname).is_some(){
            return AddTagRes::Exist
        }
        AddTagRes::Ok(1)
    }
    pub async fn removetag(&self,tagid:TagId)->RemoveTagRes{
        if self.tags.read().await.get(&tagid).is_none(){
            return RemoveTagRes::NotFound
        }
        return RemoveTagRes::Ok
    }
}