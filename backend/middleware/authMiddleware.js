const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check karo agar header mein token hai
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN" mein se token nikalo
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // User ka data request mein daal do (password chhod kar)
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

// Sirf Admin ke liye check
const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'faculty')) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an Admin/Faculty" });
    }
};

module.exports = { protect, adminOnly };