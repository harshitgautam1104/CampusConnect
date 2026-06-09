const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/User');
const Event = require('../models/Event');
const { protect } = require('../middleware/authMiddleware');

// Route: /api/auth/register
router.post('/register', registerUser);

// Route: /api/auth/login
router.post('/login', loginUser);
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        // Un events ko dhundo jahan ye user 'participants' list mein hai
        const myEvents = await Event.find({ participants: req.user.id });
        
        res.json({ user, myEvents });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});

module.exports = router;