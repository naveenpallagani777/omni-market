const { Schema, model } = require("mongoose");
const { Product } = require("./product");

const ratingSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

/**
 * 🔁 Middleware: Update product rating summary after save
 */
ratingSchema.post("save", async function () {
    await updateProductRating(this.product);
});

/**
 * 🔁 Middleware: Update product rating summary after update
 */
ratingSchema.post("findOneAndUpdate", async function (doc) {
    if (doc) await updateProductRating(doc.product);
});

/**
 * 🔁 Middleware: Update product rating summary after delete
 */
ratingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) await updateProductRating(doc.product);
});

/**
 * Helper function: Recalculate average rating for product
 */
async function updateProductRating(productId) {
    const ratings = await model("Rating").find({ product: productId });

    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : 0;

    await Product.findByIdAndUpdate(productId, {
        averageRating: averageRating.toFixed(1),
        totalRatings,
    });
}

module.exports = model("Rating", ratingSchema);
