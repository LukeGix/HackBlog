"use strict";
exports.__esModule = true;
exports.adminroute = void 0;
var express = require("express");
var axios = require('axios');
var route = express.Router();
exports.adminroute = route;
var showdown = require('showdown');
route.get('/newblog', function (req, res) {
    res.render('NewBlog');
});
route.post('/newblog', function (req, res) {
    res.render('MainBlog');
});
