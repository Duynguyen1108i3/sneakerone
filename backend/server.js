require("dotenv").config();

const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Product = require("./models/Product");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const {
    scanLabDirectory,
    startPhpServer,
    stopPhpServer,
    createLabMiddleware
} = require("./utils/labServer");

const app = express();
const PORT = process.env.PORT || 5000;
const API_PREFIXES = ["/api", "/register", "/login", "/me", "/products", "/cart", "/order", "/orders", "/wishlist"];

let mongoServer;

const seedProducts = [
    {
        name: "Vans - Old Skool 36 DX",
        brand: "Vans",
        price: 100,
        image: "/images/sneaker/download-removebg-preview.png",
        category: "Vans",
        description: "The iconic Old Skool in a daily black-and-white setup made for easy styling.",
        colors: ["Black", "White"],
        sizes: [
            { label: "38", stock: 5 },
            { label: "39", stock: 4 },
            { label: "40", stock: 6 },
            { label: "41", stock: 3 }
        ],
        rating: 4.9,
        reviews: 205,
        featured: true,
        isNewArrival: true
    },
    {
        name: "Vans - Old Skool Checkerboard",
        brand: "Vans",
        price: 108,
        image: "/images/sneaker/vanscaro.png",
        category: "Vans",
        description: "Checkerboard energy for standout streetwear fits with a timeless low-cut profile.",
        colors: ["Black", "White"],
        sizes: [
            { label: "38", stock: 2 },
            { label: "39", stock: 5 },
            { label: "40", stock: 5 },
            { label: "41", stock: 4 }
        ],
        rating: 4.8,
        reviews: 164,
        featured: true,
        isNewArrival: false
    },
    {
        name: "Vans - Classic SK8-Hi",
        brand: "Vans",
        price: 115,
        image: "/images/sneaker/vanshigh.png",
        category: "Vans",
        description: "High-top comfort with extra ankle support and a bold vintage skate silhouette.",
        colors: ["Black", "White"],
        sizes: [
            { label: "39", stock: 6 },
            { label: "40", stock: 3 },
            { label: "41", stock: 4 },
            { label: "42", stock: 2 }
        ],
        rating: 4.9,
        reviews: 206,
        featured: false,
        isNewArrival: true
    },
    {
        name: "Converse Chuck Taylor All Star Low Top",
        brand: "Converse",
        price: 95,
        image: "/images/sneaker/convlow.png",
        category: "Converse",
        description: "An everyday canvas legend with a low-top build that works across casual looks.",
        colors: ["Black", "White"],
        sizes: [
            { label: "38", stock: 6 },
            { label: "39", stock: 6 },
            { label: "40", stock: 4 },
            { label: "41", stock: 5 }
        ],
        rating: 4.8,
        reviews: 188,
        featured: true,
        isNewArrival: false
    },
    {
        name: "Converse Chuck Taylor All Star High Top",
        brand: "Converse",
        price: 102,
        image: "/images/sneaker/convhigh.png",
        category: "Converse",
        description: "The classic high-top Chuck with timeless lines and all-day wearable comfort.",
        colors: ["Black", "White"],
        sizes: [
            { label: "39", stock: 3 },
            { label: "40", stock: 4 },
            { label: "41", stock: 4 },
            { label: "42", stock: 5 }
        ],
        rating: 4.9,
        reviews: 196,
        featured: false,
        isNewArrival: true
    },
    {
        name: "Converse x Naruto Chuck Taylor All Star",
        brand: "Converse",
        price: 129,
        image: "/images/sneaker/convcollab.png",
        category: "Converse",
        description: "A collectible orange-and-black collaboration pair designed to lead every outfit.",
        colors: ["Orange", "Black"],
        sizes: [
            { label: "39", stock: 2 },
            { label: "40", stock: 3 },
            { label: "41", stock: 2 },
            { label: "42", stock: 1 }
        ],
        rating: 5,
        reviews: 91,
        featured: true,
        isNewArrival: true
    }
];

async function connectDatabase() {
    if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB using MONGODB_URI.");
        return;
    }

    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    console.log("Connected to in-memory MongoDB.");
}

async function seedProductsIfNeeded() {
    for (const product of seedProducts) {
        await Product.findOneAndUpdate(
            { name: product.name },
            product,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }

    console.log("Product catalog is ready.");
}

async function seedAdminIfNeeded() {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@toxi.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
        if (existingAdmin.role !== "admin") {
            existingAdmin.role = "admin";
            await existingAdmin.save();
        }

        return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
        name: "TOXI Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
    });

    console.log(`Seeded admin account: ${adminEmail}`);
}

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use("/labth", createLabMiddleware());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 250,
    standardHeaders: true,
    legacyHeaders: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "../frontend/images")));
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/labs", (req, res) => {
    res.json(scanLabDirectory());
});

app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(wishlistRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.use((req, res, next) => {
    const isApiRoute = API_PREFIXES.some((prefix) => req.path.startsWith(prefix));

    if (!isApiRoute && req.method === "GET") {
        return res.sendFile(path.join(__dirname, "../frontend/index.html"));
    }

    next();
});

app.use(notFound);
app.use(errorHandler);

async function startServer() {
    try {
        startPhpServer();
        await connectDatabase();
        await seedProductsIfNeeded();
        await seedAdminIfNeeded();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

async function shutdown() {
    stopPhpServer();
    await mongoose.connection.close();

    if (mongoServer) {
        await mongoServer.stop();
    }

    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
