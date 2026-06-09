const Discussion = require('../models/Discussion');

// 1. Post a new message
exports.createPost = async (req, res) => {
    try {
        const post = new Discussion({
            user: req.user.id,
            content: req.body.content
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
};

// 2. Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Discussion.find()
            .populate('user', 'name role')
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};