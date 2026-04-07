const STORAGE_KEYS = {
    cart: "websneaker-cart",
    wishlist: "websneaker-wishlist"
};

const categories = ["Vans", "Converse"];

const products = [
    {
        id: 1,
        name: "Vans - Old Skool 36 DX",
        price: 100,
        image: "images/sneaker/download-removebg-preview.png",
        category: "Vans",
        colors: ["Black", "White"],
        rating: 4.9,
        reviews: 205
    },
    {
        id: 2,
        name: "Vans - Old Skool Checkerboard",
        price: 100,
        image: "images/sneaker/vanscaro.png",
        category: "Vans",
        colors: ["Black", "White"],
        rating: 4.9,
        reviews: 205
    },
    {
        id: 3,
        name: "Vans - Classic SK8-Hi",
        price: 100,
        image: "images/sneaker/vanshigh.png",
        category: "Vans",
        colors: ["Black", "White"],
        rating: 4.9,
        reviews: 205,
        imageClass: "product-img--high"
    },
    {
        id: 4,
        name: "Converse Chuck Taylor All Star Low Top",
        price: 100,
        image: "images/sneaker/convlow.png",
        category: "Converse",
        colors: ["Black", "White"],
        rating: 4.9,
        reviews: 205
    },
    {
        id: 5,
        name: "Converse Chuck Taylor All Star High Top",
        price: 100,
        image: "images/sneaker/convhigh.png",
        category: "Converse",
        colors: ["Black", "White"],
        rating: 4.9,
        reviews: 205,
        imageClass: "product-img--high"
    },
    {
        id: 6,
        name: "Converse x Naruto Chuck Taylor All Star",
        price: 100,
        image: "images/sneaker/convcollab.png",
        category: "Converse",
        colors: ["Orange", "Black"],
        rating: 4.9,
        reviews: 205
    }
];

const state = {
    filter: "All",
    cart: loadState(STORAGE_KEYS.cart, []),
    wishlist: loadState(STORAGE_KEYS.wishlist, [])
};

const elements = {
    filterButtons: Array.from(document.querySelectorAll("[data-filter]")),
    productGrids: {
        Vans: document.getElementById("vans-products"),
        Converse: document.getElementById("converse-products")
    },
    brandGroups: Array.from(document.querySelectorAll("[data-category-group]")),
    cartToggle: document.querySelector(".cart-toggle"),
    cartOverlay: document.querySelector("[data-cart-overlay]"),
    cartDrawer: document.getElementById("cart-drawer"),
    cartItems: document.querySelector("[data-cart-items]"),
    cartCount: Array.from(document.querySelectorAll("[data-cart-count]")),
    cartItemsTotal: document.querySelector("[data-cart-items-total]"),
    cartTotal: document.querySelector("[data-cart-total]"),
    toast: document.querySelector("[data-toast]"),
    contactForm: document.getElementById("contact-form"),
    checkoutButton: document.querySelector(".cart-checkout")
};

let toastTimer;

function loadState(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        return fallback;
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(state.wishlist));
}

function formatPrice(value) {
    return `$${value.toFixed(0)} USD`;
}

function getProductById(productId) {
    return products.find((product) => product.id === Number(productId));
}

function getItemCount() {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = getProductById(item.productId);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

function isWishlisted(productId) {
    return state.wishlist.includes(productId);
}

function showToast(message) {
    if (!elements.toast) {
        return;
    }

    elements.toast.textContent = message;
    elements.toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        elements.toast.classList.remove("show");
    }, 2200);
}

function createProductMarkup(product) {
    const wishlisted = isWishlisted(product.id);
    const imageClass = product.imageClass ? ` ${product.imageClass}` : "";

    return `
        <article class="product-card" data-product-id="${product.id}">
            <div class="card-top">
                <div>
                    <div class="card-title">${product.name}</div>
                    <div class="card-colors">${String(product.colors.length).padStart(2, "0")} COLORS</div>
                </div>
                <button class="wishlist-icon ${wishlisted ? "active" : ""}" type="button" data-action="toggle-wishlist" data-product-id="${product.id}" aria-label="${wishlisted ? "Remove from wishlist" : "Add to wishlist"}">
                    <i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
                </button>
            </div>
            <img class="product-img${imageClass}" src="${product.image}" alt="${product.name}">
            <div class="card-bottom">
                <div class="price-rating">${formatPrice(product.price)} <span>&#9733; ${product.rating.toFixed(1)}(${product.reviews})</span></div>
                <button class="btn-add" type="button" data-action="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </article>
    `;
}

function renderProducts() {
    categories.forEach((category) => {
        const group = document.querySelector(`[data-category-group="${category}"]`);
        const grid = elements.productGrids[category];
        const isVisible = state.filter === "All" || state.filter === category;
        const filteredProducts = products.filter((product) => product.category === category);

        if (group) {
            group.classList.toggle("is-hidden", !isVisible);
        }

        if (grid) {
            grid.innerHTML = filteredProducts.map(createProductMarkup).join("");
        }
    });

    elements.filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === state.filter);
    });
}

function createCartMarkup() {
    if (!state.cart.length) {
        return `
            <div class="cart-empty">
                <h4>Your cart is empty</h4>
                <p>Add a few sneakers to see quantity controls, totals, and persistent cart data here.</p>
            </div>
        `;
    }

    return state.cart
        .map((item) => {
            const product = getProductById(item.productId);

            if (!product) {
                return "";
            }

            return `
                <article class="cart-item">
                    <img class="cart-item-thumb" src="${product.image}" alt="${product.name}">
                    <div class="cart-item-body">
                        <h4>${product.name}</h4>
                        <p class="cart-item-meta">${product.category} / ${product.colors.length} colors</p>
                        <div class="cart-item-controls">
                            <div class="qty-control">
                                <button class="qty-btn" type="button" data-action="decrease-qty" data-product-id="${product.id}" aria-label="Decrease quantity">-</button>
                                <span class="qty-value">${item.quantity}</span>
                                <button class="qty-btn" type="button" data-action="increase-qty" data-product-id="${product.id}" aria-label="Increase quantity">+</button>
                            </div>
                            <button class="remove-item" type="button" data-action="remove-from-cart" data-product-id="${product.id}">Remove</button>
                        </div>
                    </div>
                    <div class="cart-item-price">${formatPrice(product.price * item.quantity)}</div>
                </article>
            `;
        })
        .join("");
}

function renderCart() {
    const itemCount = getItemCount();

    if (elements.cartItems) {
        elements.cartItems.innerHTML = createCartMarkup();
    }

    elements.cartCount.forEach((badge) => {
        badge.textContent = itemCount;
    });

    if (elements.cartItemsTotal) {
        elements.cartItemsTotal.textContent = itemCount;
    }

    if (elements.cartTotal) {
        elements.cartTotal.textContent = formatPrice(getCartTotal());
    }
}

function syncUI() {
    saveState();
    renderProducts();
    renderCart();
}

function addToCart(productId) {
    const existingItem = state.cart.find((item) => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }

    syncUI();
    showToast("Added to cart.");
}

function updateCartQuantity(productId, nextQuantity) {
    const item = state.cart.find((cartItem) => cartItem.productId === productId);

    if (!item) {
        return;
    }

    if (nextQuantity <= 0) {
        removeFromCart(productId, false);
        showToast("Item removed from cart.");
        return;
    }

    item.quantity = nextQuantity;
    syncUI();
}

function removeFromCart(productId, notify = true) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    syncUI();

    if (notify) {
        showToast("Item removed from cart.");
    }
}

function toggleWishlist(productId) {
    if (isWishlisted(productId)) {
        state.wishlist = state.wishlist.filter((id) => id !== productId);
        showToast("Removed from wishlist.");
    } else {
        state.wishlist.push(productId);
        showToast("Added to wishlist.");
    }

    syncUI();
}

function openCart() {
    elements.cartDrawer.classList.add("is-open");
    elements.cartOverlay.classList.add("is-visible");
    elements.cartDrawer.setAttribute("aria-hidden", "false");
    elements.cartToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("cart-open");
}

function closeCart() {
    elements.cartDrawer.classList.remove("is-open");
    elements.cartOverlay.classList.remove("is-visible");
    elements.cartDrawer.setAttribute("aria-hidden", "true");
    elements.cartToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("cart-open");
}

document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-filter]");
    const actionButton = event.target.closest("[data-action]");
    const cartToggle = event.target.closest(".cart-toggle");
    const closeCartButton = event.target.closest("[data-close-cart]");
    const overlay = event.target.closest("[data-cart-overlay]");

    if (filterButton) {
        state.filter = filterButton.dataset.filter;
        renderProducts();
        return;
    }

    if (cartToggle) {
        openCart();
        return;
    }

    if (closeCartButton || overlay) {
        closeCart();
        return;
    }

    if (!actionButton) {
        return;
    }

    const productId = Number(actionButton.dataset.productId);
    const action = actionButton.dataset.action;

    if (action === "add-to-cart") {
        addToCart(productId);
    }

    if (action === "toggle-wishlist") {
        toggleWishlist(productId);
    }

    if (action === "increase-qty") {
        const item = state.cart.find((cartItem) => cartItem.productId === productId);

        if (item) {
            updateCartQuantity(productId, item.quantity + 1);
        }
    }

    if (action === "decrease-qty") {
        const item = state.cart.find((cartItem) => cartItem.productId === productId);

        if (item) {
            updateCartQuantity(productId, item.quantity - 1);
        }
    }

    if (action === "remove-from-cart") {
        removeFromCart(productId);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeCart();
    }
});

if (elements.contactForm) {
    elements.contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        elements.contactForm.reset();
        showToast("Message sent successfully.");
    });
}

if (elements.checkoutButton) {
    elements.checkoutButton.addEventListener("click", () => {
        showToast("Checkout will be connected in Phase 3.");
    });
}

syncUI();
