const User = require('../schemas/User.schema');

const findByUsername = async (username) => {
    const user = await User.findOne({ username });

    return user;
};

const latestLogin = async (userId, { ip, date }) => {
    const updated = await User.updateOne({ _id: userId }, { $set: {
        latestIp: ip,
        latestLogin: date
    }});

    return updated;
};

const updateUsername = async (userId, username) => {
	const updated = await User.updateOne({ _id: userId }, { $set: {
		username
	}});

	return updated;
};

const updatePassword = async (userId, password) => {
	const updated = await User.updateOne({ _id: userId }, { $set: {
		password
	}});

	return updated;
};

module.exports = {
    findByUsername,
    latestLogin,
	updateUsername,
	updatePassword
};