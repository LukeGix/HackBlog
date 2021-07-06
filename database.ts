import * as User from './models/user';
import * as Cookie from './models/cookie';
import * as Blog from './models/blog';
import * as Visitor from './models/visitor';
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

let RemoveCookie : Function = async function f(params){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = await mongoose.connection;
		let res = await Cookie.deleteOne({value: params});
		await conn.close();
}


let GetCookie : Function = function(callback : Function, params){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = mongoose.connection;
		conn.once('open', () => {
			Cookie.findOne({value: params} , (err, data) =>{
				if(err) throw err;
				callback(data);
				conn.close();
			})
		})

		
}

let GetBlog : Function = function(callback : Function, params : string){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = mongoose.connection;
		conn.once('open', () => {
			if(params !== null){
				Blog.findOne({'_id': params}, (err, data) =>{
					if (err) throw err;
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
			conn.close();
		});
	})
}

//DEVO RENDERLA ASYNC AWAIT
let SetCookie : Function = function(params : object){
	mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
	let conn = mongoose.connection;
	conn.once('open', () => {
		let us = new Cookie(params);
		us.save((err, doc, num) => {
			if(err) throw err;
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
			conn.close();
		});
	})
}


let GetBlogCount : Function = async function(){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = await mongoose.connection;
		let num = await Blog.countDocuments({});
		conn.close();
		return num
}


let GetSubCount : Function = async function(){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = await mongoose.connection;
		let num = await User.countDocuments({});
		conn.close();
		return num
}

let GetVisitorCount : Function = function(callback : Function){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = mongoose.connection;
		conn.once('open', () => {
			Visitor.findOne({name: 'counter'} , (err, data) => {
				if(err) throw err;
				callback(data.value);
				conn.close();
			})
		})


}

let IncrementVisitorCount : Function = function(){
		mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
		let conn = mongoose.connection;
		conn.once('open', () => {
			Visitor.findOneAndUpdate({name: "counter"}, { $inc: { value: 1 }} , (err, data) => {
				if (err) throw err;
				conn.close();
			})
		})
}

export {
	GetPass as GPass,
	GetCookie as GCookie,
	GetBlog as GBlog,
	SetBlog as SBlog,
	SetUser as SUser,
	RemoveCookie as RCookie,
	SetCookie as SCookie,
	GetBlogCount as GBlogCount,
	GetSubCount as GSubCount,
	GetVisitorCount as GVisitorCount,
	IncrementVisitorCount as IVisitorCount
}