use crate::models::user::User;
use tokio_postgres::{Client, Error, Row};
use crate::*;
// use std::alloc::Global;

pub async fn db_create_user(new_user : &User) -> Result<Vec<Row>, Error> {
    /*
    这是一个同步函数，由异步函数add_user调用，所以也算是个异步函数
    插入错误处理，原则上不会出错，毕竟接口处做了检查
    传递过来user各项数据必须满足数据库要求
     */
    let mut insert_cmd = format!("insert into user_info values ({},'{}','{}','{}')"
                                 ,new_user.id,new_user.username,new_user.password,new_user.email);
    println!("insert_cmt {}",insert_cmd);

    let insert_result =db::sql::G_SQL_CLIENTS.read().await[0].
        query(&insert_cmd,&[]).await;


    insert_result
    // todo : rethink it ?
    // if insert_result.is_err() {
    //     eprintln!("insert error: {}", insert_result.unwrap_err());
    // }
}