"use strict";
exports.__esModule = true;
exports.apiroute = void 0;
var express = require("express");
var database_1 = require("../database");
var route = express.Router();
exports.apiroute = route;
route.get('/getcount/articles', function (req, res) {
    database_1.GBlogCount().then(function (data) {
        var risposta = { number: data };
        res.json(JSON.stringify(risposta));
        res.end();
    });
});
route.get('/getcount/sub', function (req, res) {
    database_1.GSubCount().then(function (data) {
        var risposta = { number: data };
        res.json(JSON.stringify(risposta));
        res.end();
    });
});
