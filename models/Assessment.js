const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
    distress: Number,
    coping: Number,
    motivation: Number,
    riskLevel: {
        type: String,
        enum: ["NO_RISK", "MODERATE", "HIGH_RISK"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Assessment", assessmentSchema);
