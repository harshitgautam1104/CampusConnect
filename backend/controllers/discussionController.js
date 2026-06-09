const Discussion = require('../models/Discussion');

// 1. Naya Post banayein
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

// 2. Saare Posts laayein (With User details)
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

// 3. Like/Unlike Feature
exports.toggleLike = async (req, res) => {
    try {
        const post = await Discussion.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Purane posts ke liye safety check (agar likes array nahi hai toh)
        if (!post.likes) post.likes = [];

        if (post.likes.includes(req.user.id)) {
            // Agar pehle se like hai toh remove karo (Unlike)
            post.likes = post.likes.filter(id => id.toString() !== req.user.id.toString());
        } else {
            // Naya like add karo
            post.likes.push(req.user.id);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Like action failed", error: error.message });
    }
};

// 4. Reply Feature
exports.addReply = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Discussion.findById(req.params.id);
        
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Purane posts ke liye safety check
        if (!post.replies) post.replies = [];

        const newReply = {
            user: req.user.id,
            userName: req.user.name,
            text: text,
            createdAt: new Date()
        };

        post.replies.push(newReply);
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Reply action failed", error: error.message });
    }
};