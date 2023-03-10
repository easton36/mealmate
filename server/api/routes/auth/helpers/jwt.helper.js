const jwt = require('jsonwebtoken');

const generateJwt = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

module.exports = {
    generateJwt
};