import * as express from "express"
import {GPass , GCookie, GBlog} from '../database';
let axios = require('axios');
let route : any = express.Router();
let showdown = require('showdown');
route.get('/', (req : any, res: any) => {
	res.render('MainBlog');
})


route.get('/git', (req : any, res: any) => {
	let n : string[] = [];
	axios.get('https://api.github.com/repos/LukeGix/CTF-Writeups/contents')
	.then((data : any) => {
		return data.data;
	})
	.then((data : any[]) => {
		for(let i=0; i < data.length; i++){
			if(data[i].name === "README.md"){
				continue;
			}
			n[i] = data[i].name;
		}
		res.render('githubwriteups', {contents: n, content: undefined, prefix: req.params.text});
	})
	.catch((err) => console.log(err))
})

route.get('/git/:text', (req, res) =>{
	let n : string[] = [];
	axios.get('https://api.github.com/repos/LukeGix/CTF-Writeups/contents/' + req.params.text)
	.then((data : any) => {
		return data.data;
	})
	.then((data : any[]) =>{
		for(let i=0; i < data.length; i++){
			n[i] = data[i].name;
		}
		res.render('githubwriteups', {contents: n, content: undefined, prefix: req.params.text});
	})
	.catch((err) => console.log(err))
})


route.get('/git/:pr/:text', (req, res) =>{
	let converter = new showdown.Converter();
	let URI = 'https://raw.githubusercontent.com/LukeGix/CTF-Writeups/main/'+req.params.pr+'/'+req.params.text;
	axios.get(URI)
	.then((rensp) => {
		let html = converter.makeHtml(rensp.data);
		res.render('githubwriteups', {contents: undefined, content: html, prefix: undefined});
	})
	.catch(err => {
		console.log(err);
	})
	
	//DA SISTEMARE

	
})

route.get('/researches', (req, res) => {
	GBlog((rensp) => {
		let blogs : object[] = rensp;
		console.log(rensp);
		res.render('researches', {b: blogs});
	}, null)


})

//title è un input dell'utente!!!! --> CONTROLLALO --> regex a non finire
route.get('/researches/:title', (req, res) => {
	GBlog((rensp) => {
		res.render('ResearchModel', {blog: rensp});
	}, {Title: req.params.title})


})
export {route as blogroute};