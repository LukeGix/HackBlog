mongoose = require('mongoose');
Schema = mongoose.Schema;

const VisitorSchema = new Schema({
	name : {
		type: String,
		required: true
	},

	value : {
		type: Number,
		required: true
	}

}, {timestamp: true , collection: 'Visitors'})

const Visitor = mongoose.model('Visitor', VisitorSchema);
module.exports = Visitor;