const keys = require("./keys");

// Postgres Database Setup
const { Pool } = require("pg");

const pgClient = new Pool({
	user: keys.pgUser,
	password: keys.pgPassword,
	host: keys.pgHost,
	database: keys.pgDatabase,
	port: keys.pgPort
});

pgClient.on('error', () => console.log('Postgres Connection Fail.'));

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
		.catch(err => console.log(err));

module.exports = pgClient;