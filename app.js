"use strict";
exports.__esModule = true;
var express = require('express');
var routes_1 = require("./routes/routes");
var bodyparser = require("body-parser");
var https = require("https");
var fs = require("fs");
var obj = { root: '/home/luke/Scrivania/ProgettoProgWeb' };
var app = express();
var options = {
    cert: fs.readFileSync('certs/server.crt'),
    key: fs.readFileSync('certs/server.key')
};
var allowMethods = ["GET", "POST"];
//let csp : string = "default-src 'self' script-src 'self' style-src 'cdnjs.cloudflare.com'"; //Definisco la mia csp
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(obj.root + '/static/css'));
app.use(express.static(obj.root + '/static/img'));
app.use(express.static(obj.root + '/static/script'));
/*app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        csp
    );
    next();
})*/
app.use(function (req, res, next) {
    if (!allowMethods.includes(req.method)) {
        res.status(405).send('Stop! You violated the law! ' + req.method);
    }
    next();
});
app.use('/', routes_1.routes);
var httpsServer = https.createServer(options, app);
httpsServer.listen('1337');
