import * as express from "express"

let admin_controller = require('../controllers/admincontroller');
let route : any = express.Router();

route.get('/newblog', admin_controller.renderNewBlog);

route.post('/newblog', admin_controller.setNewBlog);




export {route as adminroute}