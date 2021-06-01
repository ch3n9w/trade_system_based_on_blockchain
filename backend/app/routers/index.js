const Router = require('koa-router');

let Routers = new Router();

const orderRouter = require('./router/orderRouter');
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter');
const resourceRouter = require('./router/resourceRouter');
const logRouter = require('./router/logRouter');

Routers.use(orderRouter.routes());
Routers.use(productRouter.routes());
Routers.use(userRouter.routes());
Routers.use(resourceRouter.routes());
Routers.use(logRouter.routes());

module.exports = Routers;
