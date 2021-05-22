import * as express from "express"
import * as fs from 'fs';
import {GPass , GCookie, GBlog} from '../database';
import {createHash} from 'crypto';
let json : string = '';
let route : any = express.Router();

route.get('/', (req : any, res : any) => {
	res.render('login');
})

route.post('/' , (req : any, res : any) => {
	GPass((rensp) => {
		console.log(rensp);
		if(createHash('md5').update(req.body.password).digest('hex') === rensp.password){
			console.log('Success!');
			res.render('login-success', {user: req.body.username});
		}else{
			console.log('fail');
			res.render('fail');
		}

	});
})

export {route as loginroute};