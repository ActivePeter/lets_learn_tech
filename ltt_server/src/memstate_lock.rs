use tokio::sync::RwLock;
use lazy_static::*;
use tokio_postgres::Client;
use crate::models::user::User;

////有锁
pub struct MemStateWithLock{
    pub g_users : Vec<User>,
    pub db_client : Vec<Client>
}
impl MemStateWithLock{//如果数据相关性不大，就把大锁拆开
    pub fn new() -> RwLock<MemStateWithLock> {
        //tokio的读写锁有运行时优化
        RwLock::new(MemStateWithLock{
                g_users : Vec::new(),
                db_client : Vec::new(),
        })
    }
}
//很多数据结构需要用到堆区，所以需要在运行期初始化
lazy_static! {
    pub static ref MEM_STATE_WITH_LOCK: RwLock<MemStateWithLock> = MemStateWithLock::new();
}

