const mongoose = require("mongoose");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const { serializeProduct } = require("../utils/serializers");

function normalizeSizeLabel(size) {
    return String(size || "").trim().toUpperCase();
}

function getSizeStock(product, sizeLabel) {
    const normalizedSize = normalizeSizeLabel(sizeLabel);
    const sizeEntry = (product.sizes || []).find(
        (size) => normalizeSizeLabel(size.label) === normalizedSize
    );

    return sizeEntry || null;
}

function serializeCartItem(item) {
    const product = item.productId;
    const sizeEntry = product ? getSizeStock(product, item.size) : null;

    return {
        id: item._id.toString(),
        size: item.size,
        quantity: item.quantity,
        availableStock: sizeEntry ? sizeEntry.stock : 0,
        product: serializeProduct(product)
    };
}

async function buildCartResponse(userId) {
    const items = await CartItem.find({ userId }).populate("productId");
    const serializedItems = items
        .filter((item) => item.productId)
        .map(serializeCartItem);

    const itemCount = serializedItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = serializedItems.reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0
    );

    return {
        items: serializedItems,
        itemCount,
        totalPrice
    };
}

exports.getCart = async (req, res) => {
    try {
        const cart = await buildCartResponse(req.user._id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch cart." });
    }
};

exports.upsertCartItem = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product id." });
        }

        const normalizedQuantity = Number(quantity);
        const normalizedSize = normalizeSizeLabel(size);

        if (!normalizedSize) {
            return res.status(400).json({ message: "Please choose a shoe size." });
        }

        if (!Number.isInteger(normalizedQuantity) || normalizedQuantity < 1) {
            return res.status(400).json({ message: "Quantity must be a positive integer." });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        const sizeEntry = getSizeStock(product, normalizedSize);

        if (!sizeEntry) {
            return res.status(400).json({ message: "Selected size is not available." });
        }

        if (normalizedQuantity > sizeEntry.stock) {
            return res.status(400).json({
                message: `Only ${sizeEntry.stock} pair(s) left for size ${normalizedSize}.`
            });
        }

        const existingItem = await CartItem.findOne({
            userId: req.user._id,
            productId,
            size: normalizedSize
        });

        if (existingItem) {
            existingItem.quantity = normalizedQuantity;
            await existingItem.save();
        } else {
            await CartItem.create({
                userId: req.user._id,
                productId,
                size: normalizedSize,
                quantity: normalizedQuantity
            });
        }

        const cart = await buildCartResponse(req.user._id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Unable to update cart." });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid cart item id." });
        }

        const deletedItem = await CartItem.findOneAndDelete({
            userId: req.user._id,
            _id: id
        });

        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found." });
        }

        const cart = await buildCartResponse(req.user._id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Unable to remove cart item." });
    }
};
