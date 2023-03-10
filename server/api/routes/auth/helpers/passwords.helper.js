const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    return hash;
};

const validatePassword = async (password, hash) => {
    const valid = await bcrypt.compare(password, hash);

    return valid;
};

module.exports = {
    hashPassword,
    validatePassword
};