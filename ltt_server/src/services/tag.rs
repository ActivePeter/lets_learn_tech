use tokio::sync::RwLock;
use std::collections::{HashMap, HashSet};
use crate::models::tag::{TagId, TagInfo, TagInfoWithoutArticles};
use crate::models::article::ArticleId;
use crate::db::sql::get_dbhandler;
use std::ops::{DerefMut, Deref};

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
    pub async fn loadfromdb(&self){
        let (mut map,mut groups_)=get_dbhandler().await
            .db_get_all_taginfo().await.unwrap();
        let mut groups=self.tagsets.write().await;
        let mut tags=self.tags.write().await;
        let mut tagname2id=self.tagname_2_tagid.write().await;
        std::mem::swap(tags.deref_mut(),&mut map);
        std::mem::swap(groups.deref_mut(),&mut groups_);
        for t in tags.deref(){
            tagname2id.insert(t.1.tag_name.clone(),*t.0);
        }
    }

    pub async fn getgrouped_tagsinfo_without_articles(&self)
        ->HashMap<String,Vec<TagInfoWithoutArticles>>{
        let a=self.tagsets.read().await;
        let b=self.tags.read().await;
        let mut ret =HashMap::new();
        for (setname,idset) in a.deref(){
            let mut set =Vec::new();
            for id_ in idset{
                let info=b.get(id_).unwrap();
                set.push(TagInfoWithoutArticles{
                    tag_id: info.tag_id,
                    tag_name:info.tag_name.clone(),
                    artcnt: info.articles.len() as i32
                })
            }
            ret.insert(setname.clone(),set);
        }
        ret
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