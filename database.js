"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GSubCount = exports.GBlogCount = exports.SCookie = exports.RCookie = exports.SUser = exports.SBlog = exports.GBlog = exports.GCookie = exports.GPass = void 0;
var User = require("./models/user");
var Cookie = require("./models/cookie");
var Blog = require("./models/blog");
var mongoose = require('mongoose');
var crypto = require('crypto');
var dburi = "mongodb://localhost:27017/LocalApp";
var GetPass = function f(callback, params) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        User.findOne({ name: params.name, password: crypto.createHash('md5').update(params.password).digest('hex') }, function (err, data) {
            if (err)
                throw err;
            callback(data);
            conn.close();
        });
    });
};
exports.GPass = GetPass;
var RemoveCookie = function f(params) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
                    return [4 /*yield*/, mongoose.connection];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, Cookie.deleteOne({ value: params })];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    return [4 /*yield*/, conn.close()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.RCookie = RemoveCookie;
var GetCookie = function (callback, params) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        Cookie.findOne({ value: params }, function (err, data) {
            if (err)
                throw err;
            callback(data);
            conn.close();
        });
    });
};
exports.GCookie = GetCookie;
var GetBlog = function (callback, params) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        if (params !== null) {
            Blog.findOne({ '_id': params }, function (err, data) {
                if (err)
                    throw err;
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
var SetBlog = function (params) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        var us = new Blog(params);
        us.save(function (err, doc, num) {
            if (err)
                throw err;
            conn.close();
        });
    });
};
exports.SBlog = SetBlog;
//DEVO RENDERLA ASYNC AWAIT
var SetCookie = function (params) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        var us = new Cookie(params);
        us.save(function (err, doc, num) {
            if (err)
                throw err;
            console.log('salvataggio effettuato con successo');
            conn.close();
        });
    });
};
exports.SCookie = SetCookie;
var SetUser = function (params) {
    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    conn.once('open', function () {
        var us = new User(params);
        us.save(function (err, doc, num) {
            if (err)
                throw err;
            console.log('salvataggio effettuato con successo');
            conn.close();
        });
    });
};
exports.SUser = SetUser;
var GetBlogCount = function (callback) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, num;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
                    return [4 /*yield*/, mongoose.connection];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, Blog.countDocuments({})];
                case 2:
                    num = _a.sent();
                    conn.close();
                    return [2 /*return*/, num];
            }
        });
    });
};
exports.GBlogCount = GetBlogCount;
var GetSubCount = function (callback) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, num;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
                    return [4 /*yield*/, mongoose.connection];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, User.countDocuments({})];
                case 2:
                    num = _a.sent();
                    conn.close();
                    return [2 /*return*/, num];
            }
        });
    });
};
exports.GSubCount = GetSubCount;
