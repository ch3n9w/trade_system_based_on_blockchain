const orderDao = require('./orderDao');
const productDao = require('./productDao');

productDao.GetAllProductCanBuy().then((products) => {
    console.log(products);
})
