const express = require('express');
const http = require('http');

const app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

const server = new http.Server(app);

const port = 3010;
server.listen(port, () => {
	console.log(`Server started on ${port}`)
});