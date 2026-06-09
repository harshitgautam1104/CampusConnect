const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Kaun-kaun like kar raha hai
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);