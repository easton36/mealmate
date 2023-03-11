const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
    _id: {
        type: String,
        required: true
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
    },
	// health info
	sex: {
		type: String,
		enum: ['male', 'female']
	},
	birthday: {
		type: Date
	},
	weight: {
		unit: {
			type: String,
			enum: ['kg', 'lbs'],
			default: 'lbs'
		},
		value: {
			type: Number
		},
		lastUpdated: {
			type: Date
		}
	},
	height: {
		unit: {
			type: String,
			enum: ['cm', 'in'],
			default: 'in'
		},
		value: {
			type: Number
		},
		lastUpdated: {
			type: Date
		}
	},
	bodyFat: {
		value: {
			type: Number
		},
		lastUpdated: {
			type: Date
		}
	},
	calorieGoal: {
		type: Number
	},
	basicMetabolicRate: {
		formula: {
			type: String,
			enum: ['Harris-Benedict', 'Mifflin-St. Jeor', 'Katch-McArdle'],
			default: 'Mifflin-St. Jeor'
		},
		value: {
			type: Number
		},
	},
	activityLevel: {
		value: {
			type: Number,
		},
		preset: {
			type: String,
			enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Custom'],
			default: 'Sedentary'
		}
	}
}, {
    timestamps: true
}));