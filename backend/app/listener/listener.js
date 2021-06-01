var storeInstance = require('../../contracts/storeInstance');
var productDao = require('../models/dao/productDao');
var orderDao = require('../models/dao/orderDao');
var logListener = require('../middleware/logEvent');

module.exports = {
    start: async () => {
        console.log('[Listener] listener started!');
        // listen ProductInfo event from smart contract instance
        // when add product successful.
        storeInstance.events.ProductInfo((err, events) => {
            if(err){
                console.error(err);
                return;
            }
            console.log('[Listener] receive ProductInfo event');

            // save product data to mongodb
            productDao.AddProduct(
                events.returnValues._productId,
                events.returnValues._name,
                // events.returnValues._descLink,
                events.returnValues._imageLink,
                events.returnValues._perPrice,
                events.returnValues._expirationTime,
                events.returnValues._amount,
                events.returnValues._amount, // the remain amount is equal to the amount at begining
                events.returnValues._origin,
                events.returnValues._owner,
                events.returnValues.productType,
                events.returnValues._materialDeal,
                events.returnValues._materialAmount
            ).then(() => {
                // send event to logListener to record.
                logListener.emit(
                    'AddProductResult',
                    {
                        success: true, 
                        ProductInfo: {
                            id: events.returnValues._productId,
                            name: events.returnValues._name,
                            // descLink: events.returnValues._descLink,
                            imageLink: events.returnValues._imageLink,
                            perPrice: events.returnValues._perPrice,
                            expirationTime: events.returnValues._expirationTime,
                            amount: events.returnValues._amount,
                            remain: events.returnValues._amount,
                            origin: events.returnValues._origin,
                            owner: events.returnValues._owner,
                            productType: events.returnValues._productType,
                            materialDeal: events.returnValues._materialDeal,
                            materialAmount: events.returnValues._materialAmount
                        }

                    }
                );
            });
        });

        // listen AddProductFail event from smart contract instance
        // when add product fail.
        storeInstance.events.AddProductFail((err, events) => {
            if(err){
                console.error(err);
                return;
            }
            console.log("[Listener] receive AddProductFail event");
            // send event to logListener to record
            logListener.emit(
                'AddProductResult',
                {
                    success: false
                });
        });

        // listen DealInfo event from smart contract instance
        // when launch deal successfully.
        storeInstance.events.DealInfo((err, events) => {
            if(err){
                console.error(err);
                return;
            }
            
            console.log("[Listener] receive DealInfo event");
            // add deal data to database
            orderDao.AddOrder(
                events.returnValues._dealAddress,
                events.returnValues._productId,
                events.returnValues._seller,
                events.returnValues._buyer,
                events.returnValues._price,
                events.returnValues._amount,
                events.returnValues._fromWhere,
                events.returnValues._toWhere,
                events.returnValues._dealLaunchTime,
                events.returnValues._dealPayTime,
                events.returnValues._dealFinishedTime,
                events.returnValues._state
            ).then(()=>{
                console.log('[Listener] orderinfo has been add to database');
                // send event to logListener to record
                logListener.emit(
                    'LaunchDealResult',
                    {
                        success: true,
                        DealInfo: {
                            dealAddress: events.returnValues._dealAddress.toLowerCase(),
                            productId: events.returnValues._productId,
                            seller: events.returnValues._seller,
                            buyer: events.returnValues._buyer,
                            price: events.returnValues._price,
                            amount: events.returnValues._amount,
                            fromWhere: events.returnValues._fromWhere,
                            toWhere: events.returnValues._toWhere,
                            dealLaunchTime: events.returnValues._dealLaunchTime,
                            dealPayTime: events.returnValues._dealPayTime,
                            dealFinishedTime: events.returnValues._dealFinishedTime,
                            state: events.returnValues._state
                        }
                    }
                );
            });

            // update the remain of the product in database
            // productDao.GetProductById(events.returnValues._productId).then((product) => {
                
                // productDao.UpdateProductRemain(
                    // events.returnValues._productId,
                    // (product.remain - events.returnValues._amount)
                // );
            // }).then(()=>{
                // console.log('[Listener] modify product remain success');
            // });

        });

        // listen LaunchDealFail event from smart contract instance
        // when launch deal fail.
        storeInstance.events.LaunchDealFail((err, events) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("[Listener] receive LaunchDealFail event");
            // send event to logListener to record
            logListener.emit(
                'LaunchDealResult',
                {
                    success: false
                }
            );
        });

        // listen PayDealResult event from smart contract instance
        // when pay deal finished , wether success or not.
        storeInstance.events.PayDealResult((err, events) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("[Listener] receive PayDealResult event");
            // send different args to logListener based on the result.
            if( events.returnValues.result ){
                orderDao.PayOrder(events.returnValues._dealAddress).then(()=>{
                    console.log('[Listener] payment has been record to database');
                }).then(() => {
                    logListener.emit(
                        'PayDealResult',
                        {
                            success: true,
                            dealAddress: events.returnValues._dealAddress
                        }
                    );
                });
            } else {
                logListener.emit(
                    'PayDealResult',
                    {
                        success: false,
                        dealAddress: events.returnValues._dealAddress
                    }
                );
            }

        });

        // listen FinishDealResult event from smart contract instance
        // when deal finished , wether success or not.
        storeInstance.events.FinishDealResult((err, events) => {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log("[Listener] receive FinishDealResult event");
            // console.log(events.returnValues);
            // send different args to logListener based on the result.
            if( events.returnValues.result ){
                orderDao.FinishOrder(events.returnValues._dealAddress).then(()=>{
                    console.log('[Listener] finishment has been record to database');
                }).then(() => {
                    logListener.emit(
                        'FinishDealResult',
                        {
                            success: true,
                            dealAddress: events.returnValues._dealAddress
                        }
                    );
                });
            } else {
                logListener.emit(
                    'FinishDealResult',
                    {
                        success: false,
                        dealAddress: events.returnValues._dealAddress
                    }
                );

            }
            //
            // update the remain of the product in database
       
            var info = {id:0, remain: 0, amount: 0};
            orderDao.GetOrderByAddress(events.returnValues._dealAddress).then((finishedOrder) => {
                info.id = finishedOrder.productId;
                info.amount = finishedOrder.amount;
                return finishedOrder.productId;
            }).then(productDao.GetProductById).then((product) => {
                info.remain = product.remain;
            }).then(() => {
                console.log(info.remain);
                console.log(info.amount);
                productDao.UpdateProductRemain(
                    info.id,
                    (info.remain - info.amount)
                );
            }).then(() => {
                console.log('[Listener] modify product remain success');
            })



        });

        // listen AbortDealResult event from smart contract instance
        // when deal was aborted , wether success or not.
        storeInstance.events.AbortDealResult((err, events) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("[Listener] receive AbortDealResult event");
            // send different args to logListener based on the result.
            if( events.returnValues.result ){
                // modify database
                orderDao.AbortOrder(events.returnValues._dealAddress).then(()=>{
                    console.log('[Listener] the deal has been abort in database');
                }).then(()=>{
                    logListener.emit(
                        'AbortDealResult',
                        {
                            success: true,
                            dealAddress: events.returnValues._dealAddress
                        }
                    );
                });

                //
                // restore the remain number of the product in database
                // orderDao.GetOrderByAddress(events.returnValues._dealAddress).then((order)=>{
                    // let product = productDao.GetProductById(order.productId);
                    // return { product: product, order: order};
                // }).then((result) => {
                    // productDao.UpdateProductRemain(
                        // result.product.productId,
                        // (result.product.remain + result.order.amount)
                    // );
                // }).then(()=> {
                    // console.log('[Listener] the remain of the product has been recovered as before');
                // });
            } else {
                logListener.emit(
                    'AbortDealResult',
                    {
                        success: false,
                        dealAddress: events.returnValues._dealAddress
                    }
                );
            }

        });
    }

}


