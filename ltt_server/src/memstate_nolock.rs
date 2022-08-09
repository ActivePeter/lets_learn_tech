
use lazy_static::*;
use tokio::sync::mpsc::{Sender, Receiver};
use std::io::Write;

////无锁
pub struct MemStateNoLock{
    a:Option<u64>
}
impl MemStateNoLock{
    pub fn new() -> MemStateNoLock {
        MemStateNoLock{
            a:None
        }
    }
}

//用于无锁操作和读取内存中的数据
pub struct MemStateHandler{
    // 持有一个sender,给用户使用
    sender:Sender<MemStateRequest>
}
impl MemStateHandler{
    fn new(sender:Sender<MemStateRequest>) -> MemStateHandler {
        MemStateHandler{
            sender
        }
    }
    //把发送请求的函数封装起来，
    pub async fn seta(&self,v:u64){
        self.sender.send(MemStateRequest::SetA(v)).await.unwrap();
    }
    pub async fn dela(&self){
        self.sender.send(MemStateRequest::DelA).await.unwrap();
    }
    //通过oneshot获取返回信息
    pub async fn geta(&self){
        let (t,mut r)=tokio::sync::oneshot::channel();
        self.sender.send(MemStateRequest::GetA {
            repl: t
        }).await.unwrap();
        let res=r.await;
    }
}
#[derive(Debug)]
pub enum MemStateRequest{
    DelA,
    SetA(u64),
    GetA{
        repl:tokio::sync::oneshot::Sender<Option<u64>>
    }
}
//将handler传递给主循环，之后到处都可以复制来用
async fn memstate_hold_loop() -> MemStateHandler {
    let (tx, mut rx):
    (Sender<MemStateRequest>,
     Receiver<MemStateRequest>)
        =tokio::sync::mpsc::channel(10);

    let mut state=MemStateNoLock::new();
    tokio::spawn(async move{
        loop {
            let res_=rx.recv().await;
            if let Some(res)=res_{
                match res{
                    MemStateRequest::DelA => {
                        state.a=None
                    }
                    MemStateRequest::SetA(v) => {
                        state.a=Some(v);
                    }
                    MemStateRequest::GetA { repl} => {
                        repl.send(state.a);
                    }
                }
            }else{
                break;
            }
        }
    });

    MemStateHandler::new(tx)
}