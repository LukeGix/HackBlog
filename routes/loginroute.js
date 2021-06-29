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
    if (req.headers.cookie !== undefined) {
        //console.log(req.headers.cookie.split('=')[1]);
        database_1.GCookie(function (data) {
            console.log(data);
            if (data !== null) {
                console.log(data.value);
                if (data.identity === 'admin') {
                    res.render('adminpage');
                }
                else {
                    res.render('login-success', { user: data.identity });
                }
            }
            else {
                res.render('login');
            }
        }, req.headers.cookie.split('=')[1]);
    }
    else {
        res.render('login');
    }
});
route.post('/', function (req, res) {
    database_1.GPass(function (rensp) {
        //console.log(rensp.name + ' ' + rensp.password);
        if (req.body.user === 'admin') {
            tryAdmin = true;
        }
        if (crypto_1.createHash('md5').update(req.body.password).digest('hex') === rensp.password) {
            if (tryAdmin === true) {
                //Devo dare i cookie di sessione --> COOKIE DA SISTEMARE
                database_1.SCookie({ identity: 'admin', value: 'admin' });
                res.cookie('SESSID', 'admin', {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true
                });
                res.render('adminpage');
            }
            else {
                database_1.SCookie({ identity: req.body.user, value: req.body.user });
                res.cookie('SESSID', req.body.user, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true
                });
                res.render('login-success', { user: req.body.user }); //CONTROLLA L'INPUT
            }
        }
        else {
            res.render('fail');
        }
    }, { name: req.body.user, password: req.body.password }); //PERICOLOSA QUESTA COSA --> RICORDATI CTF HTB!!
});
