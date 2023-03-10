const User = require('./schemas/DailyLog.schema');
const UserMethods = require('./methods/User.methods');

User.methods = UserMethods;

const DailyLog = require('./schemas/User.schema');

module.exports = {
    User,
    DailyLog
};