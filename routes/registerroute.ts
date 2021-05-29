import * as express from "express"
let crypto = require('crypto');
let route : any = express.Router();
let DatabaseUtils = require('../database');

route.get('/', (req, res) => {
	res.render('register', {alarm: undefined});
})

route.post('/', (req, res) => {
	let name = String(req.body.name);
	let username = String(req.body.user);
	let passwd = String(req.body.passwd);
	let cpass = crypto.createHash('md5').update(req.body.passwd).digest('hex');
	DatabaseUtils.SUser({name: name, password: cpass});
	res.render('register', {alarm: true});

})

export {route as registerroute};