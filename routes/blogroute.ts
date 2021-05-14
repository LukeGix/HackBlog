import * as express from "express"

let route : any = express.Router();


route.get('/', (req : any, res: any) => {
	res.write("Blog!");
	res.end();
})


route.get('/all', (req : any, res: any) => {
	res.write("All!");
	res.end();
})


route.get('/git', (req : any, res: any) => {
	res.write("Git!");
	res.end();
})
export {route as blogroute};