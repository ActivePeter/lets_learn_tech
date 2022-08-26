use crate::services::comment::CommentManager;

pub mod robot_service;
pub mod token;
pub mod user_manager;
pub(crate) mod verifycode;
pub mod article;
pub mod email_service;
pub mod tag;
pub mod comment;

pub async fn init_all(){
    user_manager::G_USER_MANAGER.update_user_from_db().await;
    tag::G_TAG_MAN.loadfromdb().await;
    CommentManager::get().load_all().await;
}