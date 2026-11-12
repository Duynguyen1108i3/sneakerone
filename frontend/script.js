const API_BASE = window.location.protocol === "file:" ? "http://localhost:5000" : "";
const STORAGE_KEYS = {
    token: "websneaker-token",
    user: "websneaker-user",
    wishlist: "websneaker-wishlist"
};

const DEFAULT_LAB_GROUPS = [
    {
        id: "lab01",
        title: "Lab 01",
        items: [
            { name: "example01.php", path: "lab01/example01.php", ext: "php" },
            { name: "lab1_3.php", path: "lab01/lab1_3.php", ext: "php" },
            { name: "lab1_4.php", path: "lab01/lab1_4.php", ext: "php" },
            { name: "vi_du_04 / example01.php", path: "lab01/vi_du_04/example01.php", ext: "php" },
            { name: "vi_du_05 / bookstore / index.php", path: "lab01/vi_du_05/bookstore/index.php", ext: "php" }
        ]
    },
    {
        id: "lab02",
        title: "Lab 02",
        items: [
            { name: "lab2_1a.html", path: "lab02/lab2_1a.html", ext: "html" },
            { name: "lab2_1b.php", path: "lab02/lab2_1b.php", ext: "php" },
            { name: "lab2_2.php", path: "lab02/lab2_2.php", ext: "php" },
            { name: "lab2_3.php", path: "lab02/lab2_3.php", ext: "php" },
            { name: "lab2_4.php", path: "lab02/lab2_4.php", ext: "php" },
            { name: "lab2_5.php", path: "lab02/lab2_5.php", ext: "php" },
            { name: "lab2_5a.php", path: "lab02/lab2_5a.php", ext: "php" },
            { name: "lab2_5b.php", path: "lab02/lab2_5b.php", ext: "php" },
            { name: "lab2_6.php", path: "lab02/lab2_6.php", ext: "php" }
        ]
    },
    {
        id: "lab03",
        title: "Lab 03",
        items: [
            { name: "lab3_1.php", path: "lab03/lab3_1.php", ext: "php" },
            { name: "lab3_2.php", path: "lab03/lab3_2.php", ext: "php" },
            { name: "lab3_3.php", path: "lab03/lab3_3.php", ext: "php" },
            { name: "lab3_4.php", path: "lab03/lab3_4.php", ext: "php" },
            { name: "lab3_5.php", path: "lab03/lab3_5.php", ext: "php" }
        ]
    },
    {
        id: "lab04",
        title: "Lab 04",
        items: [
            { name: "lab4_1.php", path: "lab04/lab4_1.php", ext: "php" },
            { name: "lab4_2.php", path: "lab04/lab4_2.php", ext: "php" },
            { name: "lab4_3.php", path: "lab04/lab4_3.php", ext: "php" },
            { name: "lap4_4.php", path: "lab04/lap4_4.php", ext: "php" }
        ]
    },
    {
        id: "lab05",
        title: "Lab 05",
        items: [
            { name: "lab5_1.php", path: "lab05/lab5_1.php", ext: "php" },
            { name: "lab5_2.php", path: "lab05/lab5_2.php", ext: "php" },
            { name: "lab5_3 / 1.php", path: "lab05/lab5_3/1.php", ext: "php" },
            { name: "lab5_3 / 2.php", path: "lab05/lab5_3/2.php", ext: "php" },
            { name: "lab5_4 / index.php", path: "lab05/lab5_4/index.php", ext: "php" },
            { name: "lab5_4 / admin / index.php", path: "lab05/lab5_4/admin/index.php", ext: "php" }
        ]
    },
    {
        id: "lab06",
        title: "Lab 06",
        items: [
            { name: "lab06_1.php", path: "lab06/lab06_1.php", ext: "php" },
            { name: "lab06_2.php", path: "lab06/lab06_2.php", ext: "php" },
            { name: "lab06_3.php", path: "lab06/lab06_3.php", ext: "php" }
        ]
    },
    {
        id: "lab08",
        title: "Lab 08",
        items: [
            { name: "lab8_1.php", path: "lab08/lab8_1.php", ext: "php" },
            { name: "lab8_2.php", path: "lab08/lab8_2.php", ext: "php" },
            { name: "lab8_3.php", path: "lab08/lab8_3.php", ext: "php" },
            { name: "lab8_31.php", path: "lab08/lab8_31.php", ext: "php" },
            { name: "lab8_4 / index.php", path: "lab08/lab8_4/index.php", ext: "php" },
            { name: "lab8_5 / index.php", path: "lab08/lab8_5/index.php", ext: "php" }
        ]
    },
    {
        id: "lab09",
        title: "Lab 09",
        items: [
            { name: "lab9_1 / index.php", path: "lab09/lab9_1/index.php", ext: "php" },
            { name: "lab9_2 / index.php", path: "lab09/lab9_2/index.php", ext: "php" },
            { name: "lab9_2 / admins / index.html", path: "lab09/lab9_2/admins/index.html", ext: "html" },
            { name: "lab9_3 / index.php", path: "lab09/lab9_3/index.php", ext: "php" },
            { name: "lab9_4 / index.php", path: "lab09/lab9_4/index.php", ext: "php" },
            { name: "lab9_4 / admins / index.php", path: "lab09/lab9_4/admins/index.php", ext: "php" }
        ]
    },
    {
        id: "lab10",
        title: "Lab 10",
        items: [
            { name: "lab10_1 / index.php", path: "lab10/lab10_1/index.php", ext: "php" },
            { name: "lab10_2 / index.php", path: "lab10/lab10_2/index.php", ext: "php" },
            { name: "lab10_2 / admins / index.php", path: "lab10/lab10_2/admins/index.php", ext: "php" }
        ]
    },
    {
        id: "database",
        title: "Database",
        items: [
            { name: "bookstore.sql", path: "database/bookstore.sql", ext: "sql" },
            { name: "bookstore_vn.sql", path: "database/bookstore_vn.sql", ext: "sql" },
            { name: "bookstore.png", path: "database/bookstore.png", ext: "png" },
            { name: "bookstore_vn.png", path: "database/bookstore_vn.png", ext: "png" }
        ]
    }
];

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
    adminProducts: [],
    labGroups: DEFAULT_LAB_GROUPS,
    labsFilter: "all",
    labsSearch: "",
    labsLoaded: false,
    labServerActive: false,
    labServerBase: "",
    phpAvailable: false
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
    adminProducts: document.querySelector("[data-admin-products]"),
    labsOverlay: document.querySelector("[data-labs-overlay]"),
    labsModal: document.getElementById("labs-modal"),
    labsFilters: document.querySelector("[data-labs-filters]"),
    labsContent: document.querySelector("[data-labs-content]"),
    labsSearch: document.querySelector("[data-labs-search]"),
    labsCount: document.querySelector("[data-labs-count]"),
    labsStatus: document.querySelector("[data-labs-status]")
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
        elements.adminModal,
        elements.labsModal
    ];

    const hasOpenPanel = openPanels.some((panel) => panel && panel.classList.contains("is-open"));
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

const DIRECT_BROWSER_LAB_EXTS = new Set(["html", "htm", "png", "jpg", "jpeg", "gif", "svg", "webp", "pdf"]);

const LAB_SUPPORT_FILES = [
    "lab01/example01.php","lab01/lab1_3.php","lab01/lab1_4.php","lab01/vi_du_04/Error/404.html","lab01/vi_du_04/example01.php","lab01/vi_du_05/bookstore/config.php","lab01/vi_du_05/bookstore/index.php",
    "lab02/lab2_1a.html","lab02/lab2_1b.php","lab02/lab2_2.php","lab02/lab2_3.php","lab02/lab2_4.php","lab02/lab2_5.php","lab02/lab2_5a.php","lab02/lab2_5b.php","lab02/lab2_6.php",
    "lab03/lab3_1.php","lab03/lab3_2.php","lab03/lab3_3.php","lab03/lab3_4.php","lab03/lab3_5.php",
    "lab04/lab4_1.php","lab04/lab4_2.php","lab04/lab4_3.php","lab04/lap4_4.php",
    "lab05/lab5_1.php","lab05/lab5_2.php","lab05/lab5_3/1.php","lab05/lab5_3/2.php",
    "lab05/lab5_4/admin/index.php","lab05/lab5_4/include/function.php","lab05/lab5_4/include/header.php","lab05/lab5_4/include/left.php","lab05/lab5_4/index.php","lab05/lab5_4/mod.php",
    "lab05/lab5_4/module/index.php","lab05/lab5_4/module/info/gioithieu.php","lab05/lab5_4/module/info/index.php","lab05/lab5_4/module/info/lienhe.php","lab05/lab5_4/module/info/trangchu.php",
    "lab05/lab5_4/module/product/index.php","lab05/lab5_4/module/product/product_catalog.php","lab05/lab5_4/module/product/product_press.php","lab05/lab5_4/module/product/search.php","lab05/lab5_4/module/product/spbc.php","lab05/lab5_4/module/product/spmoi.php",
    "lab06/lab06_1.php","lab06/lab06_2.php","lab06/lab06_3.php",
    "lab08/lab8_1.php","lab08/lab8_2.php","lab08/lab8_3.php","lab08/lab8_31.php",
    "lab08/lab8_4/classes/Book.class.php","lab08/lab8_4/classes/Db.class.php","lab08/lab8_4/config/config.php","lab08/lab8_4/include/function.php","lab08/lab8_4/index.php",
    "lab08/lab8_5/classes/Book.class.php","lab08/lab8_5/classes/Db.class.php","lab08/lab8_5/config/config.php","lab08/lab8_5/include/category.php","lab08/lab8_5/include/function.php","lab08/lab8_5/include/header.php","lab08/lab8_5/include/publisher.php","lab08/lab8_5/index.php","lab08/lab8_5/module/book/home.php","lab08/lab8_5/module/book/index.php","lab08/lab8_5/module/book/list.php","lab08/lab8_5/module/news/index.php",
    "lab09/lab9_1/classes/Book.class.php","lab09/lab9_1/classes/Db.class.php","lab09/lab9_1/config/config.php","lab09/lab9_1/include/category.php","lab09/lab9_1/include/function.php","lab09/lab9_1/include/header.php","lab09/lab9_1/include/publisher.php","lab09/lab9_1/index.php","lab09/lab9_1/module/book/home.php","lab09/lab9_1/module/book/index.php","lab09/lab9_1/module/book/list.php","lab09/lab9_1/module/news/index.php",
    "lab09/lab9_2/admins/index.html","lab09/lab9_2/admins/login.html","lab09/lab9_2/classes/Book.class.php","lab09/lab9_2/classes/Db.class.php","lab09/lab9_2/config/config.php","lab09/lab9_2/include/category.php","lab09/lab9_2/include/function.php","lab09/lab9_2/include/header.php","lab09/lab9_2/include/publisher.php","lab09/lab9_2/index.php","lab09/lab9_2/module/book/home.php","lab09/lab9_2/module/book/index.php","lab09/lab9_2/module/book/list.php","lab09/lab9_2/module/news/index.php",
    "lab09/lab9_3/classes/Book.class.php","lab09/lab9_3/classes/Cart.class.php","lab09/lab9_3/classes/Db.class.php","lab09/lab9_3/config/config.php","lab09/lab9_3/include/category.php","lab09/lab9_3/include/function.php","lab09/lab9_3/include/header.php","lab09/lab9_3/include/publisher.php","lab09/lab9_3/index.php","lab09/lab9_3/mod.php","lab09/lab9_3/module/book/home.php","lab09/lab9_3/module/book/index.php","lab09/lab9_3/module/book/list.php","lab09/lab9_3/module/cart/index.php","lab09/lab9_3/module/news/index.php",
    "lab09/lab9_4/admins/index.php","lab09/lab9_4/admins/login.html","lab09/lab9_4/admins/mod.php","lab09/lab9_4/admins/module/book/bookshow.php","lab09/lab9_4/admins/module/book/catedit.php","lab09/lab9_4/admins/module/book/catshow.php","lab09/lab9_4/admins/module/book/index.php","lab09/lab9_4/classes/Book.class.php","lab09/lab9_4/classes/Cart.class.php","lab09/lab9_4/classes/Category.class.php","lab09/lab9_4/classes/Db.class.php","lab09/lab9_4/classes/Utils.class.php","lab09/lab9_4/config/config.php","lab09/lab9_4/include/category.php","lab09/lab9_4/include/function.php","lab09/lab9_4/include/header.php","lab09/lab9_4/include/publisher.php","lab09/lab9_4/index.php","lab09/lab9_4/mod.php","lab09/lab9_4/module/book/home.php","lab09/lab9_4/module/book/index.php","lab09/lab9_4/module/book/list.php","lab09/lab9_4/module/book/search.php","lab09/lab9_4/module/cart/index.php","lab09/lab9_4/module/news/index.php",
    "lab10/lab10_1/classes/Book.class.php","lab10/lab10_1/classes/Db.class.php","lab10/lab10_1/config/config.php","lab10/lab10_1/include/category.php","lab10/lab10_1/include/function.php","lab10/lab10_1/include/header.php","lab10/lab10_1/include/publisher.php","lab10/lab10_1/index.php","lab10/lab10_1/lib/PHPMailer/PHPMailerAutoload.php","lab10/lab10_1/lib/PHPMailer/class.phpmailer.php","lab10/lab10_1/lib/PHPMailer/class.smtp.php","lab10/lab10_1/module/book/home.php","lab10/lab10_1/module/book/index.php","lab10/lab10_1/module/book/list.php","lab10/lab10_1/module/news/index.php","lab10/lab10_1/module/user/index.php",
    "lab10/lab10_2/admins/index.php","lab10/lab10_2/admins/login.html","lab10/lab10_2/admins/mod.php","lab10/lab10_2/admins/module/book/bookshow.php","lab10/lab10_2/admins/module/book/catedit.php","lab10/lab10_2/admins/module/book/catshow.php","lab10/lab10_2/admins/module/book/index.php","lab10/lab10_2/admins/module/news/index.php","lab10/lab10_2/classes/Book.class.php","lab10/lab10_2/classes/Cart.class.php","lab10/lab10_2/classes/Category.class.php","lab10/lab10_2/classes/Db.class.php","lab10/lab10_2/classes/News.class.php","lab10/lab10_2/classes/Utils.class.php","lab10/lab10_2/config/config.php","lab10/lab10_2/include/category.php","lab10/lab10_2/include/function.php","lab10/lab10_2/include/header.php","lab10/lab10_2/include/publisher.php","lab10/lab10_2/index.php","lab10/lab10_2/lib/PHPMailer/PHPMailerAutoload.php","lab10/lab10_2/lib/PHPMailer/class.phpmailer.php","lab10/lab10_2/lib/PHPMailer/class.smtp.php","lab10/lab10_2/module/book/home.php","lab10/lab10_2/module/book/index.php","lab10/lab10_2/module/book/list.php","lab10/lab10_2/module/news/index.php","lab10/lab10_2/module/user/index.php"
];

function getLabBasePath() {
    if (state.labServerActive) {
        return `${state.labServerBase}/labth/`;
    }
    if (window.location.protocol === "file:" || window.location.pathname.includes("/frontend/")) {
        return "../labth/";
    }
    return "labth/";
}

function serializeJsonForHtmlScript(value) {
    return JSON.stringify(value)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}

function encodeLabRelPath(relPath) {
    return String(relPath || "")
        .split("/")
        .filter(Boolean)
        .map((segment) => encodeURIComponent(segment))
        .join("/");
}

function computeLabRootUrl(resolvedUrl, relPath) {
    const depth = String(relPath || "").split("/").filter(Boolean).length;
    const prefix = depth > 1 ? "../".repeat(depth - 1) : "./";
    return new URL(prefix, resolvedUrl).href;
}

function collectSubLabCandidates(entryRelPath) {
    const parts = String(entryRelPath || "").split("/").filter(Boolean);
    if (parts.length >= 3) {
        const prefix = `${parts[0]}/${parts[1]}/`;
        return LAB_SUPPORT_FILES.filter((item) => item.startsWith(prefix));
    }
    if (parts.length === 2) {
        const prefix = `${parts[0]}/`;
        return LAB_SUPPORT_FILES.filter((item) => item.startsWith(prefix) && !item.slice(prefix.length).includes("/"));
    }
    return [];
}

function isBinaryMediaContentType(contentType) {
    const ct = String(contentType || "").toLowerCase().split(";")[0].trim();
    if (!ct) {
        return false;
    }
    if (/^(?:image|video|audio|font)\//.test(ct)) {
        return true;
    }
    return ct === "application/pdf"
        || ct === "application/zip"
        || ct === "application/x-gzip"
        || ct === "application/x-shockwave-flash";
}

function resolveLabRelativeRef(currentRelPath, ref, labRootUrl) {
    if (!ref || /^(?:https?:|mailto:|tel:|javascript:|#|\/\/)/i.test(ref)) {
        return null;
    }
    const cleanRef = String(ref).split(/[?#]/)[0].trim();
    if (!cleanRef || !/\.(?:php|html?)$/i.test(cleanRef)) {
        return null;
    }
    try {
        const currentUrl = new URL(encodeLabRelPath(currentRelPath), labRootUrl);
        const targetUrl = new URL(cleanRef, currentUrl);
        if (!targetUrl.href.startsWith(labRootUrl)) {
            return null;
        }
        return decodeURIComponent(targetUrl.href.slice(labRootUrl.length));
    } catch (error) {
        return null;
    }
}

function extractPhpDependencyRefs(source) {
    const refs = new Set();
    const text = String(source || "");
    const includeRegex = /(?:include|include_once|require|require_once)\s*\(?\s*["']([^"'$\r\n<>]+?\.(?:php|html?))["']/gi;
    const attrRegex = /(?:action|href)\s*=\s*["']([^"'$?\r\n:]+?\.(?:php|html?)(?:\?[^"']*)?)["']/gi;
    let match;
    while ((match = includeRegex.exec(text)) !== null) {
        refs.add(match[1]);
    }
    while ((match = attrRegex.exec(text)) !== null) {
        refs.add(match[1]);
    }
    return [...refs];
}

async function preloadPhpLabFiles(entryRelPath, entrySource, labRootUrl) {
    const files = { [entryRelPath]: entrySource };
    const visited = new Set([entryRelPath]);
    const queue = [{ relPath: entryRelPath, source: entrySource, depth: 0 }];
    const MAX_FILES = 64;
    const MAX_DEPTH = 3;

    async function fetchPendingBatch(pendingList) {
        const batchSize = 12;
        const results = [];
        for (let i = 0; i < pendingList.length; i += batchSize) {
            const slice = pendingList.slice(i, i + batchSize);
            const chunk = await Promise.all(slice.map(async (rel) => {
                try {
                    const res = await fetch(`${labRootUrl}${encodeLabRelPath(rel)}`);
                    if (!res.ok) {
                        return null;
                    }
                    if (isBinaryMediaContentType(res.headers.get("content-type"))) {
                        return null;
                    }
                    return { rel, text: await res.text() };
                } catch (error) {
                    return null;
                }
            }));
            results.push(...chunk);
        }
        return results;
    }

    const subLabPending = [];
    for (const rel of collectSubLabCandidates(entryRelPath)) {
        if (!visited.has(rel) && subLabPending.length + 1 < MAX_FILES) {
            visited.add(rel);
            subLabPending.push(rel);
        }
    }
    if (subLabPending.length) {
        const fetched = await fetchPendingBatch(subLabPending);
        for (const item of fetched) {
            if (item && Object.keys(files).length < MAX_FILES) {
                files[item.rel] = item.text;
                queue.push({ relPath: item.rel, source: item.text, depth: 1 });
            }
        }
    }

    while (queue.length > 0 && Object.keys(files).length < MAX_FILES) {
        const current = queue.shift();
        if (!current || current.depth >= MAX_DEPTH) {
            continue;
        }
        const refs = extractPhpDependencyRefs(current.source);
        const pending = [];
        for (const ref of refs) {
            const candidateRel = resolveLabRelativeRef(current.relPath, ref, labRootUrl);
            if (!candidateRel || visited.has(candidateRel)) {
                continue;
            }
            visited.add(candidateRel);
            pending.push(candidateRel);
            if (visited.size >= MAX_FILES * 2) {
                break;
            }
        }
        if (!pending.length) {
            continue;
        }
        const fetched = await fetchPendingBatch(pending);
        for (const item of fetched) {
            if (item && Object.keys(files).length < MAX_FILES) {
                files[item.rel] = item.text;
                queue.push({ relPath: item.rel, source: item.text, depth: current.depth + 1 });
            }
        }
    }

    return files;
}

function buildLabHref(relPath) {
    return `${getLabBasePath()}${encodeLabRelPath(relPath)}`;
}

function buildLabPreviewHtml(relPath, rawUrl, source, ext, preloadedFiles = null) {
    const resolvedUrl = new URL(rawUrl, window.location.href).href;
    const baseDir = new URL(".", resolvedUrl).href;
    const labRootUrl = computeLabRootUrl(resolvedUrl, relPath);
    const isPhp = ext === "php";
    const withoutPhp = isPhp
        ? String(source || "")
            .replace(/<\?(?:php|=)?[\s\S]*?\?>/gi, "")
            .replace(/<\?(?:php|=)?[\s\S]*$/i, "")
            .trim()
        : "";
    const hasHtmlMarkup = isPhp && /<[a-z][\s\S]*>/i.test(withoutPhp);

    let srcdoc = "";
    if (hasHtmlMarkup) {
        if (/<head(?:\s[^>]*)?>/i.test(withoutPhp)) {
            srcdoc = withoutPhp.replace(/<head(?:\s[^>]*)?>/i, (match) => `${match}<base href="${escapeHtml(baseDir)}">`);
        } else {
            srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><base href="${escapeHtml(baseDir)}"></head><body>${withoutPhp}</body></html>`;
        }
    }

    const badgeLabel = isPhp ? "PHP Browser" : "Browser Preview";
    const initialNoticeTitle = isPhp
        ? `Đang chạy PHP trực tiếp: labth/${escapeHtml(relPath)}`
        : `Mở trực tiếp trên trình duyệt: labth/${escapeHtml(relPath)}`;
    const initialNoticeText = isPhp
        ? "Đang tải và thực thi PHP 8.3 WebAssembly trực tiếp trên trình duyệt..."
        : `Đang xem nội dung file .${escapeHtml(ext)} trực tiếp trên trình duyệt.`;

    const phpBootstrap = isPhp
        ? serializeJsonForHtmlScript({
            entryRelPath: relPath,
            labRootUrl,
            files: preloadedFiles || { [relPath]: source },
            hasHtmlMarkup
        })
        : "";

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(relPath)} - Trình duyệt LABTHWEB</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 1040px; margin: 32px auto; padding: 0 20px; color: #111; line-height: 1.6; }
        .top-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #111; color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
        .notice { background: #f5f5f5; border: 1px solid #ddd; border-radius: 14px; padding: 16px 18px; margin-bottom: 18px; }
        .notice.is-error { background: #fff7ed; border-color: #fdba74; }
        .notice strong { display: block; margin-bottom: 4px; }
        .tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .tab-btn { padding: 8px 14px; border-radius: 999px; border: 1px solid #d4d4d4; background: #fff; font-weight: 700; cursor: pointer; }
        .tab-btn.active { background: #111; color: #fff; border-color: #111; }
        .panel.is-hidden,
        .is-hidden { display: none; }
        iframe { width: 100%; min-height: 500px; border: 1px solid #ddd; border-radius: 14px; background: #fff; }
        pre { background: #111; color: #f5f5f5; padding: 20px; border-radius: 14px; overflow-x: auto; font-size: 13px; line-height: 1.5; margin: 0; }
        .loading-box { padding: 28px 20px; border: 1px solid #ddd; border-radius: 14px; background: #fafafa; color: #333; }
    </style>
</head>
<body>
    <div class="top-bar">
        <strong id="active-file-label">labth/${escapeHtml(relPath)}</strong>
        <span class="badge" id="preview-badge">${badgeLabel}</span>
    </div>
    <div class="notice" id="preview-notice">
        <strong id="notice-title">${initialNoticeTitle}</strong>
        <span id="notice-text">${initialNoticeText}</span>
    </div>
    ${isPhp ? `
    <div class="tabs">
        <button class="tab-btn active" type="button" data-tab="php">Kết quả PHP</button>
        <button class="tab-btn" type="button" data-tab="source">Mã nguồn PHP</button>
        ${hasHtmlMarkup ? `<button class="tab-btn" type="button" data-tab="render">Giao diện HTML</button>` : ""}
    </div>
    <div class="panel" data-panel="php">
        <div class="loading-box" id="php-loading-box">Đang khởi tạo PHP 8.3 WebAssembly... (lần đầu tải ~18MB từ CDN, các lần sau dùng bộ nhớ đệm)</div>
        <iframe id="php-output-frame" class="is-hidden" sandbox="allow-scripts allow-forms" title="${escapeHtml(relPath)}"></iframe>
    </div>
    <div class="panel is-hidden" data-panel="source">
        <pre><code id="php-source-code">${escapeHtml(source)}</code></pre>
    </div>
    ${hasHtmlMarkup ? `
    <div class="panel is-hidden" data-panel="render">
        <iframe sandbox title="${escapeHtml(relPath)} HTML" srcdoc="${escapeHtml(srcdoc)}"></iframe>
    </div>` : ""}` : `
    <div class="panel" data-panel="source">
        <pre><code>${escapeHtml(source)}</code></pre>
    </div>`}
    <script>
        function switchPreviewTab(target) {
            document.querySelectorAll("[data-tab]").forEach(function (b) {
                b.classList.toggle("active", b.getAttribute("data-tab") === target);
            });
            document.querySelectorAll("[data-panel]").forEach(function (p) {
                p.classList.toggle("is-hidden", p.getAttribute("data-panel") !== target);
            });
        }
        document.querySelectorAll("[data-tab]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                switchPreviewTab(btn.getAttribute("data-tab"));
            });
        });
    </script>
    ${isPhp ? `
    <script type="application/json" id="php-bootstrap">${phpBootstrap}</script>
    <script type="module">
        const config = JSON.parse(document.getElementById("php-bootstrap").textContent);
        const noticeEl = document.getElementById("preview-notice");
        const noticeTitleEl = document.getElementById("notice-title");
        const noticeTextEl = document.getElementById("notice-text");
        const activeFileEl = document.getElementById("active-file-label");
        const loadingBoxEl = document.getElementById("php-loading-box");
        const outputFrame = document.getElementById("php-output-frame");
        const sourceCodeEl = document.getElementById("php-source-code");

        function setNotice(title, text, isError = false) {
            if (noticeTitleEl) noticeTitleEl.textContent = title;
            if (noticeTextEl) noticeTextEl.textContent = text;
            if (noticeEl) noticeEl.classList.toggle("is-error", Boolean(isError));
        }

        function escapeAttr(val) {
            return String(val ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }

        function buildOutputSrcdoc(rawHtml, currentRelPath) {
            const encodedRel = currentRelPath.split("/").filter(Boolean).map(encodeURIComponent).join("/");
            const currentPageUrl = config.labRootUrl + encodedRel;
            const currentDirUrl = new URL(".", currentPageUrl).href;
            const bridgePayload = JSON.stringify(encodeURIComponent(currentPageUrl));
            const bridgeScript = "<script>" +
                "(function(){" +
                "var curPage=decodeURIComponent(" + bridgePayload + ");" +
                "document.addEventListener('click',function(e){" +
                "var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;" +
                "if(!a)return;" +
                "var href=a.getAttribute('href');" +
                "if(!href||/^(?:javascript:|mailto:|tel:|#)/i.test(href))return;" +
                "var resolved;try{resolved=new URL(href,curPage);}catch(_){return;}" +
                "if(resolved.pathname.toLowerCase().endsWith('.php')){e.preventDefault();window.parent.postMessage({__labWasmNav:true,url:resolved.href,method:'GET'},'*');}" +
                "});" +
                "document.addEventListener('submit',async function(e){" +
                "var form=e.target;if(!form||form.tagName!=='FORM')return;" +
                "var action=form.getAttribute('action')||curPage;" +
                "var resolved;try{resolved=new URL(action,curPage).href;}catch(_){return;}" +
                "e.preventDefault();" +
                "var method=(form.getAttribute('method')||'GET').toUpperCase();" +
                "var enctype=(form.getAttribute('enctype')||'').toLowerCase();" +
                "var fd=new FormData(form);" +
                "if(e.submitter&&e.submitter.name&&!fd.has(e.submitter.name)){fd.append(e.submitter.name,e.submitter.value||'');}" +
                "var fields=[];" +
                "for(var pair of fd.entries()){" +
                "var k=pair[0],v=pair[1];" +
                "if(typeof File!=='undefined'&&v instanceof File){fields.push({name:k,isFile:true,fileName:v.name,type:v.type,bytes:await v.arrayBuffer()});}" +
                "else{fields.push({name:k,isFile:false,value:String(v)});}" +
                "}" +
                "window.parent.postMessage({__labWasmNav:true,url:resolved,method:method,enctype:enctype,fields:fields},'*');" +
                "});" +
                "})();" +
                "<" + "/script>";

            let html = String(rawHtml ?? "");
            if (/<head(?:\\s[^>]*)?>/i.test(html)) {
                html = html.replace(/<head(?:\\s[^>]*)?>/i, (m) => m + '<base href="' + escapeAttr(currentDirUrl) + '">');
            } else {
                html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><base href="' + escapeAttr(currentDirUrl) + '"></head><body>' + html + '</body></html>';
            }
            if (/<\\/body>/i.test(html)) {
                return html.replace(/<\\/body>/i, bridgeScript + "</body>");
            }
            return html + bridgeScript;
        }

        function extractRedirectLoc(sourceText) {
            const match = /header\\s*\\(\\s*["']location\\s*:\\s*([^"'\\r\\n]+)["']\\s*\\)/i.exec(String(sourceText || ""));
            return match ? match[1].trim() : "";
        }

        async function runBrowserPhp() {
            let PHP;
            let PHPRequestHandler;
            let loadPHPRuntime;
            let getPHPLoaderModule;
            let jspi;
            let variant;
            let variantBase;
            let php;
            let handler;
            let runtimeDirty = false;
            const written = new Set();

            function ensureFileInVfs(relPath, content) {
                const normalized = String(relPath || "").replace(/^\\/+/, "");
                const full = "/labth/" + normalized;
                const slash = full.lastIndexOf("/");
                if (slash > 0) {
                    php.mkdirTree(full.slice(0, slash));
                }
                php.writeFile(full, content);
                written.add(normalized);
            }

            async function createPhpRuntime() {
                const loader = await getPHPLoaderModule();
                const runtimeId = await loadPHPRuntime(loader, {
                    locateFile(file) {
                        const raw = String(file || "");
                        if (/^https?:\\/\\//i.test(raw)) return raw;
                        return variantBase + raw.replace(/^\\.?\\//, "");
                    }
                });
                php = new PHP(runtimeId);
                written.clear();
                for (const [rel, text] of Object.entries(config.files || {})) {
                    ensureFileInVfs(rel, text);
                }
                if (String(config.entryRelPath || "").startsWith("lab05/lab5_3/")) {
                    php.mkdirTree("/labth/lab05/lab5_3/image");
                }
                handler = new PHPRequestHandler({
                    php,
                    documentRoot: "/labth",
                    absoluteUrl: "http://127.0.0.1"
                });
                runtimeDirty = false;
            }

            async function ensurePathFetched(relPath) {
                const normalized = String(relPath || "").replace(/^\\/+/, "");
                if (written.has(normalized)) return normalized;
                const encoded = normalized.split("/").filter(Boolean).map(encodeURIComponent).join("/");
                const res = await fetch(config.labRootUrl + encoded);
                if (!res.ok) throw new Error("HTTP " + res.status);
                const text = await res.text();
                config.files[normalized] = text;
                ensureFileInVfs(normalized, text);
                if (normalized.startsWith("lab05/lab5_3/")) {
                    php.mkdirTree("/labth/lab05/lab5_3/image");
                }
                return normalized;
            }

            try {
                ([{ PHP, PHPRequestHandler, loadPHPRuntime }, { getPHPLoaderModule, jspi }] = await Promise.all([
                    import("https://cdn.jsdelivr.net/npm/@php-wasm/universal@3.1.64/+esm"),
                    import("https://cdn.jsdelivr.net/npm/@php-wasm/web-8-3@3.1.64/+esm")
                ]));
                variant = (await jspi()) ? "jspi" : "asyncify";
                variantBase = "https://cdn.jsdelivr.net/npm/@php-wasm/web-8-3@3.1.64/" + variant + "/";
                await createPhpRuntime();

                async function executeRequest(relPath, queryString = "", method = "GET", headers = {}, body = undefined, hop = 0) {
                    if (runtimeDirty || !php || !handler) {
                        await createPhpRuntime();
                    }
                    const normalizedRel = await ensurePathFetched(relPath);
                    if (activeFileEl) activeFileEl.textContent = "labth/" + normalizedRel;
                    if (sourceCodeEl && config.files[normalizedRel]) sourceCodeEl.textContent = config.files[normalizedRel];

                    const lastSlash = normalizedRel.lastIndexOf("/");
                    const vfsDir = lastSlash > 0 ? "/labth/" + normalizedRel.slice(0, lastSlash) : "/labth";
                    php.mkdirTree(vfsDir);
                    php.chdir(vfsDir);

                    let res;
                    try {
                        res = await handler.request({
                            url: "/" + normalizedRel + queryString,
                            method,
                            headers,
                            body
                        });
                    } catch (err) {
                        runtimeDirty = true;
                        throw err;
                    }
                    const status = res.httpStatusCode || 200;
                    if (status >= 500) {
                        runtimeDirty = true;
                    }
                    const resHeaders = res.headers || {};
                    let location = resHeaders.location || resHeaders.Location || "";
                    if (Array.isArray(location)) location = location[0] || "";
                    if (status >= 300 && status < 400 && !location) {
                        location = extractRedirectLoc(config.files[normalizedRel]);
                    }
                    if (status >= 300 && status < 400 && location && hop < 5) {
                        const curUrl = new URL(normalizedRel.split("/").map(encodeURIComponent).join("/"), config.labRootUrl);
                        const nextUrl = new URL(location.replace(/^http:\\/\\/127\\.0\\.0\\.1/, ""), curUrl);
                        if (nextUrl.href.startsWith(config.labRootUrl)) {
                            const nextPathAndQuery = nextUrl.href.slice(config.labRootUrl.length);
                            const qIdx = nextPathAndQuery.indexOf("?");
                            const nextRel = decodeURIComponent(qIdx >= 0 ? nextPathAndQuery.slice(0, qIdx) : nextPathAndQuery);
                            const nextQs = qIdx >= 0 ? nextPathAndQuery.slice(qIdx) : "";
                            return await executeRequest(nextRel, nextQs, "GET", {}, undefined, hop + 1);
                        }
                    }

                    const text = res.text;
                    if (loadingBoxEl) loadingBoxEl.classList.add("is-hidden");
                    if (outputFrame) {
                        outputFrame.classList.remove("is-hidden");
                        outputFrame.srcdoc = buildOutputSrcdoc(text, normalizedRel);
                    }
                    setNotice(
                        "Đã chạy PHP trực tiếp: labth/" + normalizedRel,
                        "Đang thực thi bằng PHP 8.3 WebAssembly trực tiếp trên trình duyệt (HTTP " + status + ")."
                    );
                }

                window.addEventListener("message", async (event) => {
                    if (!outputFrame || event.source !== outputFrame.contentWindow) return;
                    const data = event.data;
                    if (!data || data.__labWasmNav !== true || !data.url) return;
                    if (!String(data.url).startsWith(config.labRootUrl)) return;

                    const tail = String(data.url).slice(config.labRootUrl.length);
                    const qIdx = tail.indexOf("?");
                    const targetRel = decodeURIComponent(qIdx >= 0 ? tail.slice(0, qIdx) : tail);
                    let qs = qIdx >= 0 ? tail.slice(qIdx) : "";
                    const method = String(data.method || "GET").toUpperCase();
                    let headers = {};
                    let body;

                    if (Array.isArray(data.fields)) {
                        if (method === "GET") {
                            const params = new URLSearchParams(qs.startsWith("?") ? qs.slice(1) : "");
                            for (const f of data.fields) {
                                if (!f.isFile) params.append(f.name, f.value);
                            }
                            const encoded = params.toString();
                            qs = encoded ? "?" + encoded : "";
                        } else if (String(data.enctype || "").includes("multipart/form-data")) {
                            const fd = new FormData();
                            for (const f of data.fields) {
                                if (f.isFile) {
                                    fd.append(f.name, new File([f.bytes], f.fileName, { type: f.type || "application/octet-stream" }));
                                } else {
                                    fd.append(f.name, f.value);
                                }
                            }
                            const req = new Request("https://local.invalid/", { method: "POST", body: fd });
                            headers["content-type"] = req.headers.get("content-type");
                            body = new Uint8Array(await req.arrayBuffer());
                        } else {
                            const params = new URLSearchParams();
                            for (const f of data.fields) {
                                if (!f.isFile) params.append(f.name, f.value);
                            }
                            headers["content-type"] = "application/x-www-form-urlencoded";
                            body = new TextEncoder().encode(params.toString());
                        }
                    }

                    try {
                        await executeRequest(targetRel, qs, method, headers, body);
                    } catch (err) {
                        const isDbErr = err && (err.name === "ErrnoError" || /mysql|errno|pdo/i.test(err.message || ""));
                        setNotice(
                            "Không thể thực thi labth/" + targetRel,
                            isDbErr
                                ? "Bài lab này có kết nối MySQL (trình duyệt tĩnh chưa chạy MySQL Server), hiển thị mã nguồn để tham khảo."
                                : "Lỗi PHP WebAssembly: " + (err && err.message ? err.message : String(err)),
                            true
                        );
                        switchPreviewTab(config.hasHtmlMarkup ? "render" : "source");
                    }
                });

                await executeRequest(config.entryRelPath);
            } catch (error) {
                const isDbErr = error && (error.name === "ErrnoError" || /mysql|errno/i.test(error.message || ""));
                if (loadingBoxEl) {
                    loadingBoxEl.textContent = isDbErr
                        ? "Bài lab này yêu cầu MySQL Server (không chạy trực tiếp trong trình duyệt tĩnh). Hãy xem tab Mã nguồn PHP" + (config.hasHtmlMarkup ? " hoặc Giao diện HTML." : ".")
                        : "Không thể chạy PHP WebAssembly trên trình duyệt (" + (error && error.message ? error.message : String(error)) + ").";
                }
                setNotice(
                    isDbErr ? "Lab cần MySQL: labth/" + config.entryRelPath : "Chuyển sang chế độ xem mã nguồn: labth/" + config.entryRelPath,
                    isDbErr
                        ? "Bài lab này có kết nối MySQL (trình duyệt tĩnh chưa chạy MySQL Server), hiển thị mã nguồn" + (config.hasHtmlMarkup ? " và giao diện HTML tĩnh." : " để tham khảo.")
                        : "Không nạp được PHP 8.3 WebAssembly từ CDN; đang hiển thị mã nguồn" + (config.hasHtmlMarkup ? " và giao diện HTML tĩnh." : "."),
                    true
                );
                switchPreviewTab(config.hasHtmlMarkup ? "render" : "source");
            }
        }

        runBrowserPhp();
    </script>` : ""}
</body>
</html>`;
}

function writePreviewTabHtml(tab, html) {
    tab.document.open();
    tab.document.write(html);
    tab.document.close();
}

async function openLabPreviewTab(rawUrl, relPath, ext) {
    const previewWin = window.open("", "_blank");
    if (!previewWin) {
        showToast("Trình duyệt đang chặn cửa sổ mới. Hãy cho phép pop-up để mở bài lab.");
        return;
    }

    writePreviewTabHtml(
        previewWin,
        `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;padding:40px 20px;text-align:center;color:#111;}</style></head><body>Đang mở <strong>labth/${escapeHtml(relPath)}</strong> trong trình duyệt...</body></html>`
    );

    if (window.location.protocol === "file:") {
        writePreviewTabHtml(
            previewWin,
            `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:48px auto;padding:0 20px;line-height:1.6;color:#111;}.box{background:#f5f5f5;border:1px solid #ddd;border-radius:14px;padding:20px;}</style></head><body><div class="box"><h2>Không thể tải trực tiếp qua file://</h2><p>File <strong>labth/${escapeHtml(relPath)}</strong> là file <code>.${escapeHtml(ext)}</code> nên đã chặn hành động tự tải xuống.</p><p>Hãy mở trang qua <strong>Render</strong>, <strong>VS Code Live Server</strong>, hoặc chạy <code>npm start</code>.</p></div></body></html>`
        );
        previewWin.opener = null;
        return;
    }

    try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const source = await response.text();
        let preloadedFiles = null;
        if (ext === "php") {
            const resolvedUrl = new URL(rawUrl, window.location.href).href;
            const labRootUrl = computeLabRootUrl(resolvedUrl, relPath);
            preloadedFiles = await preloadPhpLabFiles(relPath, source, labRootUrl);
        }
        writePreviewTabHtml(previewWin, buildLabPreviewHtml(relPath, rawUrl, source, ext, preloadedFiles));
    } catch (error) {
        writePreviewTabHtml(
            previewWin,
            `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>${escapeHtml(relPath)}</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:48px auto;padding:0 20px;line-height:1.6;color:#111;}.box{background:#f5f5f5;border:1px solid #ddd;border-radius:14px;padding:20px;}</style></head><body><div class="box"><h2>Không thể mở bài lab</h2><p>Không đọc được nội dung của <strong>labth/${escapeHtml(relPath)}</strong> (${escapeHtml(error.message)}).</p></div></body></html>`
        );
    }
    previewWin.opener = null;
}

function renderLabs() {
    if (!elements.labsContent || !elements.labsFilters) {
        return;
    }

    const groups = state.labGroups || [];
    const totalAll = groups.reduce((sum, group) => sum + group.items.length, 0);

    if (elements.labsStatus) {
        if (state.labServerActive) {
            elements.labsStatus.textContent = state.phpAvailable ? "PHP Ready" : "Node Preview";
            elements.labsStatus.classList.toggle("is-fallback", !state.phpAvailable);
        } else if (window.location.protocol === "file:") {
            elements.labsStatus.textContent = "Browser Preview";
            elements.labsStatus.classList.add("is-fallback");
        } else {
            elements.labsStatus.textContent = "PHP Browser";
            elements.labsStatus.classList.remove("is-fallback");
        }
    }

    const filterButtons = [
        `<button class="filter-chip ${state.labsFilter === "all" ? "active" : ""}" type="button" data-lab-filter="all">Tất cả (${totalAll})</button>`,
        ...groups.map((group) => `
            <button class="filter-chip ${state.labsFilter === group.id ? "active" : ""}" type="button" data-lab-filter="${escapeHtml(group.id)}">
                ${escapeHtml(group.title)} (${group.items.length})
            </button>
        `)
    ];
    elements.labsFilters.innerHTML = filterButtons.join("");

    const query = state.labsSearch.trim().toLowerCase();
    const visibleGroups = groups
        .filter((group) => state.labsFilter === "all" || group.id === state.labsFilter)
        .map((group) => {
            const matchedItems = group.items.filter((item) => {
                if (!query) {
                    return true;
                }
                return item.name.toLowerCase().includes(query)
                    || item.path.toLowerCase().includes(query)
                    || group.title.toLowerCase().includes(query);
            });
            return { ...group, items: matchedItems };
        })
        .filter((group) => group.items.length > 0);

    const visibleCount = visibleGroups.reduce((sum, group) => sum + group.items.length, 0);
    if (elements.labsCount) {
        elements.labsCount.textContent = `${visibleCount} bài lab`;
    }

    if (!visibleGroups.length) {
        elements.labsContent.innerHTML = createEmptyMarkup("Không tìm thấy bài lab phù hợp.");
        return;
    }

    elements.labsContent.innerHTML = visibleGroups.map((group) => `
        <section class="lab-group">
            <div class="lab-group-header">
                <h4>${escapeHtml(group.title)}</h4>
                <span class="lab-group-count">${group.items.length} file</span>
            </div>
            <div class="lab-grid">
                ${group.items.map((item) => {
                    const ext = String(item.ext || "").toLowerCase();
                    const rawUrl = buildLabHref(item.path);
                    const canOpenDirectly = state.labServerActive || DIRECT_BROWSER_LAB_EXTS.has(ext);
                    const hrefAttr = canOpenDirectly
                        ? escapeHtml(rawUrl)
                        : `#lab-view-${encodeURIComponent(item.path)}`;
                    const linkAttrs = canOpenDirectly
                        ? `target="_blank" rel="noopener noreferrer"`
                        : `data-lab-preview="1" data-lab-url="${escapeHtml(rawUrl)}" data-lab-path="${escapeHtml(item.path)}" data-lab-ext="${escapeHtml(ext || "file")}"`;

                    return `
                    <a class="lab-card" href="${hrefAttr}" ${linkAttrs}>
                        <div class="lab-card-info">
                            <span class="lab-card-name">${escapeHtml(item.name)}</span>
                            <span class="lab-card-path">labth/${escapeHtml(item.path)}</span>
                        </div>
                        <span class="lab-card-meta">
                            <span class="lab-ext-tag">${escapeHtml(item.ext || "file")}</span>
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </span>
                    </a>
                `;
                }).join("")}
            </div>
        </section>
    `).join("");
}

async function probeLabsEndpoint(baseUrl) {
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    const timeoutMs = baseUrl ? 1200 : 5000;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
        const response = await fetch(`${baseUrl}/api/labs`, {
            headers: { Accept: "application/json" },
            signal: controller ? controller.signal : undefined
        });
        if (!response.ok) {
            return null;
        }
        const contentType = String(response.headers.get("content-type") || "").toLowerCase();
        if (!contentType.includes("application/json")) {
            return null;
        }
        const data = await response.json().catch(() => null);
        if (data && data.serverMode === "express" && Array.isArray(data.groups)) {
            return data;
        }
        return null;
    } finally {
        if (timer) {
            clearTimeout(timer);
        }
    }
}

function getLabEndpointCandidates() {
    if (window.location.protocol === "file:") {
        return ["http://localhost:5000", "http://localhost:5001"];
    }
    const candidates = [""];
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
        for (const base of ["http://localhost:5000", "http://localhost:5001"]) {
            if (base !== window.location.origin) {
                candidates.push(base);
            }
        }
    }
    return candidates;
}

async function loadLabs(force = false) {
    if (state.labsLoaded && !force) {
        renderLabs();
        return;
    }

    const candidates = getLabEndpointCandidates();

    let found = false;
    for (const baseUrl of candidates) {
        try {
            const data = await probeLabsEndpoint(baseUrl);
            if (data) {
                state.labServerActive = true;
                state.labServerBase = baseUrl;
                state.labGroups = data.groups;
                state.phpAvailable = Boolean(data.phpAvailable);
                state.labsLoaded = true;
                found = true;
                break;
            }
        } catch (error) {
            // Try next candidate
        }
    }

    if (!found) {
        state.labServerActive = false;
        state.labServerBase = "";
        state.labGroups = DEFAULT_LAB_GROUPS;
        state.phpAvailable = false;
        state.labsLoaded = true;
    }

    renderLabs();
}

function openLabsModal() {
    if (!elements.labsModal || !elements.labsOverlay) {
        return;
    }
    elements.labsOverlay.classList.add("is-visible");
    elements.labsModal.classList.add("is-open");
    elements.labsModal.setAttribute("aria-hidden", "false");
    syncBodyLock();
    renderLabs();
    loadLabs();
}

function closeLabsModal() {
    if (!elements.labsModal || !elements.labsOverlay) {
        return;
    }
    elements.labsOverlay.classList.remove("is-visible");
    elements.labsModal.classList.remove("is-open");
    elements.labsModal.setAttribute("aria-hidden", "true");
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

        const openLabsTrigger = event.target.closest("[data-open-labs]");
        if (openLabsTrigger) {
            event.preventDefault();
            openLabsModal();
        }

        if (event.target.closest("[data-close-labs]") || event.target.closest("[data-labs-overlay]")) {
            closeLabsModal();
        }

        const labFilterBtn = event.target.closest("[data-lab-filter]");
        if (labFilterBtn) {
            state.labsFilter = labFilterBtn.dataset.labFilter;
            renderLabs();
        }

        const labPreviewCard = event.target.closest("[data-lab-preview]");
        if (labPreviewCard) {
            event.preventDefault();
            openLabPreviewTab(
                labPreviewCard.dataset.labUrl || "",
                labPreviewCard.dataset.labPath || "",
                labPreviewCard.dataset.labExt || "file"
            );
            return;
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
            closeLabsModal();
        }
    });

    if (elements.labsSearch) {
        elements.labsSearch.addEventListener("input", () => {
            state.labsSearch = elements.labsSearch.value;
            renderLabs();
        });
    }

    window.addEventListener("hashchange", () => {
        if (window.location.hash === "#labthweb") {
            openLabsModal();
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

    loadLabs();

    if (window.location.hash === "#labthweb") {
        openLabsModal();
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
