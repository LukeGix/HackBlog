import {GBlogCount, GSubCount, GVisitorCount} from '../database';

exports.getCountArticles = function(req, res){
	GBlogCount().then((data) => {
		let risposta : Object = {number: data};
		res.json(JSON.stringify(risposta));
		res.end();
	});
	
}

exports.getCountSub = function(req, res){
	GSubCount().then((data) => {
		let risposta : Object = {number: data};
		res.json(JSON.stringify(risposta));
		res.end();
	});
	
}

exports.getCountVisitors = function(req, res){
	GVisitorCount( (data) => {
		let risposta : Object = {number: data};
		res.json(JSON.stringify(risposta));
		res.end();
	});
	
}