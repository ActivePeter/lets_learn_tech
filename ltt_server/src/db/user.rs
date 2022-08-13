use crate::models::user::User;
use tokio_postgres::{Client, Error, Row, NoTls, Connection, Socket};
use crate::*;
// use tokio::io::AsyncWriteExt;
use tokio::sync::RwLock;
use crate::readconfig::ServerConfig;
use crate::services::user_manager::{G_USER_MANAGER};
use tokio::time;
use tokio_postgres::tls::NoTlsStream;
use crate::db::sql::{DbHandler, get_dbhandler};
// use std::alloc::Global;



//这里实现用户相关的增删改查
//对应user 表的dao层，持有到数据库的消息通道，
//后续数据库断开没有关系，在数据库重新链接后会来更新这里的client
impl DbHandler{
    pub async fn create_user_table(&self){

    }

    // pub fn update_db_client_handle(&mut self, mut client:Client){
    //     if self._client.is_empty() {
    //         self._client.push(client)
    //     }else{
    //         std::mem::swap(&mut client, &mut self._client[0])
    //     }
    // }

    //此处的增删改查由service层的usermanager调用，处理api请求
    // 此时可以保证client存在，因为数据库在结束启动时，
    // 会等待usermanager加载完内存，而加载内存就来自一次数据库读取
    pub async fn db_get_all_user(&self)->Option<Vec<Row>>{
            let res=self.get().await
                .query("select * from user_info",&[])
                .await;
            if let Ok(res_)=res{
                return Some(res_)
            }

        return None;
    }
    pub async fn db_create_user(&self,new_user : &User) -> Option<Vec<Row>> {
        /*
        这是一个同步函数，由异步函数add_user调用，所以也算是个异步函数
        插入错误处理，原则上不会出错，毕竟接口处做了检查
        传递过来user各项数据必须满足数据库要求
         */
        let mut insert_cmd = format!("insert into user_info values ({},'{}','{}','{}')"
                                     ,new_user.id,new_user.username,new_user.password,new_user.email);
        println!("insert_cmt {}",insert_cmd);

        let insert_result =self.get().await
            .query(&insert_cmd,&[]).await;


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
