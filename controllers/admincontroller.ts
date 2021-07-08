import {SBlog} from '../database';
let bodyparser = require('body-parser');

exports.renderNewBlog = function(req : any, res: any){
	if(/*(req.connection.remoteAddress.split(':')[3] !== "127.0.0.1") || (*/req.headers['x-forwarded-for'] !== undefined/*)*/){
		res.status(404);
	}else{
		res.render('NewBlog');
	} 
	
};

exports.setNewBlog = function(req : any, res: any){
	SBlog({Title:req.body.Title.toString(), Author: req.body.Author.toString(), Body: req.body.Body});
	res.redirect('../Login');
}