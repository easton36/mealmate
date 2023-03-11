const assert = require('assert');
const { v4: uuid } = require('uuid');

const { hashPassword, validatePassword } = require('../helpers/passwords.helper');
const { generateJwt } = require('../helpers/jwt.helper');
const { User } = require('../../../../db/Models');
const { SERVER } = require('../../../../config');

const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;

        assert(username, 'Username is required.');
        assert(password, 'Password is required.');

        const user = await User.methods.findByUsername(username);
        assert(user, 'Invalid username or password.');
        const validPassword = await validatePassword(password, user.password);
        assert(validPassword, 'Invalid username or password.');

        const token = await generateJwt(user._id);
        const ip = (req.headers['CF-Connecting-IP'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress).replace('::ffff:', '');

        res.cookie('token', token, {
			httpOnly: false,
			signed: false,
			domain: SERVER.DOMAIN,
			secure: true
		});
        res.setHeader('Authorization', 'Bearer ' + token);

        // update latest login
        User.methods.latestLogin(user._id, { ip, date: new Date().toJSON() });

        console.log(`[API] [${user._id}] Logged in. IP: ${ip}`);

        return res.status(200).json({
            success: true,
            token,
            data: {
                _id: user._id,
                username: user.username,
                createdAt: user.createdAt
            }
        });
    } catch(err){
        return next(err);
    }
};

// username regex. username must be between 3 and 20 characters long, and can only contain letters, numbers, underscores, and dashes.
const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
// password regex. password must be between 8 and 100 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,100}$/;

const register = async (req, res, next) => {
    try{
        const { username, password, confirmPassword } = req.body;

        assert(username, 'Username is required.');
        assert(password, 'Password is required.');
        assert(usernameRegex.test(username), 'Username must be between 3 and 20 characters long, and can only contain letters, numbers, underscores, and dashes.');
        assert(passwordRegex.test(password), 'Password must be between 8 and 100 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        assert(password === confirmPassword, 'Passwords do not match.');
        // make sure a user doesnt already have this username
        const userExists = await User.methods.findByUsername(username);
        assert(!userExists, 'Please choose a different username.');
        
        const hashedPassword = await hashPassword(password);
        const userId = uuid();
        const ip = (req.headers['CF-Connecting-IP'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress).replace('::ffff:', '');
        // create user
        const user = await User.create({
            _id: userId,
            username,
            password: hashedPassword,
            firstIp: ip,
            latestIp: ip,
            latestLogin: new Date().toJSON()
        });
        // make sure user was created
        assert(user, 'An error occurred while creating your account. Please try again.');

        // create JWT
        const token = await generateJwt(userId);
        res.cookie('token', token, {
			httpOnly: false,
			signed: false,
			domain: SERVER.DOMAIN,
			secure: true
		});
        res.setHeader('Authorization', 'Bearer ' + token);

        return res.status(200).json({
            success: true,
            token,
            data: {
                _id: user._id,
                username: user.username,
                createdAt: user.createdAt
            }
        });
    } catch(err){
        return next(err);
    }
};

const logout = async (req, res, next) => {
	try{
		res.clearCookie('token', {
			httpOnly: false,
			signed: false,
			domain: SERVER.DOMAIN,
			secure: true
		});
		res.setHeader('Authorization', '');

		return res.status(200).json({
			success: true
		});
	} catch(err){
		return next(err);
	}
};

module.exports = {
    login,
    register,
	logout
};