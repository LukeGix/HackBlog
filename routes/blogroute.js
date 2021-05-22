"use strict";
exports.__esModule = true;
exports.blogroute = void 0;
var express = require("express");
var database_1 = require("../database");
var fetch = require('node-fetch');
var route = express.Router();
exports.blogroute = route;
var showdown = require('showdown');
route.get('/', function (req, res) {
    res.render('MainBlog');
});
route.get('/all', function (req, res) {
    res.write("All!");
    res.end();
});
route.get('/git', function (req, res) {
    var n = [];
    fetch('https://api.github.com/repos/LukeGix/CTF-Writeups/contents', { mode: 'no-cors' })
        .then(function (data) {
        return data.text();
    })
        .then(function (d) {
        return JSON.parse(d);
    })
        .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            n[i] = data[i].name;
        }
        res.render('githubwriteups', { contents: n, content: undefined, prefix: undefined });
    })["catch"](function (err) { return console.log(err); });
});
route.get('/git/:text', function (req, res) {
    var n = [];
    fetch('https://api.github.com/repos/LukeGix/CTF-Writeups/contents/' + req.params.text, { mode: 'no-cors' })
        .then(function (data) {
        return data.text();
    })
        .then(function (d) {
        return JSON.parse(d);
    })
        .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            n[i] = data[i].name;
        }
        res.render('githubwriteups', { contents: n, content: undefined, prefix: req.params.text });
    })["catch"](function (err) { return console.log(err); });
});
route.get('/git/:pr/:text', function (req, res) {
    var converter = new showdown.Converter();
    var html = converter.makeHtml('# This is a test!'); //Devo riuscire ad ottenere il markdown dei file git
    res.render('githubwriteups', { contents: undefined, content: html, prefix: undefined });
    //DA SISTEMARE
});
route.get('/researches', function (req, res) {
    database_1.GBlog(function (rensp) {
        console.log(rensp);
        var blogs = rensp;
        res.render('researches', { b: blogs });
    }, null);
});
