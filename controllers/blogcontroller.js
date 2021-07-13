"use strict";
exports.__esModule = true;
var database_1 = require("../database");
var axios = require('axios');
var showdown = require('showdown');
exports.getGit = function (req, res) {
    axios.get('https://api.github.com/repos/LukeGix/CTF-Writeups/contents')
        .then(function (data) {
        return data.data;
    })
        .then(function (data) {
        var n = (data.length - 1);
        res.render('githubwriteups', { number: n, content: undefined }); //N mi serve per sapere quanti bottoni devo creare
    })["catch"](function (err) { return console.log(err); });
};
exports.getGitContents = function (req, res) {
    var converter = new showdown.Converter({ tables: true });
    var URI = 'https://raw.githubusercontent.com/LukeGix/CTF-Writeups/main/' + req.params.pr + '/' + req.params.text;
    axios.get(URI)
        .then(function (rensp) {
        var html = converter.makeHtml(rensp.data);
        html = html.replace(/<\s*em[^>]*>([\s\S]*[\w\W]*[\d\D]*)<\s*\/\s*em>|<\s*\/\s*em>|<em>/gi, "$1");
        html = html.replace(/<\s*em[^>]*>([\s\S]*[\w\W]*[\d\D]*)<\s*\/\s*em>|<\s*\/\s*em>|<em>/gi, "$1");
        res.render('githubwriteups', { number: undefined, content: html });
    })["catch"](function (err) {
        console.log(err);
    });
};
exports.getArticleMain = function (req, res) {
    database_1.GBlog(function (rensp) {
        var blogs = rensp;
        res.render('researches', { b: blogs });
    }, null);
};
exports.getArticles = function (req, res) {
    database_1.GBlog(function (rensp) {
        rensp.Body = rensp.Body.replace(/\\/g, "");
        res.render('ResearchModel', { blog: rensp });
    }, req.params.id.toString());
};
