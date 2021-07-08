import * as fs from 'fs';
import {GPass , GCookie, GBlog, RCookie} from '../database';
import {createHash} from 'crypto';

exports.index = function(req,res){
	if(req.headers.cookie !== undefined){
		RCookie(req.headers.cookie.split('=')[1]);
		res.redirect('../');
	}
	else{
		console.log('error');
	}
}