const express = require("express");
const auth = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/order", auth, createOrder);
router.get("/orders", auth, getOrders);

module.exports = router;
