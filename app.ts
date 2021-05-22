import * as express from "express";
import {routes} from "./routes/routes";
import * as bodyparser from 'body-parser';
import * as https from 'https';
import * as fs from 'fs';
let obj : any = {root : '/home/luke/Scrivania/ProgettoProgWeb'}
const app : express.Application = express();
const options : any = {
	cert : fs.readFileSync('certs/server.crt'),
	key : fs.readFileSync('certs/server.key')
}
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(obj.root + '/static/css'));
app.use(express.static(obj.root + '/static/img'));
app.use(express.static(obj.root + '/static/script'));
app.use('/', routes);


let httpsServer = https.createServer(options,app);
httpsServer.listen('1337');