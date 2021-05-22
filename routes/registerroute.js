"use strict";
exports.__esModule = true;
exports.registerroute = void 0;
var express = require("express");
var route = express.Router();
exports.registerroute = route;
route.get('/', function (req, res) {
    res.render('register');
});
