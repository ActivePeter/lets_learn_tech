use lazy_static::lazy_static;
use crate::readconfig::ServerConfig;

use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use std::future::Future;
use serde::{Deserialize, Serialize};
use std::file;
use std::io::Read;
use lettre::message::Mailbox;

#[derive(Deserialize,Serialize,Clone)]
pub struct EmailManager{
    username : String,
    password : String,
    server: String
}

fn read_from_file() -> ServerConfig{
    let f = std::fs::File::open("./config.json");
    let mut content =String::new();
    f.unwrap().read_to_string(&mut content).expect("Read config.json failed");
    log::debug!("file str:{}",content);
    let des:ServerConfig=serde_json::from_str(&*content).unwrap();
    des
}
pub enum EmailSendResult{
    EmailSendFail,
    Succ,
    EmailParseFail
}
impl  EmailManager{
    fn new() -> EmailManager {
        let config=read_from_file();
        let creds = Credentials::new(config.email_username.clone(),
                                     config.email_password.clone());

        let mailer = SmtpTransport::relay(&config.email_server)
            .unwrap()
            .credentials(creds)
            .build();

        match mailer.test_connection() {
            Ok(_) => println!("Email service start successfully!"),
            Err(e) => panic!("Email service start error : {}",e)
        }
        EmailManager{
            username : config.email_username.clone(),
            password : config.email_password.clone(),
            server : config.email_server.clone()
        }
    }

    pub async fn set(&mut self,username : &String, password : &String,server : &String) {
        self.username = username.clone();
        self.password = password.clone();
        self.server = server.clone();
    }

    pub fn send_verify_code(&self, to_email : &str, code : u32) -> EmailSendResult {
        let mut body = String::from("Your verify code is ");
        body.push_str(&code.to_string());

        // 生成邮件
        if let Ok(to)=to_email.parse(){
            let email = Message::builder()
                .from(Mailbox::new(None, self.username.clone().parse().unwrap()))
                .to(to)
                .subject("Verify code from Let's Learn Tech")
                .body(String::from(body))
                .unwrap();

            // SMTP服务相关信息
            let creds = Credentials::new(self.username.clone(), self.password.clone());

            let mailer = SmtpTransport::relay(&self.server)
                .unwrap()
                .credentials(creds)
                .build();

            // send email success !
            match mailer.send(&email) {
                Ok(_) => {
                    println!("Email sent successfully!");
                    return
                        EmailSendResult::Succ;
                },
                Err(e) => {
                    eprintln!("Could not send email: {:?}", e);
                    return EmailSendResult::EmailSendFail;
                }
                    // panic!("Could not send email: {:?}", e) },
            }
        }
        EmailSendResult::EmailParseFail
    }
}
lazy_static! {
    pub static ref G_EMAIL_MANAGER : EmailManager = EmailManager::new();
}

#[tokio::test(flavor = "multi_thread", worker_threads = 1)]
pub async fn email_test(){
    println!("hhhhhhhhhhhhhhhhhhhhhh");
    G_EMAIL_MANAGER.send_verify_code("751080330@qq.com",123472);
}

#[tokio::test(flavor = "multi_thread", worker_threads = 1)]
pub async fn email_test_fail(){
    println!("hhhhhhhhhhhhhhhhhhhhhh");
    G_EMAIL_MANAGER.send_verify_code("1020401660@qq.com",123472);
}
