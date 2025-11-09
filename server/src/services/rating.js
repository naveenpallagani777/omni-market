const { Rating } = require('../models');
const curdOps = require("./curdOps");
module.exports = {
    createRating : async (ratingData) => {
        const rating = curdOps.create(Rating, ratingData);
        return rating;
    },

    getRatingsByProductId : async (productId, query) => {
        const ratings = curdOps.readAll(Rating, { product: productId }, query);
        return ratings;
    },

    updateRating : async (ratingId, updateData) => {
        const rating = curdOps.updateById(Rating, ratingId, updateData);
        return rating;
    },
    
    deleteRating : async (ratingId) => {
        const rating = curdOps.deleteById(Rating, ratingId);
        return rating;
    },
}