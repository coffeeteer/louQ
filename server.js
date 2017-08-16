const express = require('express');
const http = require('http');
const exphbs  = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//Mongoose *************************************
mongoose.connect('mongodb://localhost/lou-quallenberg-contact', { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('We\'re connected baby!')	
});

const contactSchema = mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	piece: String,
	comments: String,
	daySent: Date
});

var contactForm = mongoose.model('contactModal', contactSchema);

var newForm = new contactModal({
	name: 'test',
	phone: '555-555-5555',
	email: 'test@testmail.com',
	piece: 'table',
	comments: 'Lorem ipsum',
	daySent: '01.02.2012'
});

contactSchema.methods.modal = function(){
	var popup = this.name
	? "Thank you, " + this.name + " we'll get back to you shortly."
	: "Sorry, you didn't fill out your name."
	console.log(popup);
};

newForm.save(function(err, ){
	if(err) return console.error(err);
	newForm.modal();
});

Pupper.find({ name: /^spike/ }, function() {
	console.log('Finished the start-up tutoria with mongoose.')
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