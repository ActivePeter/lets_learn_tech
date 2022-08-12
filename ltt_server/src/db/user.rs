use crate::models::user::User;
use tokio_postgres::{Client, Error, Row, NoTls};
use crate::*;
// use tokio::io::AsyncWriteExt;
use tokio::sync::RwLock;
use crate::readconfig::ServerConfig;
use crate::services::user_manager::{G_USER_MANAGER};
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
        if(self._client.is_empty()){
            self._client.push(client)
        }else{
            std::mem::swap(&mut client, &mut self._client[0])
        }
    }

    pub async fn db_create_user(&self,new_user : &User) -> Result<Vec<Row>, Error> {
        /*
        这是一个同步函数，由异步函数add_user调用，所以也算是个异步函数
        插入错误处理，原则上不会出错，毕竟接口处做了检查
        传递过来user各项数据必须满足数据库要求
         */


        let mut insert_cmd = format!("insert into user_info values ({},'{}','{}','{}')"
                                     ,new_user.id,new_user.username,new_user.password,new_user.email);
        println!("insert_cmt {}",insert_cmd);

        let insert_result =self._client[0].query(&insert_cmd,&[]).await;


        insert_result
        // todo : rethink it ?
        // if insert_result.is_err() {
        //     eprintln!("insert error: {}", insert_result.unwrap_err());
        // }
    }
}
pub async fn user_sql_start(config : &ServerConfig)  {
    let connto=format!("host={} port={} dbname={} password={} user={} ",
                       config.addr,config.port,config.dbname,config.password,config.username);
    // Connect to the database.
    println!("The config info : {}",connto);
    let (client, connection) =
        tokio_postgres::connect(&*connto, NoTls).await.unwrap();

    // The connection object performs the actual communication with the database,
    // so spawn it off to run on its own.
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });
    let rows = client
        .query("select * from user_info",&[])
        .await.unwrap();

    for row in rows.iter(){
        let id : i32 = row.get(0);
        let username : String = row.get(1);
        let password : String = row.get(2);
        let email :String = row.get(3);
        let new_user = User{id,username: username.trim_end().parse().unwrap(),password :
        password.trim_end().parse().unwrap(),email:email.trim_end().parse().unwrap()};
        println!("db : user : {} {} {} {}",new_user.id,new_user.username,
                 new_user.password,new_user.email);
        G_USER_MANAGER.push_user(new_user).await;
        //global_db.g_users.push(new_user);
    }

    G_USER_MANAGER.update_user_db_client(client).await;
}

