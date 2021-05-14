"use strict";
exports.__esModule = true;
exports.routes = void 0;
var express_1 = require("express");
var mainroute_1 = require("./mainroute");
var blogroute_1 = require("./blogroute");
var loginroute_1 = require("./loginroute");
var routes = express_1.Router();
exports.routes = routes;
routes.use('/', mainroute_1.mainroute);
routes.use('/MyBlog', blogroute_1.blogroute);
routes.use('/Login', loginroute_1.loginroute);
