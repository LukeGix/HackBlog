"use strict";
exports.__esModule = true;
var database_1 = require("../database");
exports.getCountArticles = function (req, res) {
    database_1.GBlogCount().then(function (data) {
        var risposta = { number: data };
        res.json(JSON.stringify(risposta));
        res.end();
    });
};
exports.getCountSub = function (req, res) {
    database_1.GSubCount().then(function (data) {
        var risposta = { number: data };
        res.json(JSON.stringify(risposta));
        res.end();
    });
};
exports.getCountVisitors = function (req, res) {
    database_1.GVisitorCount(function (data) {
        var risposta = { number: data };
        res.json(JSON.stringify(risposta));
        res.end();
    });
};
