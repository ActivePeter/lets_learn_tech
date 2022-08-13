pub mod robot_service;
pub mod token;
pub mod user_manager;
mod verifycode;
pub mod article;

pub async fn init_all(){
    user_manager::G_USER_MANAGER.update_user_from_db().await;
}