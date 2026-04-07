const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

const addressSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        line1: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: {
            type: [orderItemSchema],
            default: []
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },
        shippingAddress: {
            type: addressSchema,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["cash_on_delivery", "card", "bank_transfer"]
        },
        status: {
            type: String,
            default: "placed",
            enum: ["placed", "paid", "packed", "shipped", "completed", "cancelled"]
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: false
    }
);

module.exports = mongoose.model("Order", orderSchema);
