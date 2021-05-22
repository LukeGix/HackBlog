"use strict";
exports.__esModule = true;
exports.GBlog = exports.GCookie = exports.GPass = void 0;
var User = require("./models/user");
var Cookie = require("./models/cookie");
var Blog = require("./models/blog");
var mongoose = require('mongoose');
var dburi = "mongodb://localhost:27017/LocalApp";
var GetPass = function f(callback) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        console.log('[*]Connesso al db[*]');
        User.findOne({ name: 'admin' }, function (err, data) {
            if (err)
                throw err;
            callback(data);
            conn.close();
        });
    });
};
exports.GPass = GetPass;
var GetCookie = function (callback) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        console.log('[*]Connesso al db[*]');
        Cookie.findOne({ role: 'admin' }, function (err, data) {
            if (err)
                throw err;
            callback(data.password);
            conn.close();
        });
    });
};
exports.GCookie = GetCookie;
//Questa è per trovare un solo blog element, devo inserire anche quella per trovarli tutti
var GetBlog = function (callback, params) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        console.log('[*]Connesso al db[*]');
        if (params !== null) {
            Blog.findOne(params, function (err, data) {
                callback(data);
                conn.close();
            });
        }
        else if (params === null) {
            //DEVO TROVARLI TUTTI
            Blog.find({}, function (err, data) {
                callback(data);
                conn.close();
            });
        }
        else {
            console.log('Error');
            conn.close();
        }
    });
};
exports.GBlog = GetBlog;
