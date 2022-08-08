use tokio_postgres::{NoTls, Error};

// #[tokio::main] // By default, tokio_postgres uses the tokio crate as its runtime.
pub async fn sqlstart(addr:&String,usr:&String) -> Result<(), Error> {
    let connto=format!("host=h9.maxlink.top port=4890 dbname=hanbaoaaatest password=postgres user=postgres ");
    // Connect to the database.
    println!("The config info : {connto}");
    let (client, connection) =
        tokio_postgres::connect(&*connto, NoTls).await?;

    // The connection object performs the actual communication with the database,
    // so spawn it off to run on its own.
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });

    // Now we can execute a simple statement that just returns its parameter.
    let rows = client
        .query("SELECT $1::TEXT", &[&"hello world"])
        .await?;

    // And then check that we got back the same string we sent over.
    let value: &str = rows[0].get(0);
    assert_eq!(value, "hello world");

    Ok(())
}