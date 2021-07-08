import * as express from "express"

let logout_controller = require('../controllers/logoutcontroller');

let route : any = express.Router();

route.get('/', logout_controller.index);

export {route as logoutroute};