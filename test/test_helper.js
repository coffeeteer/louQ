const mongoose = require('mongoose');
const User = ('../src/user.js');

mongoose.connect('mongodb://localhost/contact_form', {useMongoClient: true});

mongoose.connection
	.on('error', console.error.bind(console, 'Error connecting to the database'))
	.once('open', () => {console.log('Connected to MongoDB.')})

module.exports = mongoose.connect;