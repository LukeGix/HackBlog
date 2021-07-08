mongoose = require('mongoose');
Schema = mongoose.Schema;

const CookieSchema = new Schema({
	identity: {
		type: String,
		required: true
	},
	
	value: {
		type: String,
		required: true
	}

}, {timestamp: true , collection: 'Cookies'})

const Cookie = mongoose.model('Cookie', CookieSchema);
module.exports = Cookie;