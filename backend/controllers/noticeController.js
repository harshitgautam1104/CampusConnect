const Notice = require('../models/Notice');

// 1. Create Notice (Sirf Admin/Faculty)
exports.createNotice = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const notice = new Notice({
            title,
            description,
            category,
            createdBy: req.user.id // Middleware se user id milegi
        });
        await notice.save();
        res.status(201).json(notice);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 2. Get All Notices (Sab dekh sakte hain)
exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().populate('createdBy', 'name role').sort({ createdAt: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};