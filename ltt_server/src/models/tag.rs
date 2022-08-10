use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct TagInfo{
    tagid:u32,
    tagname:String,
}

#[derive(Deserialize, Serialize)]
pub struct TagSet{
    tagsetname:String,
    tags:Vec<TagInfo>
}

#[derive(Deserialize, Serialize)]
pub struct AllTags{
    tagsets:Vec<TagSet>
}