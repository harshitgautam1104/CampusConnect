const express = require('express');
const router = express.Router();
const { createNotice, getNotices } = require('../controllers/noticeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Route: /api/notices (Sare notices dekhne ke liye)
router.get('/', getNotices);

// Route: /api/notices (Sirf logged in admin/faculty notice create kar sakta hai)
router.post('/', protect, adminOnly, createNotice);

module.exports = router;