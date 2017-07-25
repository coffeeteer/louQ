const express = require('express');
const http = require('http');
var exphbs  = require('express-handlebars')
const path = require('path');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static('./public'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/gallery', function(req, res) {
	res.render('gallery');
});

app.get('/news', function(req, res) {
	res.render('news');
});

app.get('/about', function(req, res) {
	res.render('about')
});

app.get('/art', function(req, res) {
	res.render('art')
});

const server = new http.Server(app);

const port = 3010;
server.listen(port, () => {
	console.log(`Server started on ${port}`)
});