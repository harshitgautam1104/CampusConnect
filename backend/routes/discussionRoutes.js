const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/discussionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.post('/', protect, createPost); // Sirf logged in user post kar sakta hai

module.exports = router;