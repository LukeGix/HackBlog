mongoose = require('mongoose');
Schema = mongoose.Schema;

const UserSchema = new Schema({
	name : { type : String, required : true},
	password : { type : String , required : true}
}, {timestamp: true , collection : 'Users'})

const User = mongoose.model('User', UserSchema);
module.exports = User;