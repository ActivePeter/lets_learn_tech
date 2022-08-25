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
    pub aid_2_tags:RwLock<HashMap<ArticleId,HashSet<TagId>>>
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
            aid_2_tags: Default::default()
        }
    }

    pub async fn loadfromdb(&self){
        let (mut map,mut groups_)=get_dbhandler().await
            .db_get_all_taginfo().await.unwrap();
        let mut groups=self.tagsets.write().await;
        let mut tags=self.tags.write().await;
        let mut tagname2id=self.tagname_2_tagid.write().await;
        let mut aid2tags=self.aid_2_tags.write().await;
        std::mem::swap(tags.deref_mut(),&mut map);
        std::mem::swap(groups.deref_mut(),&mut groups_);
        for t in tags.deref(){
            for a in &t.1.articles{
                aid2tags.entry(*a).and_modify(|v|{
                    v.insert(*t.0);
                }).or_insert(HashSet::from([*t.0]));
            }
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

    pub async fn memonly_article_tags_rebind(&self,aid:ArticleId,newtags:&Vec<TagId>){
        let mut a2t =self.aid_2_tags.write().await;
        let mut tags =self.tags.write().await;
        //旧的文章的tags
        let mut v =a2t.get_mut(&aid);
        if v.is_none(){
            a2t.insert(aid,Default::default());
            v =a2t.get_mut(&aid);
        }
        let v=v.unwrap();
        //旧的没有的关系，要新加入的
        for t in newtags{
            if v.get(t).is_none(){
                v.insert(*t);
                tags.get_mut(t).unwrap().articles.insert(aid);
            }
        }
        let mut remove_=Vec::new();
        for t in v.iter(){
            //旧的在新的里没有了，就要删除
            if newtags.binary_search(t).is_err(){
                remove_.push(*t);
            }
        }
        for t in remove_{
            v.remove(&t);
            tags.get_mut(&t).unwrap().articles.remove(&aid);
        }

    }
    //memonly 非单独操作，
    // 一般是创建或修改文章后，sql改变文章tag关系,
    // 将变更同步到内存
    pub async fn memonly_add_articles_2_tags(&self,tid:&[TagId], aids: &[ArticleId]) {
        let mut lock =self.tags.write().await;
        for t in tid{
            for v in aids{
                lock.get_mut(t).unwrap()
                    .articles.insert(*v);
            }
        }
    }
    pub async fn memonly_remove_articles_2_tag(&self, aid: &[ArticleId]) {}
}