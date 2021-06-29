mongoose = require('mongoose');
Schema = mongoose.Schema;

const CommentSchema = new Schema({
	postId: {
		type: String,
		required: true
	},

	author: {
		type: String,
		required: true
	},

	text: {
		type: String,
		required: true
	}

}, {timestamp: true , collection: 'Comment'})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;