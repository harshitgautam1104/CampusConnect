const Discussion = require('../models/Discussion');

// 1. Like/Unlike Post
exports.toggleLike = async (req, res) => {
    try {
        const post = await Discussion.findById(req.params.id);
        if (post.likes.includes(req.user.id)) {
            // Agar pehle se like hai toh remove karo
            post.likes = post.likes.filter(id => id.toString() !== req.user.id);
        } else {
            // Warna add karo
            post.likes.push(req.user.id);
        }
        await post.save();
        res.json(post);
    } catch (error) { res.status(500).json({ message: "Error" }); }
};

// 2. Reply to Post
exports.addReply = async (req, res) => {
    try {
        const post = await Discussion.findById(req.params.id);
        const reply = {
            user: req.user.id,
            userName: req.user.name,
            text: req.body.text
        };
        post.replies.push(reply);
        await post.save();
        res.json(post);
    } catch (error) { res.status(500).json({ message: "Error" }); }
};