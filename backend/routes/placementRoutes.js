const express = require('express');
const router = express.Router();
const { addPlacement, getPlacements } = require('../controllers/placementController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getPlacements);
router.post('/', protect, adminOnly, addPlacement);

module.exports = router;