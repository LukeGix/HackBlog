import * as express from "express"
import {SBlog} from '../database';
let axios = require('axios');
let route : any = express.Router();
let showdown = require('showdown');
let bodyparser = require('body-parser');


route.get('/newblog', (req : any, res: any) => {
	if(/*(req.connection.remoteAddress.split(':')[3] !== "127.0.0.1") || (*/req.headers['x-forwarded-for'] !== undefined/*)*/){
		res.status(404);
	}else{
		res.render('NewBlog');
	} 
	
})

route.post('/newblog', (req : any, res: any) => {
	SBlog({Title:req.body.Title.toString(), Author: req.body.Author.toString(), Body: req.body.Body});
	res.redirect('../Login');
})
export {route as adminroute}