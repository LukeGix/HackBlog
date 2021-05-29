import * as express from "express"
import * as fs from 'fs';
import {GPass , GCookie, GBlog} from '../database';
import {createHash} from 'crypto';
let cookieParser = require('cookie-parser');
let json : string = '';
let tryAdmin : boolean = false;
let route : any = express.Router();

route.get('/', (req : any, res : any) => {
	res.render('login');
})

route.post('/' , (req : any, res : any) => {
	GPass((rensp) => {
		if(req.body.user === 'admin'){
			tryAdmin = true;
		}

		if(createHash('md5').update(req.body.password).digest('hex') === rensp.password){
			if(tryAdmin === true){
				//Devo dare i cookie di sessione --> COOKIE DA SISTEMARE
				res.cookie('SESSID', 'admin', {
					maxAge: 360000,
					httpOnly: true,
					secure: true
				});
				res.render('adminpage');
				
				

			}else{
				res.cookie('SESSID', 'userNormale', {
					maxAge: 360000
				});
				res.render('login-success', {user: req.body.user}); //CONTROLLA L'INPUT
				
			}
		}else{
			res.render('fail');
		}

	}, {name : req.body.user, password: req.body.password});	//PERICOLOSA QUESTA COSA --> RICORDATI CTF HTB!!
})

export {route as loginroute};