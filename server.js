const express = require('express');
const http = require('http');
const exphbs  = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//Mongoose *************************************
mongoose.connect('mongodb://localhost/my_database');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	//we're connected
});

const contactForm = mongoose.Schema({
	name: String
});

var person = mongoose.model('person', contactForm);

var john = new person({name: 'John'});
console.log(john.name);

contactForm.methods.speak = function(){
	var greeting = this.name
	? "Hello my name is " + this.name
	: "I forgot my name. *gives you a dumb look"
};

var person = mongoose.model('person', contactForm);

var buffy = new person({name: 'Buffy'});
buffy.speak();
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