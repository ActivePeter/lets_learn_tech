use std::borrow::Borrow;
use std::io::Read;
use std::ptr::null;
use log::log;
use tokio_postgres::{NoTls, Error, Client};
use crate::memstate_lock::{MEM_STATE_WITH_LOCK};
use crate::readconfig::ServerConfig;
use crate::models::user::User;
use crate::services::user_manager::{G_USER_MANAGER};
use tokio::sync::RwLock;
use crate::db;
use tokio::sync::oneshot::Receiver;
use tokio::time;
use deadpool_postgres::{Config, Manager, ManagerConfig, Pool, RecyclingMethod, Runtime, Object};
use std::fs;
use std::fs::File;

lazy_static::lazy_static! {
    pub static ref G_DB_POOL_HANDLE : RwLock<Option<Pool>> =RwLock::new(None);
}

pub struct DbHandler{
    pub pool:Pool
}

impl DbHandler{
    pub async fn get(&self) -> Object {
        return self.pool.get().await.unwrap()
    }
}

//大家都来读而已啦，没有关系！
pub async fn get_dbhandler() -> DbHandler {
    DbHandler{
        pool: G_DB_POOL_HANDLE.read().await.as_ref().unwrap().clone()
    }
}


pub async fn sqlstart(config: &ServerConfig) -> Result<(), Error> {
    //一个表由一个模块持有链接
    let _sql_wait = _sql_start(config).await;//启动链接并持有
    let handler=get_dbhandler().await;

    let (tx, mut rx)
        =tokio::sync::mpsc::channel(10);
    //tables init
    let r = fs::read_dir("./sql").unwrap();
    // let mut rank_by_edit_time = BTreeMap::new/();
    tokio::task::spawn_blocking(move ||{
        for dir_ in r {
            match dir_ {
                Ok(dir) => {
                    // println!("scanning log {}", dir.path().as_os_str().to_str().unwrap());
                    let p = dir.path();
                    if p.is_file(){
                        let fname=String::from(p.file_name().unwrap().to_str().unwrap());
                        if fname.find("func_")==Some(0){
                            println!("regist func {}",fname);
                            let mut file = File::open(&p).unwrap();
                            let mut s =String::new();
                            file.read_to_string(&mut s).unwrap();
                            tx.blocking_send(s).unwrap();
                        }
                    }
                }
                Err(e) => {
                    panic!("{}",e)
                    // error!("err when go through store folder {}", e);
                }
            }
        }
    });
    let db=get_dbhandler().await.get().await;
    loop{
        if let Some(v)=rx.recv().await{
            db.query(&*v,&[]).await.unwrap();
        }else{
            break;
        }
    }
    // handler.article_tag_init().await;
    // handler.article_init().await;

    println!("user_sql_wait ok");
    Ok(())
}

//尝试下数据库连接池 https://lib.rs/crates/deadpool-postgres
pub async fn _sql_start(config : &ServerConfig){
    let mut cfg = Config::new();
    cfg.user=Some(config.username.clone());
    cfg.password=Some(config.password.clone());
    cfg.host=Some(config.addr.clone());
    cfg.dbname=Some(config.dbname.clone());
    cfg.port=Some( config.port.clone());
    let pool = cfg.create_pool(Some(Runtime::Tokio1), NoTls).unwrap();
    G_DB_POOL_HANDLE.write().await.replace(pool);
}


