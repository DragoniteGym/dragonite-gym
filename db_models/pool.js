const { Pool } = require('pg');

//pulling configs from .env file
const {
    POSTGRES_USER: user,
    POSTGRES_DB: database,
    POSTGRES_PASSWORD: password,
    POSTGRES_PORT: port,
    POSTGRES_HOST: host,
    POSTGRES_MAX: max,
    POSTGRES_IDLETIMEOUTMS: idleTimeoutMillis,
    POSTGRES_CONNECTIONTIMEOUTMS: connectionTimeoutMillis,
} = process.env

//creating config object to pass into pool
const poolConfig = {
    user,
    database,
    password,
    port,
    host,
    max,
    idleTimeoutMillis,
    connectionTimeoutMillis
};

//declaring new pool
const pool = new Pool(poolConfig);

pool
//when connected, should console log successful message
   .on('connect', () => {
    console.log(`SQL DB connected on ${host}:${port}`);
   }
)
//if there's an error, should console log error and then exit all processes
   .on('error', (err, client) => {
    console.error(`SQL DB Connection Error: ${err}`);
    process.exit(-1);
   }
)
//when closing connection, should confirm with console log
   .on('remove', (client) => {
    console.log(`SQL DB Connection Ended: ${client} removed from pool`);
   }
);
