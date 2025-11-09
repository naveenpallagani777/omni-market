const UsersModel = require("../models/user");
const ProductsModel = require("../models/product");
const RatingsModel = require("../models/rating");

module.exports = {
    User: UsersModel,
    Product: ProductsModel,
    Rating: RatingsModel,
};