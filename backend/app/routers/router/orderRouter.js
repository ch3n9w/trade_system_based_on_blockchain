const Router = require('koa-router');
const orderController = require('../../controllers/orderController');

let orderRouter = new Router();

orderRouter
    .get('/user/mybuy', orderController.GetAllBuyerOrders)
    .get('/user/mysell', orderController.GetAllSellerOrders)
    .get('/orders', orderController.GetAllOrders)
    .post('/searchOrder', orderController.GetOrderByAddress);

module.exports = orderRouter;
