import {Router} from 'express';
import {mainroute} from './mainroute';
import {blogroute} from './blogroute';
import {loginroute} from './loginroute';
const routes = Router();

routes.use('/', mainroute);
routes.use('/MyBlog', blogroute);
routes.use('/Login', loginroute);
export {routes};
