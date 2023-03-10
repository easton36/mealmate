const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { // bcrypt hash
        type: String,
        required: true
    },
    
    firstIp: { // ip address used when the user signed up
        type: String,
        required: true
    },
    latestIp: { // ip address used on the latest login
        type: String,
        required: true
    },
    latestLogin: { // date of the latest login
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: true
}));