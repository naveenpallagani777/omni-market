const router = require("express").Router();

const auth = require("./auth");

router.get("/", (req, res) => {
    res.send("Welcome to Omni Market API");
});
router.use("/auth", auth);

module.exports = router;