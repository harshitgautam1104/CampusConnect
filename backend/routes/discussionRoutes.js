const express = require('express');
const router = express.Router();
const { createPost, getPosts, toggleLike, addReply } = require('../controllers/discussionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.post('/like/:id', protect, toggleLike);
router.post('/reply/:id', protect, addReply); // Sirf logged in user post kar sakta hai

module.exports = router;