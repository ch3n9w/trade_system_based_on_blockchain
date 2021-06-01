
const productDao = require('../models/dao/productDao');
const jwt = require('jsonwebtoken');
const {adminAddress, jwt_secret} = require('../../config'); 

module.exports = {

    GetAllProduct: async ctx => {
        // the session's address should be authenticated
        if (!ctx.session.authenticated){
            ctx.body = {
                code: '009',
                result: 0,
                msg: 'Please login first'
            };
            return;
        }

    
        var token = jwt.verify(ctx.session.jwt, jwt_secret);
        var userAddress = token.address;

        var compareAdminAddress = adminAddress.map(function(address){
            return address.toLowerCase();
        });
        
        // the user's address should be in admin's Address array
        if (compareAdminAddress.includes(userAddress)) {
            console.log("Fetching products...");
            
            const products = await productDao.GetAllProduct();
            // 获取所有的商品数量,用于前端分页计算
            const total =  products.length;
            ctx.body = {
                code: '002',
                products,
                total
            };

        
        } else {
             // if the user's address is not in admin's address array
             ctx.body = {
                code: '009',
                products: [],
                total: 0
            };
            
        }
    },

    GetAllProductCanBuy: async ctx => {
        try {
            const products = await productDao.GetAllProductCanBuy();
            const total = products.length;
            ctx.body = {
                code: '003',
                products,
                total
            };
        } catch (e) {
            console.log(e);
        }
    },

    GetDetail: async ctx => {
        try {
            let { productID } = ctx.request.body;
            const product = await productDao.GetProductById(productID);
            ctx.body = {
                code: '004',
                product
            }

        } catch (e) {
            console.log(e);
        }
    },

    GetProductBySeller: async ctx => {
        try {
            var seller = jwt.verify(ctx.session.jwt, 'ch4sersjwtsecret');
            var address = seller.address.toLowerCase();
            // console.log(address);
            const products = await productDao.GetProductByOwner(address);
            // console.log(products);

            ctx.body = {
                code: '005',
                products
            };

        } catch (e) {
            console.log(e);
        }
    }


}
