const express = require("express");
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", auth, admin, createProduct);
router.put("/products/:id", auth, admin, updateProduct);
router.delete("/products/:id", auth, admin, deleteProduct);

module.exports = router;
