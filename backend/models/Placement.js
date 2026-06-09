const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    jobRole: { type: String, required: true },
    package: { type: String, required: true }, // e.g., 5 LPA
    eligibility: { type: String, required: true }, // e.g., CS/IT 75%
    deadline: { type: String, required: true },
    applyLink: { type: String, default: '' },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Placement', placementSchema);