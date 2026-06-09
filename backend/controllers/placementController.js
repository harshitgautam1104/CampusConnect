const Placement = require('../models/Placement');

// 1. Add Placement (Admin Only)
exports.addPlacement = async (req, res) => {
    try {
        const placement = new Placement(req.body);
        await placement.save();
        res.status(201).json(placement);
    } catch (error) {
        res.status(500).json({ message: "Error adding placement" });
    }
};

// 2. Get All Placements (Everyone)
exports.getPlacements = async (req, res) => {
    try {
        const placements = await Placement.find().sort({ createdAt: -1 });
        res.json(placements);
    } catch (error) {
        res.status(500).json({ message: "Error fetching placements" });
    }
};