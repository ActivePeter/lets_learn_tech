pub type UserId=i32;

#[derive(Clone)]
pub struct User{
    pub id:UserId,
    pub email:String,
    pub username:String,
    pub password:String,
}

pub struct UserSimpleInfo{
    pub id : UserId, // 用户id用于检索
    pub username:String,//用户名
    pub avatoraddr:String,//头像地址
}

/*
检查 传递过来的东西是否有空格，安全问题，SQL注入
 */

fn space_in_string(check_value : &String) -> bool {
    for x in check_value.chars() {
       if x == ' '{
           return true
       }
    }
    false
}

impl User {
    pub(crate) fn check(&self) -> Option<&'static str> {
        if self.email.len() >= 30 ||
            self.password.len() >= 20 || self.username.len() >= 20{
            return Some("wronglength")
        }
        log::debug!("#{}# #{}# #{}#",self.email,self.username,self.password);

        if space_in_string(&self.email)
            || space_in_string(&self.username)
            || space_in_string(&self.password)
        {
            // log::debug!("")
            return Some("space in values")
        }
        None
    }
}