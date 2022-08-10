pub struct User{
    pub id:i32,
    pub email:String,
    pub username:String,
    pub password:String,
}

/*
检查 传递过来的东西是否有空格，安全问题，SQL注入
 */

fn check_content(check_value : &String) -> bool {
    for x in check_value.chars() {
       if x == ' '{
           return false
       }
    }
    true
}

impl User {
    pub(crate) fn check(&self) -> Option<&'static str> {
        if self.email.len() >= 30 ||
            self.password.len() >= 20 || self.username.len() >= 20{
            return Option::Some("wronglength")
        }
        println!("#{}# #{}# #{}#",self.email,self.username,self.password);

        if check_content(&self.email)
            && check_content(&self.username)
            && check_content(&self.password)
        {
            return Option::Some("space in values")
        }
        None
    }
}