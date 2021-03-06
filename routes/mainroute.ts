import * as express from "express"
import * as fs from 'fs';
import {IVisitorCount} from './../database';
let json : string = '';
fs.createReadStream('/home/luke/Scrivania/ProgettoProgWeb/static/Bio.json').on('data', (chunk) => {
	json += chunk;
})
.on('finish', () => {
	console.log(json);
})

let route : any = express.Router();


route.get('/', (req : any, res : any) => {
	res.render('index', {biotext: (JSON.parse(json)).bio});
	IVisitorCount();
})

export {route as mainroute};