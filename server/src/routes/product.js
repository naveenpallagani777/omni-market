const router = require("express").Router();
const productController = require("../controllers/product");
const authenticate = require("../middleware/authMiddleware");

router.use(authenticate('seller'));

router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteProductById);

module.exports = router;