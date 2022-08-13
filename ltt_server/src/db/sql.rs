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
// impl DbHandler{
//     pub async fn new() -> DbHandler {
//
//     }
// }
pub async fn get_dbhandler() -> DbHandler {
    DbHandler{
        pool: G_DB_POOL_HANDLE.read().await.as_ref().unwrap().clone()
    }
}

// #[tokio::main] // By default, tokio_postgres uses the tokio crate as its runtime.
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
    // let connto=format!("host={} port={} dbname={} password={} user={} ",
    //                    config.addr,config.port,config.dbname,config.password,config.username);
    // let (firsttimememload_t,firsttimememload_r)=tokio::sync::oneshot::channel();
    // let mut some_firsttimememload_t =Some(firsttimememload_t);
    // tokio::spawn(async move{
    //     let mut fisrt=true;
    //     let mut memloaded=false;
    //     loop{
    //         if !fisrt {//断连后休眠30秒再继续
    //             time::sleep(time::Duration::from_secs(30)).await;
    //
    //             println!("reconnect");
    //         }
    //         fisrt=false;
    //
    //         // Connect to the database.
    //         println!("The config info : {}",connto);
    //         let res=
    //             tokio_postgres::connect(&*connto, NoTls).await;
    //         match res{
    //             Err(_) => {}
    //             Ok((client,
    //                    connection)) => {
    //                 // The connection object performs the actual communication with the database,
    //                 // so spawn it off to run on its own.
    //
    //                 //持有链接
    //                 let handle=tokio::spawn(async move {
    //                     if let Err(e) = connection.await {
    //                         eprintln!("connection error: {}", e);
    //                         //todo 链接断开后应该重连，更新client
    //                     }
    //                 });
    //
    //                 //初始化clientmanager
    //                 //  tokio::spawn(async move{
    //                 //更新memloaded状态，若已经加载，则后续断连不用重载
    //                 memloaded= G_USER_MANAGER.update_user_db_client(
    //                     memloaded,client).await;
    //                 if memloaded {
    //                     if some_firsttimememload_t.is_some(){
    //                         let t=some_firsttimememload_t.unwrap();
    //                         some_firsttimememload_t=None;
    //                         t.send(()).unwrap();
    //                     }
    //                     // firsttimememload_t.send(());
    //                 }
    //                 // });
    //
    //                 //直到数据库链接断开
    //                 let _end=handle.await;
    //             }
    //         }
    //     }
    // });

    //等首次内存加载成功后才继续，确保内存中已经有完整数据再启动服务
    // firsttimememload_r.await.unwrap();
    // println!("user sql load ok, continue");
    // firsttimememload_r
}


/*
数据库查询思路：
1. 服务开启前，先将数据库中的用户表存到内存中（因为用户量可能不会太大）
2. 只有两个服务需要用到用户：1. 用户注册（检测名称和邮箱的唯一性，读），检测成功加入vec中，然后异步在数据库中写入。
                        2. 用户登录（只读vec），判读各个值是否相等。
3. 也就是说数据库只是帮助我们序列化数据的工具，并不参与实际逻辑
4. 写入始终是个很低频操作，而读是高频操作（当然有cookie后频率也会下降），如何确保在写(push)的时候，不读。
 */


