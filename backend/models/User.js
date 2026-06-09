const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, unique: true },
    uniqueId: { type: String, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['student', 'admin', 'faculty'], // In teeno mein se hi ek hona chahiye
        default: 'student' 
    },
    profileImage: { type: String, default: '' }
}, { timestamps: true }); // Isse 'createdAt' aur 'updatedAt' apne aap ban jayenge

module.exports = mongoose.model('User', userSchema);