use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::{User, UserId};
use std::future::Future;
use crate::services::token::CheckTokenRes;
use std::collections::HashMap;
use crate::models::tag::TagInfoWithoutArticles;

pub async fn tags_fetch(
    Json(_payload): Json<RequestContent>,
) -> impl IntoResponse {


    return (StatusCode::BAD_REQUEST, "notfound").into_response()
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct ResponseContent {
    group2tags:HashMap<String,TagInfoWithoutArticles>
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct RequestContent {
}


