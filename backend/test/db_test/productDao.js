
const Product = require('./productModel');

module.exports = {
    AddProduct: async (
        id, 
        name, 
        descLink, 
        imageLink, 
        perPrice, 
        expirationTime, 
        amount, 
        remain,
        origin, 
        owner, 
        materialDeal, 
        materialAmount
    )  => {
        try{
            var product = new Product({
                _id: id,
                name: name,
                descLink: descLink,
                imageLink: imageLink,
                perPrice: perPrice,
                expirationTime: expirationTime,
                amount: amount,
                remain: remain,
                origin: origin,
                owner: owner.toLowerCase(),
                materialDeal: materialDeal,
                materialAmount: materialAmount
            });
            await product.save();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    // delete in the frontend so no one can buy it  
    DeleteProductById: async (owner, id) => {
        try{
            await Product.deleteOne({ _id: id, owner: owner.toLowerCase() });
            return true;
        } catch(e){
            console.error(e);
            return false;
        }
    },

    GetAllProduct: async () => {
        try {
            let products = await Product.find();
            return products;
        } catch(e) {
            console.error(e);
            return [];
        }
    },
    GetAllProductCanBuy: async () => {
        try {
            let products = await Product.find({remain: {"$gt":0}});
            return products;
        } catch(e) {
            console.error(e);
            return [];
        }
    },

    // error point
    GetProductById: async (id) => {
        try {
            let product = await Product.findOne({ _id: id });
            return product;

        } catch (e) {
            console.error(e);
            return {};
        }
    },

    GetProductByOwner: async (owner) => {
        try {
            let products = await Product.find({ owner: owner.toLowerCase() });
            return products;
        } catch(e) {
            console.error(e)
            return [];
        }
    },

    UpdateProductRemain: async (id, remain) => {
        try {
            await Product.findOneAndUpdate({ _id: id }, { remain: remain });
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }

}

