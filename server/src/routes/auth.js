const router = require("express").Router();
const { signup, login, profile, changePassword } = require("../controllers/auth")
const { authenticate } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.use(authenticate);
router.get("/profile", profile);
router.post("/change-password", changePassword);

module.exports = router;