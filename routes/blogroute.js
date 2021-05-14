"use strict";
exports.__esModule = true;
exports.blogroute = void 0;
var express = require("express");
var route = express.Router();
exports.blogroute = route;
route.get('/', function (req, res) {
    res.write("Blog!");
    res.end();
});
route.get('/all', function (req, res) {
    res.write("All!");
    res.end();
});
route.get('/git', function (req, res) {
    res.write("Git!");
    res.end();
});
