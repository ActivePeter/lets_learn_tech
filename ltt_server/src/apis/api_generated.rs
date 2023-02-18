use serde::{Deserialize, Serialize};
#[derive(Deserialize, Serialize)]
pub(crate) struct ArticleDeleteReq{
   pub(crate) token:String,
   pub(crate) articleid:i64
}
#[derive(Deserialize, Serialize)]
pub(crate) struct ArticleDeleteResp{
   pub(crate) succ1_fail0:i64,
   pub(crate) info:String
}

