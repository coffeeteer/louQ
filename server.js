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

const puppySchema = mongoose.Schema({
	name: String
});

// var Pupper = mongoose.model('Pupper', puppySchema);

// var spot = new Pupper({name: 'Spot'});
// console.log(spot.name);

puppySchema.methods.speak = function(){
	var greets = this.name
	? "Woof my name is " + this.name
	: "*NERVOUSLY PEES ON FLOOR AND GIVES YOU A SORROWFUL PUPPER LOOK*"
	console.log(greets);
};

var Pupper = mongoose.model('Pupper', puppySchema);

var spike = new Pupper({name: 'Spike'});

spike.save(function(err, spike){
	if(err) return console.error(err);
	spike.speak();
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