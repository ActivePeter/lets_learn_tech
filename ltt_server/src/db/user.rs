use crate::models::user::User;
use tokio_postgres::{Client, Error, Row, NoTls, Connection, Socket};
use crate::*;
// use tokio::io::AsyncWriteExt;
use tokio::sync::RwLock;
use crate::readconfig::ServerConfig;
use crate::services::user_manager::{G_USER_MANAGER};
use tokio::time;
use tokio_postgres::tls::NoTlsStream;
// use std::alloc::Global;

//用户数据库的句柄，当链接断开时自动与主循环获取新的链接
pub struct UserDbHandler{
    _client:Vec<Client>
}
impl UserDbHandler{
    pub fn new() -> UserDbHandler {
        UserDbHandler{
            _client:Vec::new()
        }
    }
    pub fn update_db_client_handle(&mut self, mut client:Client){
        if self._client.is_empty() {
            self._client.push(client)
        }else{
            std::mem::swap(&mut client, &mut self._client[0])
        }
    }
    pub async fn db_get_all_user(&self)->Option<Vec<Row>>{
        if !self._client.is_empty(){
            let res=self._client[0]
                .query("select * from user_info",&[])
                .await;
            if let Ok(res_)=res{
                return Some(res_)
            }
        }
        return None;
    }
    pub async fn db_create_user(&self,new_user : &User) -> Option<Vec<Row>> {
        /*
        这是一个同步函数，由异步函数add_user调用，所以也算是个异步函数
        插入错误处理，原则上不会出错，毕竟接口处做了检查
        传递过来user各项数据必须满足数据库要求
         */
        if self._client.is_empty(){
            return None;
        }

        let mut insert_cmd = format!("insert into user_info values ({},'{}','{}','{}')"
                                     ,new_user.id,new_user.username,new_user.password,new_user.email);
        println!("insert_cmt {}",insert_cmd);

        let insert_result =self._client[0].query(&insert_cmd,&[]).await;


        match insert_result{
            Ok(v) => {Some(v)}
            Err(_) => {None}
        }
        // todo : rethink it ?
        // if insert_result.is_err() {
        //     eprintln!("insert error: {}", insert_result.unwrap_err());
        // }
    }
}
pub async fn user_sql_start(config : &ServerConfig)  {
    let connto=format!("host={} port={} dbname={} password={} user={} ",
                       config.addr,config.port,config.dbname,config.password,config.username);
    let (firsttimememload_t,firsttimememload_r)=tokio::sync::oneshot::channel();
    let mut some_firsttimememload_t =Some(firsttimememload_t);
    tokio::spawn(async move{
        let mut fisrt=true;
        let mut memloaded=false;
       loop{
           if !fisrt {//断连后休眠30秒再继续
               time::sleep(time::Duration::from_secs(30)).await;

               println!("reconnect");
           }
           fisrt=false;

           // Connect to the database.
           println!("The config info : {}",connto);
           let res=
               tokio_postgres::connect(&*connto, NoTls).await;
           match res{
               Err(_) => {}
               Ok((client,
                      connection)) => {
                   // The connection object performs the actual communication with the database,
                   // so spawn it off to run on its own.

                   //持有链接
                   let handle=tokio::spawn(async move {
                       if let Err(e) = connection.await {
                           eprintln!("connection error: {}", e);
                           //todo 链接断开后应该重连，更新client
                       }
                   });

                   //初始化clientmanager
                   //  tokio::spawn(async move{
                        //更新memloaded状态，若已经加载，则后续断连不用重载
                    memloaded= G_USER_MANAGER.update_user_db_client(
                        memloaded,client).await;
                    if memloaded {
                        if some_firsttimememload_t.is_some(){
                            let t=some_firsttimememload_t.unwrap();
                            some_firsttimememload_t=None;
                            t.send(()).unwrap();
                        }
                        // firsttimememload_t.send(());
                    }
                    // });

                   //直到数据库链接断开
                   let _end=handle.await;
               }
           }
       }
    });

    //等首次内存加载成功后才继续，确保内存中已经有完整数据再启动服务
    firsttimememload_r.await.unwrap();
    println!("user sql load ok, continue");
}

