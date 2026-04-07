const mongoose = require("mongoose");
const Product = require("../models/Product");
const { serializeProduct } = require("../utils/serializers");

function buildSort(sortBy) {
    if (sortBy === "price-asc") {
        return { price: 1 };
    }

    if (sortBy === "price-desc") {
        return { price: -1 };
    }

    if (sortBy === "rating-desc") {
        return { rating: -1, reviews: -1 };
    }

    if (sortBy === "newest") {
        return { createdAt: -1 };
    }

    return { category: 1, name: 1 };
}

function normalizeSizes(sizes = []) {
    return sizes
        .filter((size) => size && size.label)
        .map((size) => ({
            label: String(size.label).trim().toUpperCase(),
            stock: Math.max(0, Number(size.stock) || 0)
        }))
        .filter((size) => size.label);
}

function validateProductPayload(payload) {
    const requiredFields = ["name", "price", "image", "category", "brand", "description"];
    const missingField = requiredFields.find((field) => !payload[field]);

    if (missingField) {
        return `${missingField} is required.`;
    }

    if (!["Vans", "Converse"].includes(payload.category)) {
        return "Category must be Vans or Converse.";
    }

    const sizes = normalizeSizes(payload.sizes);

    if (!sizes.length) {
        return "At least one size entry is required.";
    }

    if (Number(payload.price) <= 0) {
        return "Price must be greater than 0.";
    }

    return null;
}

exports.getProducts = async (req, res) => {
    try {
        const {
            category,
            q,
            sort = "default",
            minPrice,
            maxPrice,
            rating
        } = req.query;

        const query = {};

        if (category && category !== "All") {
            query.category = category;
        }

        if (q) {
            query.$or = [
                { name: { $regex: q, $options: "i" } },
                { brand: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ];
        }

        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }

        if (rating) {
            query.rating = { $gte: Number(rating) };
        }

        const products = await Product.find(query).sort(buildSort(sort));
        res.json({ products: products.map(serializeProduct) });
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch products." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid product id." });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.json({ product: serializeProduct(product) });
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch this product." });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const errorMessage = validateProductPayload(req.body);

        if (errorMessage) {
            return res.status(400).json({ message: errorMessage });
        }

        const product = await Product.create({
            name: req.body.name.trim(),
            price: Number(req.body.price),
            image: req.body.image.trim(),
            category: req.body.category,
            brand: req.body.brand.trim(),
            description: req.body.description.trim(),
            colors: Array.isArray(req.body.colors) ? req.body.colors : [],
            sizes: normalizeSizes(req.body.sizes),
            rating: Number(req.body.rating) || 0,
            reviews: Number(req.body.reviews) || 0,
            featured: Boolean(req.body.featured),
            isNewArrival: Boolean(req.body.isNewArrival)
        });

        res.status(201).json({
            message: "Product created successfully.",
            product: serializeProduct(product)
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to create product." });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid product id." });
        }

        const errorMessage = validateProductPayload(req.body);

        if (errorMessage) {
            return res.status(400).json({ message: errorMessage });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name.trim(),
                price: Number(req.body.price),
                image: req.body.image.trim(),
                category: req.body.category,
                brand: req.body.brand.trim(),
                description: req.body.description.trim(),
                colors: Array.isArray(req.body.colors) ? req.body.colors : [],
                sizes: normalizeSizes(req.body.sizes),
                rating: Number(req.body.rating) || 0,
                reviews: Number(req.body.reviews) || 0,
                featured: Boolean(req.body.featured),
                isNewArrival: Boolean(req.body.isNewArrival)
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.json({
            message: "Product updated successfully.",
            product: serializeProduct(product)
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to update product." });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid product id." });
        }

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete product." });
    }
};
