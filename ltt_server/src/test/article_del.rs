use crate::services::article::G_ARTICLE_MAN;
use crate::services::{init_all, password_md5};
use crate::services::password_md5::{encrypt_password, get_hash_value, get_random_string};

#[tokio::test(flavor = "multi_thread", worker_threads = 1)]
pub async fn add_test_article() {
    let mut tags = Vec::new();
    tags.push(1);
    let tagsstr=serde_json::to_string(&tags).unwrap();
    let mut cmd=format!("select create_article($1::TEXT,$2::TEXT,$3::TEXT,{},ARRAY{}::integer[]);",
            1,tagsstr);
    print!("{} \n",cmd);
}

