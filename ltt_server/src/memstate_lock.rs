use tokio::sync::RwLock;
use lazy_static::*;
////有锁
pub struct MemStateWithLock{

}
impl MemStateWithLock{//如果数据相关性不大，就把大锁拆开
    pub fn new() -> RwLock<MemStateWithLock> {
        //tokio的读写锁有运行时优化
        RwLock::new(MemStateWithLock{

        })
    }
}
//很多数据结构需要用到堆区，所以需要在运行期初始化
lazy_static! {
    pub static ref MEM_STATE_WITH_LOCK: RwLock<MemStateWithLock> = MemStateWithLock::new();
}
async fn v(){
    //读
    // MEM_STATE_WITH_LOCK.read().await.xxx

    //写
    // MEM_STATE_WITH_LOCK.write().await.xxx
}