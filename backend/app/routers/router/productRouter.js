const Router = require('koa-router');
const productController = require('../../controllers/productController')

let productRouter = new Router();

productRouter
    .get('/', productController.GetAllProductCanBuy)
    // .post('/user/addProduct', productController.AddProduct)
    .get('/user/getProducts', productController.GetProductBySeller)
    .get('/products', productController.GetAllProduct)
    .post('/getDetail', productController.GetDetail);
    

module.exports = productRouter;
