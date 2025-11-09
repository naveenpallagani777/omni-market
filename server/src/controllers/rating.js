const { catchAsync } = require("../services/utils");
const ratingService = require("../services/rating");

module.exports = {
    createRating: catchAsync(async (req, res) => {
        const rating = await ratingService.createRating({ ...req.body, user: req.user.id });
        res.status(201).json({
            success: true,
            data: rating,
            message: "Rating created successfully"
        });
    }),

    getRatingsByProductId: catchAsync(async (req, res) => {
        const ratings = await ratingService.getRatingsByProductId(req.params.productId, req.query);
        res.json({
            success: true,
            results: ratings.length,
            data: ratings,
            message: "Ratings fetched successfully"
        });
    }),

    updateRatingById: catchAsync(async (req, res) => {
        const rating = await ratingService.updateRating(req.params.id, req.body);
        res.json({
            success: true,
            data: rating,
            message: "Rating updated successfully"
        });
    }),
    
    deleteRatingById: catchAsync(async (req, res) => {
        const rating = await ratingService.deleteRating(req.params.id);
        res.json({
            success: true,
            data: rating,
            message: "Rating deleted successfully"
        });
    }),
}