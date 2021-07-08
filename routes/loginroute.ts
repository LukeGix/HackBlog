import * as express from "express"

let login_controller = require('../controllers/logincontroller');

let route : any = express.Router();

route.get('/', login_controller.index);

route.post('/' , login_controller.login);

export {route as loginroute};