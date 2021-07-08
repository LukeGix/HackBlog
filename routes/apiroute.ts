import * as express from "express";
let api_controller = require('../controllers/apicontroller');
let route : any = express.Router();

route.get('/getcount/articles', api_controller.getCountArticles);


route.get('/getcount/sub', api_controller.getCountSub);

route.get('/getcount/visitors', api_controller.getCountVisitors);

export {route as apiroute};