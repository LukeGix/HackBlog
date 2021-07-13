import {GPass , GCookie, GBlog} from '../database';
let axios = require('axios');
let showdown = require('showdown');


exports.getGit = function(req : any, res: any){
	axios.get('https://api.github.com/repos/LukeGix/CTF-Writeups/contents')
	.then((data : any) => {
		return data.data;
	})
	.then((data : any[]) => {
		let n = (data.length - 1);
		res.render('githubwriteups', {number : n, content: undefined}); //N mi serve per sapere quanti bottoni devo creare
	})
	.catch((err) => console.log(err))

}

exports.getGitContents = function(req, res){
	let converter = new showdown.Converter({tables: true});
	let URI = 'https://raw.githubusercontent.com/LukeGix/CTF-Writeups/main/'+req.params.pr+'/'+req.params.text;
	axios.get(URI)
	.then((rensp) => {
		let html = converter.makeHtml(rensp.data);
		html = html.replace(/<\s*em[^>]*>([\s\S]*[\w\W]*[\d\D]*)<\s*\/\s*em>|<\s*\/\s*em>|<em>/gi, "$1");
		html = html.replace(/<\s*em[^>]*>([\s\S]*[\w\W]*[\d\D]*)<\s*\/\s*em>|<\s*\/\s*em>|<em>/gi, "$1");
		res.render('githubwriteups', {number: undefined, content: html});
	})
	.catch(err => {
		console.log(err);
	})
	
}

exports.getArticleMain = function(req, res){
	GBlog((rensp) => {
		let blogs : object[] = rensp;
		res.render('researches', {b: blogs});
	}, null)


}

exports.getArticles = function(req, res){
	GBlog((rensp) => {
		rensp.Body = rensp.Body.replace(/\\/g, "");
		res.render('ResearchModel', {blog: rensp});
	}, req.params.id.toString())


}