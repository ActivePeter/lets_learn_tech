// use axum::Json;
// use axum::response::IntoResponse;
// use axum::http::StatusCode;
// use serde::{Deserialize, Serialize};
// use crate::services::token;
// use crate::services::user_manager::G_USER_MANAGER;
// use crate::models::user::{User, UserId};
// use std::future::Future;
// use crate::services::token::CheckTokenRes;
// /*
// // pub async fn user_basic_info(
// //     Json(payload): Json<UserBasicInfoRequest>,
// // ) -> impl IntoResponse {
// //     let res=token::checktoken(payload.uid,payload.token).await;
// //     match res{
// //         CheckTokenRes::FailParse => {
// //             return (StatusCode::BAD_REQUEST, "invalid").into_response()
// //         }
// //         CheckTokenRes::Valid => {
// //             //make一个新的
// //             token::maketoken(payload.)
// //         }
// //         CheckTokenRes::Expire => {
// //             return (StatusCode::BAD_REQUEST, "expire").into_response()
// //         }
// //         CheckTokenRes::NotMatchUid=>{
// //             return (StatusCode::BAD_REQUEST, "invalid").into_response()
// //         }
// //     }
// //     //     return (StatusCode::OK,serde_json::to_string(&resp).unwrap() ).into_response()
// //
// //     // return (StatusCode::BAD_REQUEST, "fail token make").into_response()
// // }
// //
// // // the input to our `create_user` handler
// // #[derive(Deserialize,Serialize)]
// // pub struct UserBasicInfoResponse {
// // }
// //
// // // the input to our `create_user` handler
// // #[derive(Deserialize,Serialize)]
// // pub struct UserBasicInfoRequest {
// // }
// //
//
