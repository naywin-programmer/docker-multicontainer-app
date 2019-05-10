const http = require("./config/http");
const pgClient = require("./config/db");
const { redisClient, redisPublisher } = require("./config/redis_client");

// routes
http.get('/', (req, res) => {
	res.send("Hello from express http client!");
});

http.get('/values/all', async (req, res) => {
	const values = await pgClient.query("SELECT * FROM values");

	res.send(values.rows);
});

http.get('/values/current', async (req, res) => {
	redisClient.hgetall('values', (error, values) => {
		res.send(values);
	});
});

http.post('/values', async (req, res) => {
	const index = req.body.index;

	if(parseInt(index) > 40) {
		return res.status(422).send('Index is too high');
	}

	redisClient.hset('values', index, 'Do not calculate yet.');
	redisPublisher.publish('insert', index);

	pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

	res.send({ working: true });
});

http.listen(5000, err => console.log("Listening"));