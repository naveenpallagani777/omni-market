const router = require("express").Router();
const ratingController = require("../controllers/rating");
const auth = require("../middlewares/auth");

router.use(auth('buyer'));

router.post("/", ratingController.createRating);
router.get("/", ratingController.getRatingsByProductId);
router.put("/:id", ratingController.updateRatingById);
router.delete("/:id", ratingController.deleteRatingById);

module.exports = router;