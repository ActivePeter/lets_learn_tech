
pub struct ArticleManager{

}
impl ArticleManager{
    pub fn new() -> ArticleManager {
        return ArticleManager{

        }
    }
}

//
lazy_static::lazy_static! {
    pub static ref G_USER_MANAGER : ArticleManager = ArticleManager::new();
}
