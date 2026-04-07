const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    },
    {
        _id: false
    }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ["Vans", "Converse"]
        },
        brand: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        colors: {
            type: [String],
            default: []
        },
        sizes: {
            type: [sizeSchema],
            default: []
        },
        rating: {
            type: Number,
            default: 0
        },
        reviews: {
            type: Number,
            default: 0
        },
        featured: {
            type: Boolean,
            default: true
        },
        isNewArrival: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);
