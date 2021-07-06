import * as express from "express";
import {GBlogCount, GSubCount} from '../database';
let route : any = express.Router();

route.get('/getcount/articles', (req, res) => {
	GBlogCount().then((data) => {
		let risposta : Object = {number: data};
		res.json(JSON.stringify(risposta));
		res.end();
	});
	
})


route.get('/getcount/sub', (req, res) => {
	GSubCount().then((data) => {
		let risposta : Object = {number: data};
		res.json(JSON.stringify(risposta));
		res.end();
	});
	
})

export {route as apiroute};