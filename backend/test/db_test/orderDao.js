const Order = require('./orderModel');
const Counter = require('./counterDao');


module.exports = {
    AddOrder: async (
        dealAddress,
        productId,
        seller,
        buyer,
        price,
        amount,
        fromWhere,
        toWhere,
        dealLaunchTime,
        dealPayTime,
        dealFinishedTime,
        state
    ) => {
        try {
            var order = new Order({
                _id: await Counter.GetNextSequenceValue('order_id'),
                dealAddress: dealAddress.toLowerCase(),
                productId: productId,
                seller: seller.toLowerCase(),
                buyer: buyer.toLowerCase(),
                price: price,
                amount: amount,
                fromWhere: fromWhere,
                toWhere: toWhere,
                dealLaunchTime: dealLaunchTime,
                dealPayTime: dealPayTime,
                dealFinishedTime: dealFinishedTime,
                state: state
            });
            await order.save();

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    PayOrder: async (dealAddress) => {
        try {
            await Order.findOneAndUpdate({dealAddress: dealAddress.toLowerCase()}, { state: 1 });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    FinishOrder: async (dealAddress) => {
        try {
            await Order.findOneAndUpdate({dealAddress: dealAddress.toLowerCase()}, { state: 2 });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    AbortOrder: async (dealAddress) => {
        try {
            await Order.findOneAndUpdate({dealAddress: dealAddress.toLowerCase()}, { state: 3 });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    GetOrderByBuyer: async (address) => {
        try {
            let orders = await Order.find({buyer: address.toLowerCase()});
            return orders;
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    GetOrderBySeller: async (address) => {
        try {
            let orders = await Order.find({seller: address.toLowerCase()});
            return orders;
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    GetOrderByAddress: async (address) => {
        try {
            let order = await Order.findOne({dealAddress: address.toLowerCase()});
            return order;
        } catch (e) {
            console.error(e);
            return {};
        }
    }

}
