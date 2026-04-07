const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "change-this-secret");
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Invalid authentication token." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access." });
    }
};
