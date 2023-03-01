use crate::models::article::ArticleId;

pub const WEB_SITE_BASE_ADDR:&'static str="http://learntech.zone/";


pub fn article_path(aid:ArticleId) -> String {
    WEB_SITE_BASE_ADDR.to_string()+ &*format!("article/{}?mode=view", aid)
}