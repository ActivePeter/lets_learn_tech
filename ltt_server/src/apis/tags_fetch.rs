use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};
use crate::services::token;
use crate::services::user_manager::G_USER_MANAGER;
use crate::models::user::{User, UserId};
use std::future::Future;
use crate::services::token::CheckTokenRes;
use std::collections::{HashMap, HashSet};
use crate::models::tag::TagInfoWithoutArticles;
use crate::services;
pub async fn tags_fetch(
    Json(_payload): Json<RequestContent>,
) -> impl IntoResponse {
    let resp=ResponseContent{
        group2tags: services::tag::G_TAG_MAN
            .getgrouped_tagsinfo_without_articles().await
    };
    return (StatusCode::OK, serde_json::to_string(&resp)
        .unwrap()).into_response()
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize,Default)]
pub struct ResponseContent {
    group2tags:HashMap<String,Vec<TagInfoWithoutArticles>>
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct RequestContent {
}


