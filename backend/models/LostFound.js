const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Lost', 'Found'], 
        required: true 
    },
    location: { type: String, required: true }, // Kahan khoya ya mila
    contactInfo: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);