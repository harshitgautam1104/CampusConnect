const express = require('express');
const router = express.Router();
const { 
    createPost, 
    getPosts, 
    toggleLike, 
    addReply 
} = require('../controllers/discussionController');
const { protect } = require('../middleware/authMiddleware');

// Sab dekh sakte hain
router.get('/', getPosts);

// Sirf logged-in users ke liye
router.post('/', protect, createPost);
router.post('/like/:id', protect, toggleLike);
router.post('/reply/:id', protect, addReply);

module.exports = router;