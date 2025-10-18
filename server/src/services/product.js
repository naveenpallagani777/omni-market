const curdOps = require("./curdOps");
const ProductsModel = require("../models/product");

module.exports = {
    getAllProducts: async (userInfo, query) => {
        const products = await curdOps.readAll(ProductsModel, { seller: userInfo.id }, query);
        return products;
    },

    getProductsById: async (productId) => {
        const product = await curdOps.readById(ProductsModel, productId);
        return product;
    },

    createProduct: async (productData) => {
        const product = await curdOps.create(ProductsModel, productData);
        return product;
    },

    updateProduct: async (productId, updateData) => {
        const product = await curdOps.updateById(ProductsModel, productId, updateData);
        return product;
    },

    deleteProduct: async (productId) => {
        const product = await curdOps.deleteById(ProductsModel, productId);
        return product;
    },
}