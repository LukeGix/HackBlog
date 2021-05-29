import * as express from "express"
import {GPass , GCookie, GBlog} from '../database';
let axios = require('axios');
let route : any = express.Router();
let showdown = require('showdown');


route.get('/newblog', (req : any, res: any) => {
	res.render('NewBlog');
})

route.post('/newblog', (req : any, res: any) => {
	res.render('MainBlog');
})
export {route as adminroute}