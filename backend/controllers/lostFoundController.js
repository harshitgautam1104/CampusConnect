const LostFound = require('../models/LostFound');

// 1. Report an item
exports.addItem = async (req, res) => {
    try {
        const newItem = new LostFound({
            ...req.body,
            postedBy: req.user.id
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error reporting item" });
    }
};

// 2. Get all items
exports.getItems = async (req, res) => {
    try {
        const items = await LostFound.find().populate('postedBy', 'name').sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items" });
    }
};