"use strict";
exports.__esModule = true;
exports.logoutroute = void 0;
var express = require("express");
var logout_controller = require('../controllers/logoutcontroller');
var route = express.Router();
exports.logoutroute = route;
route.get('/', logout_controller.index);
