const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactForm = Schema({
	name: String
});

const User = mongoose.model('user', ContactForm);

module.exports = User;