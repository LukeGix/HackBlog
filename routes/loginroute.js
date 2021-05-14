"use strict";
exports.__esModule = true;
exports.loginroute = void 0;
var express = require("express");
var database_1 = require("../database");
var crypto_1 = require("crypto");
var json = '';
var route = express.Router();
exports.loginroute = route;
route.get('/', function (req, res) {
    res.render('login');
});
route.post('/', function (req, res) {
    database_1.GPass(function (rensp) {
        console.log(rensp);
        if (crypto_1.createHash('md5').update(req.body.password).digest('hex') === rensp.password) {
            console.log('Success!');
        }
        else {
            console.log('fail');
        }
    });
});
