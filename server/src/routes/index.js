const router = require("express").Router();

const auth = require("./auth");
const product = require("./product");

router.get("/", (req, res) => {
    res.send("Welcome to Omni Market API");
});
router.use("/auth", auth);
router.use("/products", product);
module.exports = router;