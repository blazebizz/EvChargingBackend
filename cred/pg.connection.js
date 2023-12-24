const pg = require("pg");

const { pg_config } = require("./env");

// const pgclient = new pg.Pool({
//     user: pg_config.user,
//     database: pg_config.database,
//     port: pg_config.port,
//     host: pg_config.host,
//     password: pg_config.password
// });

const pgclient = require('knex')({
    client: 'pg',
    connection: {
        // connectionString: config.DATABASE_URL,
        user: pg_config.user,
        database: pg_config.database,
        port: pg_config.port,
        host: pg_config.host,
        password: pg_config.password
    },
    debug: true
});

exports.pgclient = pgclient;