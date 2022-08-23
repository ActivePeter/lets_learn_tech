use crate::db::sql::DbHandler;

const INITCMDS:&'static[&'static str]= &[
];

impl DbHandler{
    pub async fn article_tag_init(&self){
        let db=self.get().await;
        for cmd in INITCMDS{
            db.query(*cmd,&[]).await.unwrap();
        }
    }
}