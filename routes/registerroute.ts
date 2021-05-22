import * as express from "express"
let route : any = express.Router();

route.get('/', (req, res) => {
	res.render('register');
})

export {route as registerroute};