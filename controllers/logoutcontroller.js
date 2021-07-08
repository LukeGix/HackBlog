"use strict";
exports.__esModule = true;
var database_1 = require("../database");
exports.index = function (req, res) {
    if (req.headers.cookie !== undefined) {
        database_1.RCookie(req.headers.cookie.split('=')[1]);
        res.redirect('../');
    }
    else {
        console.log('error');
    }
};
