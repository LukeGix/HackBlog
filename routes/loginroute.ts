import * as express from "express"
import * as fs from 'fs';
import {GPass , GCookie, GBlog, SCookie} from '../database';
import {createHash} from 'crypto';
let cookieParser = require('cookie-parser');
let json : string = '';
let tryAdmin : boolean = false;
let route : any = express.Router();

route.get('/', (req : any, res : any) => {
	
	if(req.headers.cookie !== undefined){
		//console.log(req.headers.cookie.split('=')[1]);
		GCookie((data) => {
			console.log(data);
			if(data !== null){
				console.log(data.value);
				if(data.identity === 'admin'){
					res.render('adminpage');
				}
				else{
					res.render('login-success', {user: data.identity});
				}
			}else{
				res.render('login');
			}

		} , req.headers.cookie.split('=')[1])
	}else{
		res.render('login');
	}

})

route.post('/' , (req : any, res : any) => {
	GPass((rensp) => {
		console.log(req.connection.remoteAddress.split(':')[3]);
		console.log(req.headers);
		//console.log(rensp.name + ' ' + rensp.password);
		if(req.body.user === 'admin'){
			tryAdmin = true;
		}

		if(createHash('md5').update(req.body.password).digest('hex') === rensp.password){
			if(tryAdmin === true){
				//Devo dare i cookie di sessione --> COOKIE DA SISTEMARE
				SCookie({identity: 'admin', value: 'admin' });

				res.cookie('SESSID', 'admin', {
					maxAge: 24 * 60 * 60 * 1000,
					httpOnly: true,
					secure: true
				});

				res.render('adminpage');

			}else{

				SCookie({identity: req.body.user, value: req.body.user });

				res.cookie('SESSID', req.body.user, {
					maxAge: 24 * 60 * 60 * 1000,
					httpOnly: true,
					secure: true
				});

				res.render('login-success', {user: req.body.user}); //CONTROLLA L'INPUT
				
			}
		}else{
			res.render('fail');
		}

	}, {name : req.body.user, password: req.body.password});	//PERICOLOSA QUESTA COSA --> RICORDATI CTF HTB!!
})

export {route as loginroute};