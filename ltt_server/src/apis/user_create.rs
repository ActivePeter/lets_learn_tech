use axum::Json;
use axum::response::IntoResponse;
use axum::http::StatusCode;
use serde::{Deserialize, Serialize};

pub async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> impl IntoResponse {
    // insert your application logic here
    // let user = User {
    //     id: 1337,
    //     username: payload.username,
    // };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(payload))
}

// the input to our `create_user` handler
#[derive(Deserialize,Serialize)]
pub struct CreateUser {
    email: String,
    pw:String,
    verify:String
}
// the output to our `create_user` handler
// #[derive(Serialize)]
// pub struct User {
//     id: u64,
//     username: String,
// }