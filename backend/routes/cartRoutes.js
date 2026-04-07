const express = require("express");
const auth = require("../middleware/auth");
const { getCart, upsertCartItem, removeCartItem } = require("../controllers/cartController");

const router = express.Router();

router.get("/cart", auth, getCart);
router.post("/cart", auth, upsertCartItem);
router.delete("/cart/:id", auth, removeCartItem);

module.exports = router;
