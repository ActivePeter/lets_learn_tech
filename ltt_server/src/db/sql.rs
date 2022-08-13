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

pub async fn get_dbhandler() -> DbHandler {
    DbHandler{
        pool: G_DB_POOL_HANDLE.read().await.as_ref().unwrap().clone()
    }
}


pub async fn sqlstart(config: &ServerConfig) -> Result<(), Error> {
    //一个表由一个模块持有链接
    let _sql_wait = _sql_start(config).await;//启动链接并持有

    println!("user_sql_wait ok");
    Ok(())
}

//尝试下数据库连接池
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


