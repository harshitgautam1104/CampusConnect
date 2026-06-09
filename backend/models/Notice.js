const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'General' }, // e.g., Exam, Holiday, Placement
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Ye User model se link hai
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);