"use strict";
exports.__esModule = true;
exports.registerroute = void 0;
var express = require("express");
var crypto = require('crypto');
var route = express.Router();
exports.registerroute = route;
var DatabaseUtils = require('../database');
route.get('/', function (req, res) {
    res.render('register', { alarm: undefined });
});
route.post('/', function (req, res) {
    var name = String(req.body.name);
    var username = String(req.body.user);
    var passwd = String(req.body.passwd);
    var cpass = crypto.createHash('md5').update(req.body.passwd).digest('hex');
    DatabaseUtils.SUser({ name: name, password: cpass });
    res.render('register', { alarm: true });
});
