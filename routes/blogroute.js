"use strict";
exports.__esModule = true;
exports.blogroute = void 0;
var express = require("express");
var database_1 = require("../database");
var axios = require('axios');
var route = express.Router();
exports.blogroute = route;
var showdown = require('showdown');
route.get('/', function (req, res) {
    res.render('MainBlog');
});
route.get('/git', function (req, res) {
    var n = [];
    axios.get('https://api.github.com/repos/LukeGix/CTF-Writeups/contents')
        .then(function (data) {
        return data.data;
    })
        .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name === "README.md") {
                continue;
            }
            n[i] = data[i].name;
        }
        res.render('githubwriteups', { contents: n, content: undefined, prefix: req.params.text });
    })["catch"](function (err) { return console.log(err); });
});
route.get('/git/:text', function (req, res) {
    var n = [];
    axios.get('https://api.github.com/repos/LukeGix/CTF-Writeups/contents/' + req.params.text)
        .then(function (data) {
        return data.data;
    })
        .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            n[i] = data[i].name;
        }
        res.render('githubwriteups', { contents: n, content: undefined, prefix: req.params.text });
    })["catch"](function (err) { return console.log(err); });
});
route.get('/git/:pr/:text', function (req, res) {
    var converter = new showdown.Converter();
    var URI = 'https://raw.githubusercontent.com/LukeGix/CTF-Writeups/main/' + req.params.pr + '/' + req.params.text;
    axios.get(URI)
        .then(function (rensp) {
        var html = converter.makeHtml(rensp.data);
        res.render('githubwriteups', { contents: undefined, content: html, prefix: undefined });
    })["catch"](function (err) {
        console.log(err);
    });
    //DA SISTEMARE
});
route.get('/researches', function (req, res) {
    database_1.GBlog(function (rensp) {
        var blogs = rensp;
        console.log(rensp);
        res.render('researches', { b: blogs });
    }, null);
});
//title è un input dell'utente!!!! --> CONTROLLALO --> regex a non finire
route.get('/researches/:title', function (req, res) {
    database_1.GBlog(function (rensp) {
        res.render('ResearchModel', { blog: rensp });
    }, { Title: req.params.title });
});
