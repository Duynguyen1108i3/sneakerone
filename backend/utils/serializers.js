function serializeProduct(product) {
    return {
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        description: product.description,
        colors: product.colors,
        sizes: product.sizes,
        rating: product.rating,
        reviews: product.reviews,
        featured: product.featured,
        isNewArrival: product.isNewArrival,
        createdAt: product.createdAt
    };
}

function serializeUser(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        wishlist: user.wishlist ? user.wishlist.map((item) => item.toString()) : []
    };
}

function serializeOrder(order) {
    return {
        id: order._id.toString(),
        items: order.items.map((item) => ({
            productId: item.productId.toString(),
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            size: item.size,
            quantity: item.quantity
        })),
        totalPrice: order.totalPrice,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        status: order.status,
        createdAt: order.createdAt
    };
}

module.exports = {
    serializeProduct,
    serializeUser,
    serializeOrder
};
