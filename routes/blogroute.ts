import * as express from "express"
import {GPass , GCookie, GBlog} from '../database';
let fetch = require('node-fetch');
let route : any = express.Router();
let showdown = require('showdown');
route.get('/', (req : any, res: any) => {
	res.render('MainBlog');
})


route.get('/all', (req : any, res: any) => {
	res.write("All!");
	res.end();
})


route.get('/git', (req : any, res: any) => {
	let n : string[] = [];
	fetch('https://api.github.com/repos/LukeGix/CTF-Writeups/contents', {mode: 'no-cors'})
	.then((data : any) => {
		return data.text();
	})
	.then((d : any) => {
		return JSON.parse(d);
	})
	.then((data : any[]) =>{
		for(let i=0; i < data.length; i++){
			n[i] = data[i].name;
		}
		res.render('githubwriteups', {contents: n, content: undefined, prefix: undefined});
	})
	.catch((err) => console.log(err))
})

route.get('/git/:text', (req, res) =>{
	let n : string[] = [];
	fetch('https://api.github.com/repos/LukeGix/CTF-Writeups/contents/' + req.params.text, {mode: 'no-cors'})
	.then((data : any) => {
		return data.text();
	})
	.then((d : any) => {
		return JSON.parse(d);
	})
	.then((data : any[]) =>{
		console.log(data);
		for(let i=0; i < data.length; i++){
			n[i] = data[i].name;
		}
		res.render('githubwriteups', {contents: n, content: undefined, prefix: req.params.text});
	})
	.catch((err) => console.log(err))
})


route.get('/git/:pr/:text', (req, res) =>{
	let converter = new showdown.Converter();
	let html = converter.makeHtml('# This is a test!');	//Devo riuscire ad ottenere il markdown dei file git
	res.render('githubwriteups', {contents: undefined, content: html, prefix: undefined});
	//DA SISTEMARE

	
})

route.get('/researches', (req, res) => {
	GBlog((rensp) => {
		console.log(rensp);
		let blogs : object[] = rensp;
		res.render('researches', {b: blogs});
	}, null)


})


route.get('/researches/:title', (req, res) => {
	GBlog((rensp) => {
		console.log(rensp);
	}, {Title: req.params.title})


})
export {route as blogroute};