use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio_tungstenite::{connect_async, tungstenite::protocol::Message, MaybeTlsStream, WebSocketStream};
use tokio::net::TcpStream;
use tokio::task::JoinHandle;
use tokio::sync::oneshot::Sender;
use futures_util::stream::{SplitStream, SplitSink};
use futures_util::{StreamExt, SinkExt};
use tokio::sync::{RwLock, RwLockReadGuard};
use tokio_tungstenite::tungstenite::error::Error;
use lazy_static::__Deref;
use tokio::time::Duration;
use std::borrow::BorrowMut;
use std::ops::DerefMut;
use axum::http::Response;

lazy_static::lazy_static! {
    pub static ref G_ROBOT_MAN : RobotMan = RobotMan::new();
}

pub struct RobotMan {
    sender: RwLock<Option<SplitSink<WebSocketStream<MaybeTlsStream<TcpStream>>, Message>>>,
}

impl RobotMan {
    pub fn new() -> RobotMan {
        RobotMan {
            sender: Default::default()
        }
    }
    pub async fn send_msg(&self,msg:&String){
        let mut sender = self.sender.write().await;
        let s =
            sender.as_mut().unwrap();
        s.send(Message::from(
            format!("{{\
                        \"action\": \"send_group_msg\", \
                        \"params\": {{ \
                            \"group_id\": \"1070262019\", \
                            \"message\": \"{}\" \
                        }}, \
                    }}",msg)
        )).await;
    }
    pub async fn send_helloworld(&self) {
        let mut sender = self.sender.write().await;
        let s =
            sender.as_mut().unwrap();
        println!("{:?}",Message::from("{\
                        \"action\": \"send_group_msg\", \
                        \"params\": { \
                            \"group_id\": \"1070262019\", \
                            \"message\": \"hello world\" \
                        }, \
                    }"));
        s.send(Message::from("{\
                        \"action\": \"send_group_msg\", \
                        \"params\": { \
                            \"group_id\": \"1070262019\", \
                            \"message\": \"hello world\" \
                        }, \
                    }")).await.unwrap();

        // {
        //     "action": "终结点名称, 例如 'send_group_msg'",
        //     "params": {
        //     "参数名": "参数值",
        //     "参数名2": "参数值"
        // },
        //     "echo": "'回声', 如果指定了 echo 字段, 那么响应包也会同时包含一个 echo 字段, 它们会有相同的值"
        // }
    }
}


// #[tokio::test(flavor = "multi_thread", worker_threads = 1)]
pub async fn start_robot() {
    loop{
        println!("begin connect");
        // loop{
        let c=connect_async("ws://s5.nsloop.com:4439").await;
        match c{
            Ok(c) => {
                let (ws_stream, _) =c;
                    println!("WebSocket handshake has been successfully completed");

                let (write, read) =
                    ws_stream.split();


                G_ROBOT_MAN.sender.write().await.replace(write);

                let (t, r) = tokio::sync::oneshot::channel();
                read_loop(read, t).await;

                // tokio::time::sleep(Duration::from_millis(3000));
                // G_ROBOT_MAN.send_msg(&"hello".to_string()).await;
                //等待websocket循环终止
                r.await.unwrap();
                println!("robot end");
                tokio::time::sleep(Duration::from_secs(10)).await;
            }
            Err(_) => {
                println!("co to robot fail");
                tokio::time::sleep(Duration::from_secs(10)).await;
            }
        }
    }
    // }
}


pub async fn read_loop(read: SplitStream<WebSocketStream<MaybeTlsStream<TcpStream>>>,
                       sender: Sender<()>,
) {
    tokio::spawn(async move {
        read.for_each(|message| async {
            match message {
                Ok(message) => {
                    let data = message.into_data();
                    // tokio::io::stdout().write_all(&data).await.unwrap();
                }
                Err(_) => {
                    return;
                }
            }
        }).await;

        sender.send(()).unwrap();
    });
}