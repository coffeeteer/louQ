const express = require('express');
const http = require('http');
const exphbs  = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//Mongoose *************************************
mongoose.connect('mongodb://localhost/test2', {useMongoClient: true});

var db = mongoose.connection
	.on('error', console.error.bind(console, 'This is an error'))
	.once('open', ()=> console.log('We\'re connected to Mongoose yay'));

var Rest = mongoose.Schema({
	type: String,
	hours: Number,
	restful: Boolean
});

Rest.methods.sleep = function() {
	var dream = this.type
	? `I dream of Genie while ${this.type} `
	: `I did not dream at all`
	console.log(dream)
};

var Night = mongoose.model('Night', Rest);

var lastNight = new Night({type: 'I lay still', hours: 6, restful: true});
lastNight.sleep()
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