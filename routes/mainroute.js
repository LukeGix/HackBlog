"use strict";
exports.__esModule = true;
exports.mainroute = void 0;
var express = require("express");
var fs = require("fs");
var database_1 = require("./../database");
var json = '';
fs.createReadStream('/home/luke/Scrivania/ProgettoProgWeb/static/Bio.json').on('data', function (chunk) {
    json += chunk;
})
    .on('finish', function () {
    console.log(json);
});
var route = express.Router();
exports.mainroute = route;
route.get('/', function (req, res) {
    res.render('index', { biotext: (JSON.parse(json)).bio });
    database_1.IVisitorCount();
});
