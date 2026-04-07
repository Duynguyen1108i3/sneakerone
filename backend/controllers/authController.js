const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { serializeUser } = require("../utils/serializers");

function createToken(userId) {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || "change-this-secret",
        { expiresIn: "7d" }
    );
}

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        if (String(password).length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registration successful.",
            token: createToken(user._id.toString()),
            user: serializeUser(user)
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to register user." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        res.json({
            message: "Login successful.",
            token: createToken(user._id.toString()),
            user: serializeUser(user)
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to login." });
    }
};

exports.getMe = async (req, res) => {
    res.json({
        user: serializeUser(req.user)
    });
};
