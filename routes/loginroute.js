"use strict";
exports.__esModule = true;
exports.loginroute = void 0;
var express = require("express");
var login_controller = require('../controllers/logincontroller');
var route = express.Router();
exports.loginroute = route;
route.get('/', login_controller.index);
route.post('/', login_controller.login);
