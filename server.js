const express = require('express');
const http = require('http');
const exphbs  = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//Mongoose *************************************
mongoose.connect('mongodb://localhost/test2', {useMongoClient: true});

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'You have and error'))
	db.once('open', function(){
		console.log('Mongoose is up.')
	});

var TvSchema = mongoose.Schema({
	title: String,
	year: Number,
	com: String
});	

TvSchema.methods.comments = function() {
	var viewerComments = this.com
		? this.com + ' is a great flick.'
		: this.com + ' is absolutely terrible.';
	console.log(viewerComments);
};

var Shows = mongoose.model('Shows', TvSchema);

var theRanch = new Shows({title: 'The Ranch', year: 2017, com: ''});

// console.log(theRanch.title, + ' ' + theRanch.year + ' ' + theRanch.com)

theRanch.save(function(err, theRanch){
	if(err) return console.error(err);
	theRanch.comments();
});
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