const express = require('express');
const router = express.Router();
const { addItem, getItems } = require('../controllers/lostFoundController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getItems);
router.post('/', protect, addItem);

module.exports = router;
