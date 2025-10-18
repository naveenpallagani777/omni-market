const { catchAsync } = require("../services/utils");
const curdOps = require("../services/curdOps");
const { Product } = require("../models");
const productService = require("../services/product");

module.exports = {
    createProduct: catchAsync(async (req, res) => {
        const product = await productService.createProduct({...req.body, seller: req.user.id });
        res.status(201).json({ 
            success: true,
            data: product,
            message: "Product created successfully" 
        });
    }),

    getAllProducts: catchAsync(async (req, res) => {
        const products = await productService.getAllProducts(req.user, req.query);
        res.json({
            success: true,
            results: products.length,
            data: products,
            message: "Products fetched successfully"
        });
    }),

    getProductById: catchAsync(async (req, res) => {
        const product = await productService.getProductsById(req.params.id);
        res.json({ 
            success: true,
            data: product,
            message: "Product fetched successfully" 
        });
    }),

    updateProductById: catchAsync(async (req, res) => {
        const product = await productService.updateProduct(req.params.id, req.body, { new: true });
        res.json({ 
            success: true,
            data: product,
            message: "Product updated successfully" 
        });
    }),

    deleteProductById: catchAsync(async (req, res) => {
        const product = await productService.deleteProduct(req.params.id);
        res.json({
            success: true,
            data: product,
            message: "Product deleted successfully"
        });
    }),
}