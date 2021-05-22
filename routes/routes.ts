import {Router} from 'express';
import {mainroute} from './mainroute';
import {blogroute} from './blogroute';
import {loginroute} from './loginroute';
import {registerroute} from './registerroute';
const routes = Router();

routes.use('/', mainroute);
routes.use('/MyBlog', blogroute);
routes.use('/Login', loginroute);
routes.use('/Register', registerroute);
export {routes};
