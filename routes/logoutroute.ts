import * as express from "express"
import * as fs from 'fs';
import {GPass , GCookie, GBlog, RCookie} from '../database';
import {createHash} from 'crypto';

let route : any = express.Router();

route.get('/', (req,res) => {
	if(req.headers.cookie !== undefined){
		console.log(req.headers.cookie.split('=')[1]);
		RCookie(req.headers.cookie.split('=')[1]);
		res.redirect('../');
	}
	else{
		console.log('error');
	}
})

export {route as logoutroute};