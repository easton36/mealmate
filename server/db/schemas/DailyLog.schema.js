const mongoose = require('mongoose');

module.exports = mongoose.model('dailyLogs', new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    userId: { // what user this log belongs to
        type: String,
        required: true
    },
    startTime: { // what date this log starts applying at
        type: Date,
        required: true
    },
    endTime: { // what date this log ends applying at
        type: Date,
        required: true
    }
}, {
    timestamps: true
}));