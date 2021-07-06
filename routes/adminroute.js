"use strict";
exports.__esModule = true;
exports.adminroute = void 0;
var express = require("express");
var database_1 = require("../database");
var axios = require('axios');
var route = express.Router();
exports.adminroute = route;
var showdown = require('showdown');
var bodyparser = require('body-parser');
route.get('/newblog', function (req, res) {
    if ( /*(req.connection.remoteAddress.split(':')[3] !== "127.0.0.1") || (*/req.headers['x-forwarded-for'] !== undefined /*)*/) {
        res.status(404);
    }
    else {
        res.render('NewBlog');
    }
});
route.post('/newblog', function (req, res) {
    database_1.SBlog({ Title: req.body.Title.toString(), Author: req.body.Author.toString(), Body: req.body.Body });
    res.redirect('../Login');
});
