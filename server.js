const express = require('express');
const http = require('http');
const exphbs  = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//Mongoose *************************************
mongoose.connect('mongodb://localhost/test2' , {useMongoClient: true});

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'You have a mongo connection error:'))
	db.once('open', function(){
		console.log('We have a Mongoose Database connection!');
	});
	
var TvSchema = mongoose.Schema({
	title: String,
	network: String
});
	
var HboShows =  mongoose.model('HboShows', TvSchema);

var got = new HboShows({title: 'Game of Thrones', network: 'HBO'});

console.log(got.title + ' on ' + got.network);

// TvSchema.methods.jonSnow = function(){
// 	var snow = this.title
// 	?	'" Jon Snow is King of the North!" on ' + this.title
// 	:	'"You know nothing Jon Snow" a famous quote on ' + this.title;
// 	console.log(snow);
// };

// got.jonSnow()

//Mongoose ***********************---------------

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

const port = process.env.PORT || 3010;
server.listen(port, () => {
	console.log(`Server started on ${port}`)
});