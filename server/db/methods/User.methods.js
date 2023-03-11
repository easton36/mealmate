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
}

module.exports = {
    findByUsername,
    latestLogin
};