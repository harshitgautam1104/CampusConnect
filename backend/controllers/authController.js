const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User Registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check agar user pehle se hai
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Password ko hash (encrypt) karna
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // --- RANDOM DATA GENERATION LOGIC ---
        
        // 1. Unique Mobile Number (Starting with 9)
        const randomMobile = "9" + Math.floor(100000000 + Math.random() * 900000000);

        // 2. Enrollment / Job ID Logic
        let generatedId = "";
        if (role === 'admin' || role === 'faculty') {
            // Admin/Faculty ke liye Job ID (e.g. EMP123456)
            generatedId = "EMP" + Math.floor(100000 + Math.random() * 900000);
        } else {
            // Student ke liye Enrollment ID (e.g. CC20251234)
            generatedId = "CC2025" + Math.floor(1000 + Math.random() * 9000);
        }

        // -------------------------------------

        // Naya user create karna (Sare fields ke saath)
        user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role,
            mobile: randomMobile,    // New Field
            uniqueId: generatedId    // New Field
        });
        
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User ko find karna
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // Password check karna
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // JWT Token banana
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        // Response mein mobile aur uniqueId bhi bhej rahe hain frontend ke liye
        res.json({
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                role: user.role,
                mobile: user.mobile,
                uniqueId: user.uniqueId
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};