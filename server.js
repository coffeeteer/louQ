const express = require('express');
const http = require('http');
const hbs = require('express-handlebars')

const app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('./public'));

// app.get('/', (req, res) => {
// 	res.sendFile('index.html');
// });

app.get('/', function(req, res) {
  res.render('index');
});

const server = new http.Server(app);

const port = 3010;
server.listen(port, () => {
	console.log(`Server started on ${port}`)
});