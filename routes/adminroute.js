"use strict";
exports.__esModule = true;
exports.adminroute = void 0;
var express = require("express");
var admin_controller = require('../controllers/admincontroller');
var route = express.Router();
exports.adminroute = route;
route.get('/newblog', admin_controller.renderNewBlog);
route.post('/newblog', admin_controller.setNewBlog);
