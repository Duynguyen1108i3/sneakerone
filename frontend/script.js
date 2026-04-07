const API_BASE = window.location.protocol === "file:" ? "http://localhost:5000" : "";
const STORAGE_KEYS = {
    token: "websneaker-token",
    user: "websneaker-user",
    wishlist: "websneaker-wishlist"
};

const state = {
    products: [],
    filter: "All",
    search: "",
    sort: "default",
    rating: "0",
    cart: [],
    orders: [],
    wishlist: uniqueIds(loadJson(STORAGE_KEYS.wishlist, [])),
    wishlistProducts: [],
    token: localStorage.getItem(STORAGE_KEYS.token) || "",
    user: loadJson(STORAGE_KEYS.user, null),
    productsError: "",
    cartError: "",
    selectedProduct: null,
    selectedSize: "",
    selectedQuantity: 1,
    adminProducts: []
};

const elements = {
    filterButtons: Array.from(document.querySelectorAll("[data-filter]")),
    brandGroups: Array.from(document.querySelectorAll("[data-category-group]")),
    productGrids: {
        Vans: document.getElementById("vans-products"),
        Converse: document.getElementById("converse-products")
    },
    productsFeedback: document.querySelector("[data-products-feedback]"),
    searchInput: document.querySelector("[data-search-input]"),
    sortSelect: document.querySelector("[data-sort-select]"),
    ratingSelect: document.querySelector("[data-rating-select]"),
    cartCount: document.querySelector("[data-cart-count]"),
    wishlistCount: document.querySelector("[data-wishlist-count]"),
    cartItems: document.querySelector("[data-cart-items]"),
    cartItemsTotal: document.querySelector("[data-cart-items-total]"),
    cartTotal: document.querySelector("[data-cart-total]"),
    cartNote: document.querySelector("[data-cart-note]"),
    cartOverlay: document.querySelector("[data-cart-overlay]"),
    cartDrawer: document.getElementById("cart-drawer"),
    authOverlay: document.querySelector("[data-auth-overlay]"),
    authModal: document.getElementById("auth-modal"),
    authGuest: document.querySelector("[data-auth-guest]"),
    authUser: document.querySelector("[data-auth-user]"),
    authMessage: document.querySelector("[data-auth-message]"),
    authTabs: Array.from(document.querySelectorAll("[data-auth-tab]")),
    authForms: Array.from(document.querySelectorAll("[data-auth-form]")),
    loginForm: document.getElementById("login-form"),
    registerForm: document.getElementById("register-form"),
    userName: document.querySelector("[data-user-name]"),
    userEmail: document.querySelector("[data-user-email]"),
    userRole: document.querySelector("[data-user-role]"),
    ordersList: document.querySelector("[data-orders-list]"),
    contactForm: document.getElementById("contact-form"),
    toast: document.querySelector("[data-toast]"),
    adminOpenButton: document.querySelector("[data-open-admin]"),
    productOverlay: document.querySelector("[data-product-overlay]"),
    productModal: document.getElementById("product-modal"),
    productModalTitle: document.querySelector("[data-product-modal-title]"),
    productDetailBody: document.querySelector("[data-product-detail-body]"),
    checkoutOverlay: document.querySelector("[data-checkout-overlay]"),
    checkoutModal: document.getElementById("checkout-modal"),
    checkoutForm: document.getElementById("checkout-form"),
    checkoutItemsCount: document.querySelector("[data-checkout-items-count]"),
    checkoutTotal: document.querySelector("[data-checkout-total]"),
    adminOverlay: document.querySelector("[data-admin-overlay]"),
    adminModal: document.getElementById("admin-modal"),
    adminForm: document.getElementById("admin-form"),
    adminProducts: document.querySelector("[data-admin-products]")
};

let toastTimer = null;
let searchTimer = null;

function loadJson(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        return fallback;
    }
}

function uniqueIds(values) {
    return [...new Set((Array.isArray(values) ? values : []).filter(Boolean))];
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function saveAuth() {
    if (state.token) {
        localStorage.setItem(STORAGE_KEYS.token, state.token);
    } else {
        localStorage.removeItem(STORAGE_KEYS.token);
    }

    if (state.user) {
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(state.user));
    } else {
        localStorage.removeItem(STORAGE_KEYS.user);
    }
}

function saveWishlist() {
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(uniqueIds(state.wishlist)));
}

function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        elements.toast.classList.remove("show");
    }, 2400);
}

function setAuthMessage(message, isError = false) {
    elements.authMessage.textContent = message;
    elements.authMessage.classList.toggle("is-error", isError);
}

function formatCurrency(value) {
    return `$${Number(value || 0).toFixed(2)} USD`;
}

function isLoggedIn() {
    return Boolean(state.token);
}

function isAdmin() {
    return state.user?.role === "admin";
}

function isWishlisted(productId) {
    return state.wishlist.includes(productId);
}

function normalizeSizeLabel(size) {
    return String(size || "").trim().toUpperCase();
}

function syncBodyLock() {
    const openPanels = [
        elements.authModal,
        elements.cartDrawer,
        elements.productModal,
        elements.checkoutModal,
        elements.adminModal
    ];

    const hasOpenPanel = openPanels.some((panel) => panel.classList.contains("is-open"));
    document.body.classList.toggle("panel-open", hasOpenPanel);
}

async function apiFetch(path, options = {}) {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    };

    if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Request failed.");
    }

    return data;
}

function createLoadingCards() {
    return Array.from({ length: 3 }, () => `
        <div class="loading-card">
            <div class="loading-line medium"></div>
            <div class="loading-line short"></div>
            <div class="loading-image"></div>
            <div class="loading-line medium"></div>
        </div>
    `).join("");
}

function createEmptyMarkup(message) {
    return `<div class="empty-state"><p>${escapeHtml(message)}</p></div>`;
}

function getProductById(productId) {
    return state.products.find((product) => product.id === productId)
        || state.adminProducts.find((product) => product.id === productId)
        || state.wishlistProducts.find((product) => product.id === productId)
        || null;
}

function getFirstAvailableSize(product) {
    const availableSize = (product?.sizes || []).find((size) => Number(size.stock) > 0);
    return availableSize ? normalizeSizeLabel(availableSize.label) : "";
}

function getSizeStock(product, sizeLabel) {
    const sizeEntry = (product?.sizes || []).find(
        (size) => normalizeSizeLabel(size.label) === normalizeSizeLabel(sizeLabel)
    );

    return sizeEntry ? Number(sizeEntry.stock) : 0;
}

function getFilteredProductsForCategory(category) {
    return state.products.filter((product) => {
        if (product.category !== category) {
            return false;
        }

        if (state.filter === "Wishlist") {
            return isWishlisted(product.id);
        }

        return true;
    });
}

function renderHeaderCounts() {
    const cartCount = state.cart.reduce((total, item) => total + Number(item.quantity), 0);
    elements.cartCount.textContent = cartCount;
    elements.wishlistCount.textContent = state.wishlist.length;
}

function createProductMarkup(product) {
    const wishlisted = isWishlisted(product.id);
    const imageClass = product.category === "Converse" && product.name.includes("High Top")
        ? " product-img--high"
        : "";
    const availableSizes = (product.sizes || [])
        .filter((size) => Number(size.stock) > 0)
        .map((size) => escapeHtml(size.label))
        .join(" / ");
    const badges = [
        product.featured ? "<span class=\"badge-pill\">Featured</span>" : "",
        product.isNewArrival ? "<span class=\"badge-pill badge-pill-light\">New</span>" : ""
    ].join("");

    return `
        <article class="product-card">
            <div class="card-top">
                <div>
                    <div class="card-brand">${escapeHtml(product.brand || product.category)}</div>
                    <div class="card-title">${escapeHtml(product.name)}</div>
                    <div class="card-colors">${String(product.colors.length).padStart(2, "0")} COLORS</div>
                </div>
                <button class="wishlist-icon ${wishlisted ? "active" : ""}" type="button" data-action="toggle-wishlist" data-product-id="${product.id}" aria-label="Toggle wishlist">
                    <i class="${wishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
                </button>
            </div>
            <div class="card-badges">${badges}</div>
            <img class="product-img${imageClass}" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
            <p class="card-description">${escapeHtml(product.description)}</p>
            <div class="card-meta-line">
                <span>Sizes: ${availableSizes || "Sold out"}</span>
                <span>&#9733; ${Number(product.rating).toFixed(1)} (${product.reviews})</span>
            </div>
            <div class="card-bottom">
                <div class="price-rating">${formatCurrency(product.price)}</div>
                <div class="product-card-actions">
                    <button class="btn-secondary btn-ghost" type="button" data-action="open-product" data-product-id="${product.id}">Quick View</button>
                    <button class="btn-add" type="button" data-action="open-product" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </article>
    `;
}

function renderProducts(loading = false) {
    renderHeaderCounts();

    elements.filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === state.filter);
    });

    let totalRendered = 0;

    ["Vans", "Converse"].forEach((category) => {
        const group = elements.brandGroups.find((item) => item.dataset.categoryGroup === category);
        const grid = elements.productGrids[category];
        const baseVisible = state.filter === "All" || state.filter === category || state.filter === "Wishlist";

        if (!grid || !group) {
            return;
        }

        if (loading) {
            group.classList.remove("is-hidden");
            grid.innerHTML = createLoadingCards();
            totalRendered += 3;
            return;
        }

        const products = getFilteredProductsForCategory(category);
        const shouldShowGroup = baseVisible && (
            state.filter !== "Wishlist" || products.length > 0
        );

        group.classList.toggle("is-hidden", !shouldShowGroup);

        if (!shouldShowGroup) {
            return;
        }

        totalRendered += products.length;
        grid.innerHTML = products.length
            ? products.map(createProductMarkup).join("")
            : createEmptyMarkup("No products found for this category.");
    });

    if (loading) {
        elements.productsFeedback.hidden = true;
        return;
    }

    if (state.productsError) {
        elements.productsFeedback.hidden = false;
        elements.productsFeedback.textContent = state.productsError;
        return;
    }

    if (totalRendered === 0) {
        elements.productsFeedback.hidden = false;
        elements.productsFeedback.textContent = state.filter === "Wishlist"
            ? "You do not have any favorite products in this view yet."
            : "No products match your current filters.";
        return;
    }

    elements.productsFeedback.hidden = true;
    elements.productsFeedback.textContent = "";
}

function renderAuthState() {
    const loggedIn = isLoggedIn();
    elements.authGuest.classList.toggle("is-hidden", loggedIn);
    elements.authUser.classList.toggle("is-hidden", !loggedIn);

    if (loggedIn && state.user) {
        elements.userName.textContent = state.user.name;
        elements.userEmail.textContent = state.user.email;
        elements.userRole.textContent = `${state.user.role} account`;
        elements.adminOpenButton.classList.toggle("is-hidden", !isAdmin());
        setAuthMessage("Account connected. Cart, wishlist, and orders are synced.");
    } else {
        elements.userRole.textContent = "customer";
        elements.adminOpenButton.classList.add("is-hidden");
        setAuthMessage("Login or create an account to save your cart and place orders.");
    }
}

function renderOrders(loading = false) {
    if (!isLoggedIn()) {
        elements.ordersList.innerHTML = createEmptyMarkup("Login to view your orders.");
        return;
    }

    if (loading) {
        elements.ordersList.innerHTML = Array.from({ length: 2 }, () => `
            <div class="loading-card">
                <div class="loading-line medium"></div>
                <div class="loading-line short"></div>
                <div class="loading-line medium"></div>
            </div>
        `).join("");
        return;
    }

    if (!state.orders.length) {
        elements.ordersList.innerHTML = createEmptyMarkup("No orders yet. Checkout from your cart when ready.");
        return;
    }

    elements.ordersList.innerHTML = state.orders.map((order) => `
        <article class="order-card">
            <div class="order-top-row">
                <h5>Order ${escapeHtml(order.id.slice(-6).toUpperCase())}</h5>
                <span class="order-status">${escapeHtml(order.status)}</span>
            </div>
            <p class="order-meta">${escapeHtml(new Date(order.createdAt).toLocaleString())}</p>
            <p class="order-meta">Payment: ${escapeHtml(order.paymentMethod.replaceAll("_", " "))}</p>
            <p class="order-meta">Ship to: ${escapeHtml(order.shippingAddress.line1)}, ${escapeHtml(order.shippingAddress.city)}</p>
            <p class="order-meta">Total: ${formatCurrency(order.totalPrice)}</p>
            <p class="order-items">${order.items.map((item) => `${item.quantity}x ${item.name} (${item.size})`).join(", ")}</p>
        </article>
    `).join("");
}

function renderCart(loading = false) {
    renderHeaderCounts();

    const itemCount = state.cart.reduce((total, item) => total + Number(item.quantity), 0);
    const total = state.cart.reduce(
        (sum, item) => sum + Number(item.quantity) * Number(item.product.price),
        0
    );

    elements.cartItemsTotal.textContent = itemCount;
    elements.cartTotal.textContent = formatCurrency(total);
    elements.checkoutItemsCount.textContent = itemCount;
    elements.checkoutTotal.textContent = formatCurrency(total);

    if (!isLoggedIn()) {
        elements.cartItems.innerHTML = createEmptyMarkup("Login to manage your cart and continue to checkout.");
        elements.cartNote.textContent = "Cart and orders are protected. Please login first.";
        return;
    }

    if (loading) {
        elements.cartItems.innerHTML = Array.from({ length: 2 }, () => `
            <div class="loading-card">
                <div class="loading-line medium"></div>
                <div class="loading-line short"></div>
                <div class="loading-line medium"></div>
            </div>
        `).join("");
        return;
    }

    if (state.cartError) {
        elements.cartItems.innerHTML = createEmptyMarkup(state.cartError);
        elements.cartNote.textContent = "Please refresh after the backend is running.";
        return;
    }

    elements.cartNote.textContent = "Review your sizes before checkout. Inventory updates in real time.";

    if (!state.cart.length) {
        elements.cartItems.innerHTML = `
            <div class="cart-empty">
                <h4>Your cart is empty</h4>
                <p>Add a sneaker to start your order.</p>
            </div>
        `;
        return;
    }

    elements.cartItems.innerHTML = state.cart.map((item) => `
        <article class="cart-item">
            <img class="cart-item-thumb" src="${escapeHtml(item.product.image)}" alt="${escapeHtml(item.product.name)}">
            <div class="cart-item-body">
                <h4>${escapeHtml(item.product.name)}</h4>
                <p class="cart-item-meta">${escapeHtml(item.product.category)} / Size ${escapeHtml(item.size)} / Stock ${item.availableStock}</p>
                <div class="cart-item-controls">
                    <div class="qty-control">
                        <button class="qty-btn" type="button" data-action="decrease-qty" data-cart-item-id="${item.id}" data-product-id="${item.product.id}" data-size="${escapeHtml(item.size)}">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" type="button" data-action="increase-qty" data-cart-item-id="${item.id}" data-product-id="${item.product.id}" data-size="${escapeHtml(item.size)}">+</button>
                    </div>
                    <button class="remove-item" type="button" data-action="remove-cart-item" data-cart-item-id="${item.id}">Remove</button>
                </div>
            </div>
            <div class="cart-item-price">${formatCurrency(Number(item.product.price) * Number(item.quantity))}</div>
        </article>
    `).join("");
}

function renderProductDetail(loading = false) {
    if (loading) {
        elements.productModalTitle.textContent = "Loading Product";
        elements.productDetailBody.innerHTML = `
            <div class="loading-card">
                <div class="loading-line medium"></div>
                <div class="loading-image"></div>
                <div class="loading-line medium"></div>
                <div class="loading-line short"></div>
            </div>
        `;
        return;
    }

    if (!state.selectedProduct) {
        elements.productModalTitle.textContent = "Select Your Pair";
        elements.productDetailBody.innerHTML = createEmptyMarkup("Unable to load this product.");
        return;
    }

    const product = state.selectedProduct;
    const totalStock = (product.sizes || []).reduce((sum, size) => sum + Number(size.stock), 0);
    const activeStock = getSizeStock(product, state.selectedSize);
    const canAddToCart = Boolean(state.selectedSize && activeStock > 0);

    elements.productModalTitle.textContent = product.name;
    elements.productDetailBody.innerHTML = `
        <div class="product-detail-media">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
        </div>
        <div class="product-detail-copy">
            <div class="card-badges">
                <span class="badge-pill">${escapeHtml(product.brand || product.category)}</span>
                ${product.isNewArrival ? "<span class=\"badge-pill badge-pill-light\">New Arrival</span>" : ""}
            </div>
            <h4>${escapeHtml(product.name)}</h4>
            <p class="detail-price">${formatCurrency(product.price)}</p>
            <p class="detail-description">${escapeHtml(product.description)}</p>

            <div class="detail-grid">
                <div>
                    <span class="detail-label">Category</span>
                    <strong>${escapeHtml(product.category)}</strong>
                </div>
                <div>
                    <span class="detail-label">Rating</span>
                    <strong>${Number(product.rating).toFixed(1)} / 5</strong>
                </div>
                <div>
                    <span class="detail-label">Colors</span>
                    <strong>${escapeHtml(product.colors.join(", "))}</strong>
                </div>
                <div>
                    <span class="detail-label">Stock</span>
                    <strong>${totalStock} pairs</strong>
                </div>
            </div>

            <div class="size-block">
                <p class="payment-title">Choose Size</p>
                <div class="size-grid">
                    ${(product.sizes || []).map((size) => `
                        <button class="size-chip ${normalizeSizeLabel(size.label) === state.selectedSize ? "active" : ""} ${Number(size.stock) < 1 ? "is-disabled" : ""}" type="button" data-action="select-size" data-size="${escapeHtml(size.label)}" ${Number(size.stock) < 1 ? "disabled" : ""}>
                            ${escapeHtml(size.label)}
                            <span>${Number(size.stock)} left</span>
                        </button>
                    `).join("")}
                </div>
                <p class="stock-note">${state.selectedSize ? `Size ${escapeHtml(state.selectedSize)} currently has ${activeStock} pair(s) available.` : "Select a size to continue."}</p>
            </div>

            <div class="detail-controls">
                <div class="qty-control qty-control-large">
                    <button class="qty-btn" type="button" data-action="detail-qty-decrease">-</button>
                    <span class="qty-value">${state.selectedQuantity}</span>
                    <button class="qty-btn" type="button" data-action="detail-qty-increase">+</button>
                </div>
                <button class="btn-secondary btn-ghost" type="button" data-action="toggle-wishlist" data-product-id="${product.id}">
                    ${isWishlisted(product.id) ? "Saved to Favorites" : "Save to Favorites"}
                </button>
            </div>

            <div class="detail-actions">
                <button class="btn-submit" type="button" data-action="submit-detail-cart" ${canAddToCart ? "" : "disabled"}>Add to Cart</button>
            </div>
        </div>
    `;
}

function renderAdminProducts(loading = false) {
    if (!isAdmin()) {
        elements.adminProducts.innerHTML = createEmptyMarkup("Admin access is required.");
        return;
    }

    if (loading) {
        elements.adminProducts.innerHTML = Array.from({ length: 4 }, () => `
            <div class="loading-card">
                <div class="loading-line medium"></div>
                <div class="loading-line short"></div>
                <div class="loading-line medium"></div>
            </div>
        `).join("");
        return;
    }

    if (!state.adminProducts.length) {
        elements.adminProducts.innerHTML = createEmptyMarkup("No products in the catalog.");
        return;
    }

    elements.adminProducts.innerHTML = state.adminProducts.map((product) => {
        const inventory = (product.sizes || [])
            .map((size) => `${size.label}:${size.stock}`)
            .join(" / ");

        return `
            <article class="admin-product-card">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
                <div class="admin-product-copy">
                    <div class="order-top-row">
                        <h5>${escapeHtml(product.name)}</h5>
                        <span class="order-status">${escapeHtml(product.category)}</span>
                    </div>
                    <p class="order-meta">${escapeHtml(product.brand)} / ${formatCurrency(product.price)}</p>
                    <p class="order-items">${escapeHtml(product.description)}</p>
                    <p class="inventory-meta">Inventory: ${escapeHtml(inventory)}</p>
                </div>
                <div class="admin-card-actions">
                    <button class="btn-secondary" type="button" data-action="edit-admin-product" data-product-id="${product.id}">Edit</button>
                    <button class="btn-secondary btn-danger" type="button" data-action="delete-admin-product" data-product-id="${product.id}">Delete</button>
                </div>
            </article>
        `;
    }).join("");
}

function openAuthModal(defaultTab = "login") {
    elements.authOverlay.classList.add("is-visible");
    elements.authModal.classList.add("is-open");
    elements.authModal.setAttribute("aria-hidden", "false");
    switchAuthTab(defaultTab);
    syncBodyLock();
}

function closeAuthModal() {
    elements.authOverlay.classList.remove("is-visible");
    elements.authModal.classList.remove("is-open");
    elements.authModal.setAttribute("aria-hidden", "true");
    syncBodyLock();
}

function openCart() {
    elements.cartOverlay.classList.add("is-visible");
    elements.cartDrawer.classList.add("is-open");
    elements.cartDrawer.setAttribute("aria-hidden", "false");
    syncBodyLock();
}

function closeCart() {
    elements.cartOverlay.classList.remove("is-visible");
    elements.cartDrawer.classList.remove("is-open");
    elements.cartDrawer.setAttribute("aria-hidden", "true");
    syncBodyLock();
}

function openProductModal() {
    elements.productOverlay.classList.add("is-visible");
    elements.productModal.classList.add("is-open");
    elements.productModal.setAttribute("aria-hidden", "false");
    syncBodyLock();
}

function closeProductModal() {
    elements.productOverlay.classList.remove("is-visible");
    elements.productModal.classList.remove("is-open");
    elements.productModal.setAttribute("aria-hidden", "true");
    syncBodyLock();
}

function openCheckoutModal() {
    elements.checkoutOverlay.classList.add("is-visible");
    elements.checkoutModal.classList.add("is-open");
    elements.checkoutModal.setAttribute("aria-hidden", "false");
    syncBodyLock();
}

function closeCheckoutModal() {
    elements.checkoutOverlay.classList.remove("is-visible");
    elements.checkoutModal.classList.remove("is-open");
    elements.checkoutModal.setAttribute("aria-hidden", "true");
    syncBodyLock();
}

function openAdminModal() {
    elements.adminOverlay.classList.add("is-visible");
    elements.adminModal.classList.add("is-open");
    elements.adminModal.setAttribute("aria-hidden", "false");
    syncBodyLock();
}

function closeAdminModal() {
    elements.adminOverlay.classList.remove("is-visible");
    elements.adminModal.classList.remove("is-open");
    elements.adminModal.setAttribute("aria-hidden", "true");
    syncBodyLock();
}

function switchAuthTab(tabName) {
    elements.authTabs.forEach((button) => {
        button.classList.toggle("active", button.dataset.authTab === tabName);
    });

    elements.authForms.forEach((form) => {
        form.classList.toggle("is-hidden", form.dataset.authForm !== tabName);
    });
}

function buildProductQuery() {
    const params = new URLSearchParams();

    if (state.filter === "Vans" || state.filter === "Converse") {
        params.set("category", state.filter);
    }

    if (state.search.trim()) {
        params.set("q", state.search.trim());
    }

    if (state.sort) {
        params.set("sort", state.sort);
    }

    if (Number(state.rating) > 0) {
        params.set("rating", state.rating);
    }

    return params.toString() ? `?${params.toString()}` : "";
}

async function loadProducts() {
    state.productsError = "";
    renderProducts(true);

    try {
        const data = await apiFetch(`/products${buildProductQuery()}`);
        state.products = data.products || [];
        state.wishlistProducts = state.products.filter((product) => isWishlisted(product.id));
    } catch (error) {
        state.products = [];
        state.productsError = error.message;
    }

    renderProducts(false);
}

async function loadMe() {
    if (!isLoggedIn()) {
        return;
    }

    const data = await apiFetch("/me");
    state.user = data.user;
    state.wishlist = uniqueIds(data.user.wishlist || state.wishlist);
    saveAuth();
    saveWishlist();
}

async function loadWishlist() {
    if (!isLoggedIn()) {
        state.wishlist = uniqueIds(state.wishlist);
        saveWishlist();
        state.wishlistProducts = state.products.filter((product) => isWishlisted(product.id));
        renderHeaderCounts();
        renderProducts(false);
        return;
    }

    const data = await apiFetch("/wishlist");
    state.user = data.user;
    state.wishlistProducts = data.wishlist || [];
    state.wishlist = uniqueIds(data.user.wishlist || state.wishlistProducts.map((product) => product.id));
    saveAuth();
    saveWishlist();
    renderHeaderCounts();
    renderProducts(false);
}

async function syncWishlistAfterAuth() {
    if (!isLoggedIn()) {
        return;
    }

    const localWishlist = uniqueIds(loadJson(STORAGE_KEYS.wishlist, []));

    if (localWishlist.length) {
        const data = await apiFetch("/wishlist/sync", {
            method: "POST",
            body: JSON.stringify({ productIds: localWishlist })
        });

        state.user = data.user;
        state.wishlistProducts = data.wishlist || [];
        state.wishlist = uniqueIds(data.user.wishlist || []);
        saveAuth();
        saveWishlist();
        return;
    }

    await loadWishlist();
}

async function loadCart() {
    if (!isLoggedIn()) {
        state.cart = [];
        state.cartError = "";
        renderCart();
        return;
    }

    state.cartError = "";
    renderCart(true);

    try {
        const data = await apiFetch("/cart");
        state.cart = data.items || [];
    } catch (error) {
        state.cart = [];
        state.cartError = error.message;
    }

    renderCart(false);
}

async function loadOrders(scope = "mine") {
    if (!isLoggedIn()) {
        state.orders = [];
        renderOrders();
        return;
    }

    renderOrders(true);

    try {
        const suffix = isAdmin() && scope === "all" ? "?scope=all" : "";
        const data = await apiFetch(`/orders${suffix}`);
        state.orders = data.orders || [];
    } catch (error) {
        state.orders = [];
        setAuthMessage(error.message, true);
    }

    renderOrders(false);
}

async function loadProductDetail(productId) {
    openProductModal();
    renderProductDetail(true);

    try {
        const data = await apiFetch(`/products/${productId}`);
        state.selectedProduct = data.product;
        state.selectedSize = getFirstAvailableSize(data.product);
        state.selectedQuantity = 1;
        renderProductDetail(false);
    } catch (error) {
        state.selectedProduct = null;
        renderProductDetail(false);
        showToast(error.message);
    }
}

async function loadAdminProducts() {
    if (!isAdmin()) {
        renderAdminProducts(false);
        return;
    }

    renderAdminProducts(true);

    try {
        const data = await apiFetch("/products?sort=default");
        state.adminProducts = data.products || [];
    } catch (error) {
        state.adminProducts = [];
        showToast(error.message);
    }

    renderAdminProducts(false);
}

function resetAdminForm() {
    elements.adminForm.reset();
    document.getElementById("admin-product-id").value = "";
    document.getElementById("admin-category").value = "Vans";
}

function fillAdminForm(product) {
    document.getElementById("admin-product-id").value = product.id;
    document.getElementById("admin-name").value = product.name;
    document.getElementById("admin-brand").value = product.brand || product.category;
    document.getElementById("admin-category").value = product.category;
    document.getElementById("admin-price").value = product.price;
    document.getElementById("admin-image").value = product.image;
    document.getElementById("admin-description").value = product.description;
    document.getElementById("admin-colors").value = (product.colors || []).join(", ");
    document.getElementById("admin-sizes").value = (product.sizes || [])
        .map((size) => `${size.label}:${size.stock}`)
        .join(", ");
    document.getElementById("admin-rating").value = product.rating;
    document.getElementById("admin-reviews").value = product.reviews;
    document.getElementById("admin-featured").checked = Boolean(product.featured);
    document.getElementById("admin-new-arrival").checked = Boolean(product.isNewArrival);
}

function parseAdminSizes(rawValue) {
    return String(rawValue || "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const [label, stock] = part.split(":").map((value) => value.trim());
            return {
                label,
                stock: Number(stock)
            };
        })
        .filter((size) => size.label && Number.isFinite(size.stock));
}

async function handleRegister(event) {
    event.preventDefault();
    setAuthMessage("Creating your account...");

    const payload = {
        name: document.getElementById("register-name").value.trim(),
        email: document.getElementById("register-email").value.trim(),
        password: document.getElementById("register-password").value
    };

    try {
        const data = await apiFetch("/register", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        state.token = data.token;
        state.user = data.user;
        saveAuth();
        await syncWishlistAfterAuth();
        renderAuthState();
        closeAuthModal();
        showToast("Account created.");
        elements.registerForm.reset();
        await Promise.all([loadProducts(), loadCart(), loadOrders()]);
    } catch (error) {
        setAuthMessage(error.message, true);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    setAuthMessage("Signing you in...");

    const payload = {
        email: document.getElementById("login-email").value.trim(),
        password: document.getElementById("login-password").value
    };

    try {
        const data = await apiFetch("/login", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        state.token = data.token;
        state.user = data.user;
        saveAuth();
        await syncWishlistAfterAuth();
        await loadMe();
        renderAuthState();
        closeAuthModal();
        showToast("Welcome back.");
        elements.loginForm.reset();
        await Promise.all([loadProducts(), loadCart(), loadOrders()]);
        if (isAdmin()) {
            await loadAdminProducts();
        }
    } catch (error) {
        setAuthMessage(error.message, true);
    }
}

function logout() {
    state.token = "";
    state.user = null;
    state.cart = [];
    state.orders = [];
    saveAuth();
    renderAuthState();
    renderCart();
    renderOrders();
    closeAuthModal();
    closeCart();
    closeCheckoutModal();
    closeAdminModal();
    showToast("Logged out.");
}

async function addSelectedProductToCart() {
    if (!state.selectedProduct) {
        return;
    }

    if (!isLoggedIn()) {
        openAuthModal("login");
        setAuthMessage("Please login before adding items to your cart.");
        return;
    }

    if (!state.selectedSize) {
        showToast("Please choose a size first.");
        return;
    }

    try {
        const data = await apiFetch("/cart", {
            method: "POST",
            body: JSON.stringify({
                productId: state.selectedProduct.id,
                size: state.selectedSize,
                quantity: state.selectedQuantity
            })
        });

        state.cart = data.items || [];
        renderCart(false);
        closeProductModal();
        showToast("Added to cart.");
    } catch (error) {
        showToast(error.message);
    }
}

async function updateCartItem(productId, size, quantity) {
    try {
        const data = await apiFetch("/cart", {
            method: "POST",
            body: JSON.stringify({ productId, size, quantity })
        });
        state.cart = data.items || [];
        renderCart(false);
    } catch (error) {
        showToast(error.message);
    }
}

async function removeCartItem(cartItemId) {
    try {
        const data = await apiFetch(`/cart/${cartItemId}`, {
            method: "DELETE"
        });
        state.cart = data.items || [];
        renderCart(false);
        showToast("Item removed.");
    } catch (error) {
        showToast(error.message);
    }
}

async function toggleWishlist(productId) {
    const isActive = isWishlisted(productId);

    if (!isLoggedIn()) {
        state.wishlist = isActive
            ? state.wishlist.filter((id) => id !== productId)
            : uniqueIds([...state.wishlist, productId]);
        saveWishlist();
        state.wishlistProducts = state.products.filter((product) => isWishlisted(product.id));
        renderProducts(false);
        renderCart(false);
        if (state.selectedProduct?.id === productId) {
            renderProductDetail(false);
        }
        showToast(isActive ? "Removed from favorites." : "Added to favorites.");
        return;
    }

    try {
        const data = await apiFetch(`/wishlist/${productId}`, {
            method: isActive ? "DELETE" : "PUT"
        });
        state.user = data.user;
        state.wishlistProducts = data.wishlist || [];
        state.wishlist = uniqueIds(data.user.wishlist || []);
        saveAuth();
        saveWishlist();
        renderAuthState();
        renderProducts(false);
        renderCart(false);
        if (state.selectedProduct?.id === productId) {
            renderProductDetail(false);
        }
        showToast(isActive ? "Removed from favorites." : "Added to favorites.");
    } catch (error) {
        showToast(error.message);
    }
}

async function syncWishlistManually() {
    if (!isLoggedIn()) {
        openAuthModal("login");
        return;
    }

    try {
        const data = await apiFetch("/wishlist/sync", {
            method: "POST",
            body: JSON.stringify({ productIds: state.wishlist })
        });

        state.user = data.user;
        state.wishlistProducts = data.wishlist || [];
        state.wishlist = uniqueIds(data.user.wishlist || []);
        saveAuth();
        saveWishlist();
        renderAuthState();
        renderProducts(false);
        showToast("Wishlist synced successfully.");
    } catch (error) {
        showToast(error.message);
    }
}

function openCheckout() {
    if (!isLoggedIn()) {
        openAuthModal("login");
        setAuthMessage("Login to place your order.");
        return;
    }

    if (!state.cart.length) {
        showToast("Your cart is empty.");
        return;
    }

    closeCart();
    openCheckoutModal();
}

async function handleCheckoutSubmit(event) {
    event.preventDefault();

    if (!state.cart.length) {
        showToast("Your cart is empty.");
        return;
    }

    const payload = {
        shippingAddress: {
            fullName: document.getElementById("checkout-full-name").value.trim(),
            phone: document.getElementById("checkout-phone").value.trim(),
            line1: document.getElementById("checkout-line1").value.trim(),
            city: document.getElementById("checkout-city").value.trim(),
            country: document.getElementById("checkout-country").value.trim(),
            postalCode: document.getElementById("checkout-postal-code").value.trim()
        },
        paymentMethod: document.querySelector("input[name='payment-method']:checked")?.value
    };

    try {
        await apiFetch("/order", {
            method: "POST",
            body: JSON.stringify(payload)
        });
        elements.checkoutForm.reset();
        closeCheckoutModal();
        closeCart();
        showToast("Order created successfully.");
        await Promise.all([loadProducts(), loadCart(), loadOrders()]);
        if (isAdmin()) {
            await loadAdminProducts();
        }
    } catch (error) {
        showToast(error.message);
    }
}

async function handleAdminSubmit(event) {
    event.preventDefault();

    const productId = document.getElementById("admin-product-id").value.trim();
    const payload = {
        name: document.getElementById("admin-name").value.trim(),
        brand: document.getElementById("admin-brand").value.trim(),
        category: document.getElementById("admin-category").value,
        price: Number(document.getElementById("admin-price").value),
        image: document.getElementById("admin-image").value.trim(),
        description: document.getElementById("admin-description").value.trim(),
        colors: document.getElementById("admin-colors").value
            .split(",")
            .map((color) => color.trim())
            .filter(Boolean),
        sizes: parseAdminSizes(document.getElementById("admin-sizes").value),
        rating: Number(document.getElementById("admin-rating").value),
        reviews: Number(document.getElementById("admin-reviews").value),
        featured: document.getElementById("admin-featured").checked,
        isNewArrival: document.getElementById("admin-new-arrival").checked
    };

    if (!payload.sizes.length) {
        showToast("Please add at least one size with stock.");
        return;
    }

    try {
        await apiFetch(productId ? `/products/${productId}` : "/products", {
            method: productId ? "PUT" : "POST",
            body: JSON.stringify(payload)
        });
        resetAdminForm();
        await Promise.all([loadAdminProducts(), loadProducts()]);
        showToast(productId ? "Product updated." : "Product created.");
    } catch (error) {
        showToast(error.message);
    }
}

function scrollToShop() {
    document.getElementById("shop-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindEvents() {
    elements.filterButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            state.filter = button.dataset.filter;
            await loadProducts();
        });
    });

    elements.searchInput.addEventListener("input", () => {
        state.search = elements.searchInput.value;
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            loadProducts();
        }, 280);
    });

    elements.sortSelect.addEventListener("change", async () => {
        state.sort = elements.sortSelect.value;
        await loadProducts();
    });

    elements.ratingSelect.addEventListener("change", async () => {
        state.rating = elements.ratingSelect.value;
        await loadProducts();
    });

    document.addEventListener("click", async (event) => {
        const actionButton = event.target.closest("[data-action]");

        if (event.target.closest(".profile-toggle")) {
            openAuthModal();
        }

        if (event.target.closest(".cart-toggle")) {
            openCart();
        }

        if (event.target.closest("[data-close-auth]") || event.target.closest("[data-auth-overlay]")) {
            closeAuthModal();
        }

        if (event.target.closest("[data-close-cart]") || event.target.closest("[data-cart-overlay]")) {
            closeCart();
        }

        if (event.target.closest("[data-close-product]") || event.target.closest("[data-product-overlay]")) {
            closeProductModal();
        }

        if (event.target.closest("[data-close-checkout]") || event.target.closest("[data-checkout-overlay]")) {
            closeCheckoutModal();
        }

        if (event.target.closest("[data-close-admin]") || event.target.closest("[data-admin-overlay]")) {
            closeAdminModal();
        }

        if (event.target.closest("[data-search-button]")) {
            scrollToShop();
            elements.searchInput.focus();
        }

        if (event.target.closest("[data-wishlist-button]")) {
            state.filter = "Wishlist";
            renderProducts(false);
            scrollToShop();
        }

        if (event.target.closest("[data-refresh-orders]")) {
            await loadOrders();
        }

        if (event.target.closest("[data-logout-button]")) {
            logout();
        }

        if (event.target.closest("[data-checkout-button]")) {
            openCheckout();
        }

        if (event.target.closest("[data-open-admin]")) {
            closeAuthModal();
            openAdminModal();
            await loadAdminProducts();
        }

        if (event.target.closest("[data-sync-wishlist]")) {
            await syncWishlistManually();
        }

        if (event.target.closest("[data-refresh-admin]")) {
            await loadAdminProducts();
        }

        if (event.target.closest("[data-reset-admin-form]")) {
            resetAdminForm();
        }

        if (!actionButton) {
            return;
        }

        const productId = actionButton.dataset.productId;
        const cartItemId = actionButton.dataset.cartItemId;
        const size = actionButton.dataset.size;
        const action = actionButton.dataset.action;

        if (action === "toggle-wishlist") {
            await toggleWishlist(productId);
            return;
        }

        if (action === "open-product") {
            await loadProductDetail(productId);
            return;
        }

        if (action === "select-size" && state.selectedProduct) {
            state.selectedSize = normalizeSizeLabel(actionButton.dataset.size);
            state.selectedQuantity = Math.min(
                Math.max(1, state.selectedQuantity),
                Math.max(1, getSizeStock(state.selectedProduct, state.selectedSize))
            );
            renderProductDetail(false);
            return;
        }

        if (action === "detail-qty-increase" && state.selectedProduct) {
            const maxStock = getSizeStock(state.selectedProduct, state.selectedSize);
            state.selectedQuantity = Math.min(state.selectedQuantity + 1, Math.max(1, maxStock));
            renderProductDetail(false);
            return;
        }

        if (action === "detail-qty-decrease" && state.selectedProduct) {
            state.selectedQuantity = Math.max(state.selectedQuantity - 1, 1);
            renderProductDetail(false);
            return;
        }

        if (action === "submit-detail-cart") {
            await addSelectedProductToCart();
            return;
        }

        if (action === "increase-qty") {
            const item = state.cart.find((cartItem) => cartItem.id === cartItemId);
            if (item) {
                await updateCartItem(productId, size, Number(item.quantity) + 1);
            }
            return;
        }

        if (action === "decrease-qty") {
            const item = state.cart.find((cartItem) => cartItem.id === cartItemId);
            if (item) {
                if (Number(item.quantity) <= 1) {
                    await removeCartItem(cartItemId);
                } else {
                    await updateCartItem(productId, size, Number(item.quantity) - 1);
                }
            }
            return;
        }

        if (action === "remove-cart-item") {
            await removeCartItem(cartItemId);
            return;
        }

        if (action === "edit-admin-product") {
            const product = state.adminProducts.find((item) => item.id === productId);
            if (product) {
                fillAdminForm(product);
            }
            return;
        }

        if (action === "delete-admin-product") {
            if (!window.confirm("Delete this product from the catalog?")) {
                return;
            }

            try {
                await apiFetch(`/products/${productId}`, {
                    method: "DELETE"
                });
                await Promise.all([loadAdminProducts(), loadProducts()]);
                showToast("Product deleted.");
            } catch (error) {
                showToast(error.message);
            }
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAuthModal();
            closeCart();
            closeProductModal();
            closeCheckoutModal();
            closeAdminModal();
        }
    });

    elements.authTabs.forEach((button) => {
        button.addEventListener("click", () => switchAuthTab(button.dataset.authTab));
    });

    elements.loginForm.addEventListener("submit", handleLogin);
    elements.registerForm.addEventListener("submit", handleRegister);
    elements.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
    elements.adminForm.addEventListener("submit", handleAdminSubmit);

    elements.contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        elements.contactForm.reset();
        showToast("Message sent successfully.");
    });
}

async function bootstrap() {
    bindEvents();
    renderAuthState();
    renderProducts(true);
    renderCart();
    renderOrders();
    renderAdminProducts(false);
    resetAdminForm();

    if (isLoggedIn()) {
        try {
            await loadMe();
            renderAuthState();
        } catch (error) {
            logout();
            showToast("Your session expired. Please login again.");
        }
    }

    await loadProducts();

    if (isLoggedIn()) {
        await Promise.all([loadWishlist(), loadCart(), loadOrders()]);

        if (isAdmin()) {
            await loadAdminProducts();
        }
    } else {
        await loadWishlist();
    }
}

bootstrap();
