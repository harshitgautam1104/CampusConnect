const express = require('express');
const router = express.Router();
const { uploadMaterial, getMaterials } = require('../controllers/materialController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Route: Get all materials
router.get('/', getMaterials);

// Route: Upload material (Sirf Admin/Faculty aur file upload ka middleware)
router.post('/upload', protect, adminOnly, upload.single('file'), uploadMaterial);

module.exports = router;