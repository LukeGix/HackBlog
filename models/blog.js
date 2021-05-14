mongoose = require('mongoose');
Schema = mongoose.Schema;

const BlogSchema = new Schema({
	Title: {
		type: String,
		required: true
	},

	Author: {
		type: String,
		required: true
	},

	Body: {
		type: String,
		required: true
	}

}, {timestamp: true , collection: 'Blogs'})

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;