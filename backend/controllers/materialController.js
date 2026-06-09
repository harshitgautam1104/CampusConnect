const Material = require('../models/Material');

// 1. Upload Material
exports.uploadMaterial = async (req, res) => {
    try {
        const { title, subject } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a file" });
        }

        const material = new Material({
            title,
            subject,
            fileUrl: req.file.path, // Multer file path deta hai
            uploadedBy: req.user.id
        });

        await material.save();
        res.status(201).json(material);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Get All Materials
exports.getMaterials = async (req, res) => {
    try {
        const materials = await Material.find().populate('uploadedBy', 'name');
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};