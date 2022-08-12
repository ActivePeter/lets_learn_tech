use std::borrow::Borrow;
use std::io::Read;
use std::ptr::null;
use log::log;
use tokio_postgres::{NoTls, Error, Client};
use crate::memstate_lock::{ MEM_STATE_WITH_LOCK};
use crate::readconfig::ServerConfig;
use crate::models::user::User;
use crate::services::user_manager::{G_USER_MANAGER};

// #[tokio::main] // By default, tokio_postgres uses the tokio crate as its runtime.
pub async fn sqlstart(config : &ServerConfig) -> Result<(), Error> {
    let connto=format!("host={} port={} dbname={} password={} user={} ",
                                config.addr,config.port,config.dbname,config.password,config.username);
    // Connect to the database.
    println!("The config info : {connto}");
    let (client, connection) =
        tokio_postgres::connect(&*connto, NoTls).await?;

    // The connection object performs the actual communication with the database,
    // so spawn it off to run on its own.
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });
    let rows = client
        .query("select * from user_info",&[])
        .await?;

    for row in rows.iter(){
        let id : i32 = row.get(0);
        let username : String = row.get(1);
        let password : String = row.get(2);
        let email :String = row.get(3);
        let new_user = User{id,username: username.trim_end().parse().unwrap(),password :
        password.trim_end().parse().unwrap(),email:email.trim_end().parse().unwrap()};
        println!("db : user : {} {} {} {}",new_user.id,new_user.username,
                 new_user.password,new_user.email);
        G_USER_MANAGER.write().await.push_user(new_user);
        //global_db.g_users.push(new_user);
    }
    G_USER_MANAGER.write().await.set_client(client);
   // global_db.db_client.push(client);
    Ok(())
}

/*
数据库查询思路：
1. 服务开启前，先将数据库中的用户表存到内存中（因为用户量可能不会太大）
2. 只有两个服务需要用到用户：1. 用户注册（检测名称和邮箱的唯一性，读），检测成功加入vec中，然后异步在数据库中写入。
                        2. 用户登录（只读vec），判读各个值是否相等。
3. 也就是说数据库只是帮助我们序列化数据的工具，并不参与实际逻辑
4. 写入始终是个很低频操作，而读是高频操作（当然有cookie后频率也会下降），如何确保在写(push)的时候，不读。
 */


