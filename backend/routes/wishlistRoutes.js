const express = require("express");
const auth = require("../middleware/auth");
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    syncWishlist
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/wishlist", auth, getWishlist);
router.post("/wishlist/sync", auth, syncWishlist);
router.put("/wishlist/:productId", auth, addToWishlist);
router.delete("/wishlist/:productId", auth, removeFromWishlist);

module.exports = router;
