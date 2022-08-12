use serde::{Deserialize, Serialize};
use tokio::fs::File;
use tokio::io::AsyncReadExt;

//用于读取服务端配置
#[derive(Deserialize,Serialize,Clone)]
pub struct ServerConfig{
    pub addr:String,
    pub port:String,
    pub dbname:String,
    pub username:String,
    pub password:String,
    pub token_secret:String
}
impl ServerConfig{
    pub async fn read_from_file()->ServerConfig{
        let mut f = File::open("./config.json").await.unwrap();
        let mut content =String::new();
        f.read_to_string(&mut content).await.unwrap();
        log::debug!("file str:{}",content);
        let des:ServerConfig=serde_json::from_str(&*content).unwrap();

        des
    }
}