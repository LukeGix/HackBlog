import {Router} from 'express';
import {mainroute} from './mainroute';
import {blogroute} from './blogroute';
import {loginroute} from './loginroute';
import {adminroute} from './adminroute';
import {logoutroute} from './logoutroute';
import {apiroute} from './apiroute';
const routes = Router();

routes.use('/', mainroute);
routes.use('/MyBlog', blogroute);
routes.use('/Login', loginroute);
routes.use('/admin', adminroute);
routes.use('/logout', logoutroute);
routes.use('/api', apiroute);
export {routes};
