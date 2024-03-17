const { pg_config } = require("./env");

// const pgClient = new pg.Pool({
//     user: pg_config.user,
//     database: pg_config.database,
//     port: pg_config.port,
//     host: pg_config.host,
//     password: pg_config.password
// });

const _pgClient = require('knex')({
    client: 'pg',
    connection: pg_config.connectionString,
    // connection: {
    //     user: pg_config.user,
    //     database: pg_config.database,
    //     port: pg_config.port,
    //     host: pg_config.host,
    //     password: pg_config.password
    // },
    debug: true
});

_pgClient.on('connect', (data => {
    console.log("connection-->", data)
}))

_pgClient.on('error', (err => {
    console.log("connection-->", err)
}))

exports.pgClient = _pgClient;