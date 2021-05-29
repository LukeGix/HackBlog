"use strict";
exports.__esModule = true;
exports.loginroute = void 0;
var express = require("express");
var database_1 = require("../database");
var crypto_1 = require("crypto");
var cookieParser = require('cookie-parser');
var json = '';
var tryAdmin = false;
var route = express.Router();
exports.loginroute = route;
route.get('/', function (req, res) {
    res.render('login');
});
route.post('/', function (req, res) {
    //GPASS --> cerca solo admin!!
    database_1.GPass(function (rensp) {
        console.log(rensp);
        console.log(req.body.user);
        if (req.body.user === 'admin') {
            tryAdmin = true;
        }
        if (crypto_1.createHash('md5').update(req.body.password).digest('hex') === rensp.password) {
            console.log('Success!');
            if (tryAdmin === true) {
                res.cookie('SESSID', 'admin', {
                    maxAge: 360000,
                    httpOnly: true,
                    secure: true
                });
                res.render('adminpage');
                //Devo dare i cookie di sessione
            }
            else {
                res.cookie('SESSID', 'userNormale', {
                    maxAge: 360000
                });
                res.render('login-success', { user: req.body.user }); //CONTROLLA L'INPUT
            }
        }
        else {
            console.log('fail');
            res.render('fail');
        }
    }, { name: req.body.user, password: req.body.password }); //PERICOLOSA QUESTA COSA --> RICORDATI CTF HTB!!
});
