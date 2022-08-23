use tokio::sync::RwLock;
use std::collections::{HashMap, HashSet};
use crate::models::tag::{TagId, TagInfo};

pub struct TagManager{
    //setname->tagids
    tagsets:RwLock<HashMap<String,HashSet<TagId>>>,

    //tagid->taginfo
    tags:RwLock<HashMap<TagId,TagInfo>>
}
lazy_static::lazy_static! {
    pub static ref G_TAG_MAN : TagManager = TagManager::new();
}

impl TagManager{
    pub fn new() -> TagManager {
        TagManager{
            tagsets: Default::default(),
            tags:  Default::default()
        }
    }
}