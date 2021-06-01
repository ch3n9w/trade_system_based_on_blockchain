// the order can only be changed by the interaction of frontend and smart contract
// so there will only api for inquirment
//
const orderDao = require('../models/dao/orderDao');
const jwt = require('jsonwebtoken');
const {adminAddress, jwt_secret} = require('../../config');



module.exports = {
    GetAllBuyerOrders: async ctx => {
        try {
        var buyer = jwt.verify(ctx.session.jwt, 'ch4sersjwtsecret');
        var address = buyer.address;

        var orders = await orderDao.GetOrderByBuyer(address);
        ctx.body = {
            code: '001',
            orders: orders
        };

        } catch (e) {
            console.log(e);
        }
    },

    GetAllSellerOrders:  async ctx => {
        try {
        var seller = jwt.verify(ctx.session.jwt, 'ch4sersjwtsecret');
        var address = seller.address;
        var orders = await orderDao.GetOrderBySeller(address);
        ctx.body = {
            code: '002',
            orders: orders
        }

        } catch (e) {
            console.log(e);
        }
    },

    GetOrderByAddress: async ctx => {
        try {
            let { address } = ctx.request.body;
            var order = await orderDao.GetOrderByAddress(address);
            ctx.body = {
                code: '003',
                order: order
            };
            console.log(ctx.status);
        } catch (e) {
            console.log(e);
        }
    },

    GetAllOrders: async ctx => {
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
            console.log("Fetching orders...");
            // read logfile content and return it
            
            let orders = await orderDao.GetAllOrder();
            
            ctx.body = {
                code: '009',
                result: 1,
                msg: orders
            };
        
        } else {
            // if the user's address is not in admin's address array
            ctx.body = {
                code: '009',
                result: 0,
                msg: 'The account is not admin account'
            };
            
        }
    }
}
