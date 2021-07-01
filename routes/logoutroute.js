"use strict";
exports.__esModule = true;
exports.logoutroute = void 0;
var express = require("express");
var database_1 = require("../database");
var route = express.Router();
exports.logoutroute = route;
route.get('/', function (req, res) {
    if (req.headers.cookie !== undefined) {
        database_1.RCookie(req.headers.cookie.split('=')[1]);
        res.redirect('../');
    }
    else {
        console.log('error');
    }
});
