const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const { serializeOrder } = require("../utils/serializers");

const ADDRESS_FIELDS = ["fullName", "phone", "line1", "city", "country", "postalCode"];

function normalizeSizeLabel(size) {
    return String(size || "").trim().toUpperCase();
}

function validateShippingAddress(address) {
    const invalidField = ADDRESS_FIELDS.find((field) => !address || !String(address[field] || "").trim());
    return invalidField ? `${invalidField} is required.` : "";
}

function getSizeEntry(product, sizeLabel) {
    return (product.sizes || []).find(
        (size) => normalizeSizeLabel(size.label) === normalizeSizeLabel(sizeLabel)
    );
}

exports.createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        const addressError = validateShippingAddress(shippingAddress);

        if (addressError) {
            return res.status(400).json({ message: addressError });
        }

        if (!["cash_on_delivery", "card", "bank_transfer"].includes(paymentMethod)) {
            return res.status(400).json({ message: "Please select a valid payment method." });
        }

        const cartItems = await CartItem.find({ userId: req.user._id }).populate("productId");

        if (!cartItems.length) {
            return res.status(400).json({ message: "Your cart is empty." });
        }

        const validCartItems = cartItems.filter((item) => item.productId);

        if (!validCartItems.length) {
            return res.status(400).json({ message: "Your cart does not contain valid items." });
        }

        for (const item of validCartItems) {
            const sizeEntry = getSizeEntry(item.productId, item.size);

            if (!sizeEntry) {
                return res.status(400).json({
                    message: `Size ${item.size} is no longer available for ${item.productId.name}.`
                });
            }

            if (sizeEntry.stock < item.quantity) {
                return res.status(400).json({
                    message: `Only ${sizeEntry.stock} pair(s) left for ${item.productId.name} size ${item.size}.`
                });
            }
        }

        const orderItems = validCartItems.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            category: item.productId.category,
            size: item.size,
            quantity: item.quantity
        }));

        for (const item of validCartItems) {
            const sizeEntry = getSizeEntry(item.productId, item.size);
            sizeEntry.stock -= item.quantity;
            item.productId.markModified("sizes");
            await item.productId.save();
        }

        const totalPrice = orderItems.reduce(
            (total, item) => total + Number(item.price) * item.quantity,
            0
        );

        const order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            totalPrice,
            shippingAddress: {
                fullName: shippingAddress.fullName.trim(),
                phone: shippingAddress.phone.trim(),
                line1: shippingAddress.line1.trim(),
                city: shippingAddress.city.trim(),
                country: shippingAddress.country.trim(),
                postalCode: shippingAddress.postalCode.trim()
            },
            paymentMethod,
            status: paymentMethod === "cash_on_delivery" ? "placed" : "paid"
        });

        await CartItem.deleteMany({ userId: req.user._id });

        res.status(201).json({
            message: "Order created successfully.",
            order: serializeOrder(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to create order." });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const query =
            req.user.role === "admin" && req.query.scope === "all"
                ? {}
                : { userId: req.user._id };

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.json({ orders: orders.map(serializeOrder) });
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch orders." });
    }
};
