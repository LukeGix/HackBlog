import * as User from './models/user';
import * as Cookie from './models/cookie';
import * as Blog from './models/blog';
let mongoose = require('mongoose');

let dburi : string = "mongodb://localhost:27017/LocalApp";

let GetPass : Function = function f(callback : Function){
		mongoose.connect(dburi);
		let conn = mongoose.connection;
		conn.once('open', () => {
			console.log('[*]Connesso al db[*]');
			User.findOne({name:'admin'} , (err, data) =>{
				if(err) throw err;
				callback(data);
			})
		})
}


let GetCookie : Function = function(callback : Function){
		mongoose.connect(dburi);
		let conn = mongoose.connection;
		conn.once('open', () => {
			console.log('[*]Connesso al db[*]');
			Cookie.findOne({role:'admin'} , (err, data) =>{
				if(err) throw err;
				callback(data.password);
			})
		})

		//conn.close();
	}

let GetBlog : Function = function(callback : Function, params){
		mongoose.connect(dburi);
		let conn = mongoose.connection;
		conn.once('open', () => {
			console.log('[*]Connesso al db[*]');
			Blog.findOne(params , (err, data) =>{

				callback(data);
			})
		})

	}


export {
	GetPass as GPass,
	GetCookie as GCookie,
	GetBlog as GBlog
}