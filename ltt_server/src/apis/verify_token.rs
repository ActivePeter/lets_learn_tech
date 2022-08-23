use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::{User, UserId};
use std::future::Future;
use crate::services::token::CheckTokenRes;
use crate::apis::user_login::UserLoginResponse;

pub async fn verify_token(
    Json(payload): Json<VerifyTokenRequest>,
) -> impl IntoResponse {
    let res=token::checktoken(payload.uid,payload.token).await;
    match res{
        CheckTokenRes::FailParse => {
            return (StatusCode::BAD_REQUEST, "invalid").into_response()
        }
        CheckTokenRes::Valid => {
            //make一个新的
            let token=token::maketoken(payload.uid).await;
            let resp=VerifyTokenResponse{
                newtoken:token,
            };
            return (StatusCode::OK,serde_json::to_string(&resp).unwrap()).into_response()
        }
        CheckTokenRes::Expire => {
            return (StatusCode::BAD_REQUEST, "expire").into_response()
        }
        CheckTokenRes::NotMatchUid=>{
            return (StatusCode::BAD_REQUEST, "invalid").into_response()
        }
    }
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
struct VerifyTokenResponse {
    pub newtoken:String,
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct VerifyTokenRequest {
    pub token:String,
    pub uid:UserId,
}


