const curdOps = require("./curdOps");
const {Product, Rating} = require("../models");

module.exports = {
    getAllProducts: async (userInfo, query) => {
        const products = await curdOps.readAll(Product, { seller: userInfo.id }, query);
        return products;
    },

    getProductsById: async (productId) => {
        const product = await curdOps.readById(Product, productId);
        const ratings = await curdOps.readAll(Rating, { product: productId });
        return { ...product.toObject(), ratings  };
    },

    createProduct: async (productData) => {
        const product = await curdOps.create(Product, productData);
        return product;
    },

    updateProduct: async (productId, updateData) => {
        const product = await curdOps.updateById(Product, productId, updateData);
        return product;
    },

    deleteProduct: async (productId) => {
        const product = await curdOps.deleteById(Product, productId);
        await curdOps.deleteMany(Rating, { product: productId });
        return product;
    },
}