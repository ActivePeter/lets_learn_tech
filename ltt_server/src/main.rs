pub mod apis;
pub mod user;
pub mod sql;
pub mod readconfig;
mod memstate_lock;

use axum::{
    routing::{get, post},
    http::StatusCode,
    response::IntoResponse,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use axum::error_handling::HandleErrorLayer;
use crate::memstate_lock::MemStateWithLock;

#[tokio::main]
async fn main() {
    // initialize tracing
    // tracing_subscriber::fmt::init();
    env_logger::init();
    let config=readconfig::ServerConfig::read_from_file().await;
    log::debug!("The addr read from config.json : {}",config.addr);
    sql::sqlstart(&config).await.unwrap();

    //LetTeachSome1@#
    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        // `POST /users` goes to `create_user`
        .route("/user_create", post(apis::user_create::create_user))
        // Add middleware to all routes
        // .layer(
        //     ServiceBuilder::new()
        //         // Handle errors from middleware
        //         .layer(HandleErrorLayer::new(handle_error))
        //         // .load_shed()
        //         // .concurrency_limit(1024)
        //         // .timeout(Duration::from_secs(10))
        //         // .layer(TraceLayer::new_for_http())
        //         // .layer(Extension(SharedState::default()))
        //         .into_inner(),
        // )
        ;

        // .route("/user_login",post())
        // .route("/tags_fetch",post())
        // .route("/article_new",post())
        // .route("/article_del",post())
        // .route("/articles_getwithtag",post)
        // .route("/comment",post);

    // run our app with hyper
    // `axum::Server` is a re-export of `hyper::Server`
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    // tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, World!"
}



