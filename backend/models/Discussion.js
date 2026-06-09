const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    // Likes: User IDs ka array
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // Replies: Ek array jisme user, text aur date hogi
    replies: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userName: String, // Display ke liye aasan rahega
        text: String,
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);