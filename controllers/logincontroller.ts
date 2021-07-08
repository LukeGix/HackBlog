import * as fs from 'fs';
import {GPass , GCookie, GBlog, SCookie} from '../database';
import {createHash} from 'crypto';
import {v4 as uuidv4} from 'uuid';
import * as uuid from 'uuid';
let json : string = '';
let tryAdmin : boolean = false;
let cookieParser = require('cookie-parser');

exports.index = function(req : any, res : any){
	
	if(req.headers.cookie !== undefined){
		
		if(uuid.validate(req.headers.cookie.split('=')[1])){
			GCookie((data) => {
				if(data !== null){
					if(data.identity.toString() === 'admin'){
						res.render('adminpage');
					}
					else{
						res.render('login-success', {user: data.identity.toString()});
					}
				}else{
					res.render('login');
				}

			} , req.headers.cookie.split('=')[1])

		}else{
			res.render('login');
		}

	}else{
		res.render('login');
	}

}

exports.login = function(req : any, res : any){
	GPass((rensp) => {
		if(req.body.user.toString() === 'admin'){
			tryAdmin = true;
		}

		if(createHash('md5').update(req.body.password).digest('hex') === rensp.password){
			if(tryAdmin === true){
				let cookie = uuidv4();
				SCookie({identity: 'admin', value: cookie});

				res.cookie('SESSID', cookie, {
					maxAge: 24 * 60 * 60 * 1000,
					httpOnly: true,
					secure: true
				});

				res.render('adminpage');

			}else{

				let cookie = uuidv4();
				SCookie({identity: req.body.user.toString(), value: cookie});

				res.cookie('SESSID', cookie, {
					maxAge: 24 * 60 * 60 * 1000,
					httpOnly: true,
					secure: true
				});

				res.render('login-success', {user: req.body.user.toString()}); 
				
			}
		}else{
			res.render('fail');
		}
//Chiamando il metodo toString() mitigo eventuali NoSql injection
	}, {name : req.body.user.toString(), password: req.body.password.toString()});	
}