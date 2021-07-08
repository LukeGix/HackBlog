"use strict";
exports.__esModule = true;
var database_1 = require("../database");
var crypto_1 = require("crypto");
var uuid_1 = require("uuid");
var uuid = require("uuid");
var json = '';
var tryAdmin = false;
var cookieParser = require('cookie-parser');
exports.index = function (req, res) {
    if (req.headers.cookie !== undefined) {
        if (uuid.validate(req.headers.cookie.split('=')[1])) {
            database_1.GCookie(function (data) {
                if (data !== null) {
                    if (data.identity.toString() === 'admin') {
                        res.render('adminpage');
                    }
                    else {
                        res.render('login-success', { user: data.identity.toString() });
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
    }
    else {
        res.render('login');
    }
};
exports.login = function (req, res) {
    database_1.GPass(function (rensp) {
        if (req.body.user.toString() === 'admin') {
            tryAdmin = true;
        }
        if (crypto_1.createHash('md5').update(req.body.password).digest('hex') === rensp.password) {
            if (tryAdmin === true) {
                var cookie = uuid_1.v4();
                database_1.SCookie({ identity: 'admin', value: cookie });
                res.cookie('SESSID', cookie, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true
                });
                res.render('adminpage');
            }
            else {
                var cookie = uuid_1.v4();
                database_1.SCookie({ identity: req.body.user.toString(), value: cookie });
                res.cookie('SESSID', cookie, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true
                });
                res.render('login-success', { user: req.body.user.toString() });
            }
        }
        else {
            res.render('fail');
        }
        //Chiamando il metodo toString() mitigo eventuali NoSql injection
    }, { name: req.body.user.toString(), password: req.body.password.toString() });
};
