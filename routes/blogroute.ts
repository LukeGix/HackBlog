import * as express from "express"
let blog_controller = require('../controllers/blogcontroller');

let route : any = express.Router();


route.get('/git', blog_controller.getGit);

route.get('/git/:pr/:text', blog_controller.getGitContents);

route.get('/researches', blog_controller.getArticleMain);

route.get('/researches/:id', blog_controller.getArticles);

export {route as blogroute};