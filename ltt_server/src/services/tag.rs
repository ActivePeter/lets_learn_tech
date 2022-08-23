use tokio::sync::RwLock;
use std::collections::{HashMap, HashSet};
use crate::models::tag::{TagId, TagInfo};
use crate::models::article::ArticleId;

pub struct TagManager {
    //setname->tagids
    tagsets: RwLock<HashMap<String, HashSet<TagId>>>,
    //tagname->tagid
    tagname_2_tagid: RwLock<HashMap<String, TagId>>,
    //tagid->taginfo
    tags: RwLock<HashMap<TagId, TagInfo>>,
}
lazy_static::lazy_static! {
    pub static ref G_TAG_MAN : TagManager = TagManager::new();
}

pub enum AddTagRes {
    Exist,
    Ok(TagId),
}

pub enum RemoveTagRes {
    NotFound,
    Ok,
}

pub enum RenameTagRes {
    NotFound,
    Exist,
    Ok,
}

impl TagManager {
    pub fn new() -> TagManager {
        TagManager {
            tagsets: Default::default(),
            tagname_2_tagid: Default::default(),
            tags: Default::default(),
        }
    }
    pub async fn addtag(&self, tagname: String) -> AddTagRes {
        if self.tagname_2_tagid.read().await.get(&tagname).is_some() {
            return AddTagRes::Exist;
        }
        // 1.todo 数据库操作
        // 2.
        //将从数据库分配到的tagid存入内存
        let mut name2id = self.tagname_2_tagid.write().await;
        let mut id2info = self.tags.write().await;
        
        AddTagRes::Ok(1)
    }
    pub async fn removetag(&self, tagid: TagId) -> RemoveTagRes {
        if self.tags.read().await.get(&tagid).is_none() {
            return RemoveTagRes::NotFound;
        }
        //1.todo 数据库操作


        //2.内存操作，需要原子改变两个映射
        let mut name2id = self.tagname_2_tagid.write().await;
        let mut id2info = self.tags.write().await;
        let res=id2info.remove(&tagid).unwrap();
        name2id.remove(&res.tag_name).unwrap();
        for a in res.articles{
            //todo 解除文章绑定，
        }

        return RemoveTagRes::Ok;
    }
    pub async fn renametag(&self, tagid: TagId, name: String) -> RenameTagRes {
        //检查名字已存在
        match self.tagname_2_tagid.read().await.get(&name) {
            Some(id_) => {
                return RenameTagRes::Exist;
                // RenameTagRes::Ok
            }
            _ => {}
        }
        if self.tags.read().await.get(&tagid).is_none() {
            return RenameTagRes::NotFound;
        }
        //1.todo 这里首先要改数据库
        //变名字，需要原子改变两个映射
        let mut name2id = self.tagname_2_tagid.write().await;
        let mut id2info = self.tags.write().await;
        let info = id2info.get_mut(&tagid).unwrap();
        // return match info{
        //     None => {
        //         RenameTagRes::NotFound
        //     }
        //     Some(info) => {


        name2id.remove(&info.tag_name);
        info.tag_name = name.clone();
        name2id.insert(name, info.tag_id);
        RenameTagRes::Ok
        //     }
        // }
    }

    //memonly 非单独操作，
    // 一般是创建或修改文章后，sql改变文章tag关系,
    // 将变更同步到内存
    pub async fn memonly_add_articles_2_tag(&self, aid: &[ArticleId]) {}
    pub async fn memonly_remove_articles_2_tag(&self, aid: &[ArticleId]) {}
}