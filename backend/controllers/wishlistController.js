const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const { serializeProduct, serializeUser } = require("../utils/serializers");

async function loadWishlist(userId) {
    const user = await User.findById(userId).populate("wishlist");

    return {
        user: serializeUser(user),
        wishlist: (user.wishlist || []).filter(Boolean).map(serializeProduct)
    };
}

async function ensureProduct(productId) {
    if (!mongoose.isValidObjectId(productId)) {
        return null;
    }

    return Product.findById(productId);
}

exports.getWishlist = async (req, res) => {
    try {
        const payload = await loadWishlist(req.user._id);
        res.json(payload);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch wishlist." });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const product = await ensureProduct(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        const user = await User.findById(req.user._id);
        const exists = user.wishlist.some((item) => item.toString() === product._id.toString());

        if (!exists) {
            user.wishlist.push(product._id);
            await user.save();
        }

        const payload = await loadWishlist(req.user._id);
        res.json(payload);
    } catch (error) {
        res.status(500).json({ message: "Unable to update wishlist." });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.productId)) {
            return res.status(400).json({ message: "Invalid product id." });
        }

        const user = await User.findById(req.user._id);
        user.wishlist = user.wishlist.filter(
            (item) => item.toString() !== req.params.productId
        );
        await user.save();

        const payload = await loadWishlist(req.user._id);
        res.json(payload);
    } catch (error) {
        res.status(500).json({ message: "Unable to update wishlist." });
    }
};

exports.syncWishlist = async (req, res) => {
    try {
        const incomingIds = Array.isArray(req.body.productIds) ? req.body.productIds : [];
        const validIds = incomingIds.filter((productId) => mongoose.isValidObjectId(productId));
        const products = await Product.find({ _id: { $in: validIds } }).select("_id");
        const validSet = new Set(products.map((product) => product._id.toString()));

        const user = await User.findById(req.user._id);
        const merged = new Set(user.wishlist.map((item) => item.toString()));

        validSet.forEach((id) => merged.add(id));
        user.wishlist = Array.from(merged);
        await user.save();

        const payload = await loadWishlist(req.user._id);
        res.json(payload);
    } catch (error) {
        res.status(500).json({ message: "Unable to sync wishlist." });
    }
};
