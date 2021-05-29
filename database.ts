import * as User from './models/user';
import * as Cookie from './models/cookie';
import * as Blog from './models/blog';
let mongoose = require('mongoose');
let crypto = require('crypto');

let dburi : string = "mongodb://localhost:27017/LocalApp";

let GetPass : Function = function f(callback : Function, params){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = mongoose.connection;
		conn.once('open', () => {
			User.findOne({name: params.name, password: crypto.createHash('md5').update(params.password).digest('hex')} , (err, data) =>{
				if(err) throw err;
				callback(data);
				conn.close();
			})
		})
}


let GetCookie : Function = function(callback : Function){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = mongoose.connection;
		conn.once('open', () => {
			Cookie.findOne({role:'admin'} , (err, data) =>{
				if(err) throw err;
				callback(data.password);
				conn.close();
			})
		})

		
}

let GetBlog : Function = function(callback : Function, params){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = mongoose.connection;
		conn.once('open', () => {
			if(params !== null){
				Blog.findOne(params , (err, data) =>{
					callback(data);
					conn.close();
				})
			}else if(params === null){
				//DEVO TROVARLI TUTTI
				Blog.find({} , (err, data) => {
					callback(data);
					conn.close();
				})

			}else{
				console.log('Error');
				conn.close()
			}
		})

}

let SetBlog : Function = function(params : object){
	mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
	let conn = mongoose.connection;
	conn.once('open', () => {
		let us = new Blog(params);
		us.save((err, doc, num) => {
			if(err) throw err;
			console.log('salvataggio effettuato con successo');
			conn.close();
		});
	})
}

let SetUser : Function = function(params : object){
	mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
	let conn = mongoose.connection;
	conn.once('open', () => {
		let us = new User(params);
		us.save((err, doc, num) => {
			if(err) throw err;
			console.log('salvataggio effettuato con successo');
			conn.close();
		});
	})
}

export {
	GetPass as GPass,
	GetCookie as GCookie,
	GetBlog as GBlog,
	SetBlog as SBlog,
	SetUser as SUser
}