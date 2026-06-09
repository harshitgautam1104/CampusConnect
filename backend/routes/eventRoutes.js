const express = require('express');
const router = express.Router();
const { createEvent, getEvents, registerForEvent } = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.post('/', protect, adminOnly, createEvent);
router.post('/register/:id', protect, registerForEvent); // Register hone ke liye route

module.exports = router;