use crate::services::password_md5::get_hash_value;

pub type UserId=i32;

#[derive(Clone)]
pub struct User{
    pub id:UserId,
    pub email:String,
    pub username:String,
    pub pw_salt:String,
    pub pw_hash:u64
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
            self.pw_salt.len() >= 20 || self.username.len() >= 20{
            return Some("wronglength")
        }
        log::debug!("#{}# #{}# #{}#",self.email,self.username,self.pw_salt);

        if space_in_string(&self.email)
            || space_in_string(&self.username)
            || space_in_string(&self.pw_salt)
        {
            // log::debug!("")
            return Some("space in values")
        }
        None
    }
    pub fn check_pw_right(&self,pw:&String)->bool{
        self.pw_hash==get_hash_value(&self.pw_salt,pw)
    }
}