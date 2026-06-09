const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true }, // File ka path yahan save hoga
    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);