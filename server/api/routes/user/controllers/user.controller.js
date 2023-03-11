const assert = require('assert');

const { User } = require('../../../../db/Models');
const { hashPassword, validatePassword } = require('../../auth/helpers/passwords.helper');

const getUser = async (req, res, next) => {
	try{
		const user = req.user;
		assert(user, 'Please login again.');

		return res.status(200).json({
			id: user.id,
			username: user.username,
			createdAt: user.createdAt,
			// health info
			sex: user.sex,
			birthday: user.birthday,
			weight: user.weight,
			height: user.height,
			bodyFat: user.bodyFat,
			calorieGoal: user.calorieGoal,
			basicMetabolicRate: user.basicMetabolicRate,
			activityLevel: user.activityLevel
		});
	} catch(err){
		return next(err);
	}
};

// username regex. username must be between 3 and 20 characters long, and can only contain letters, numbers, underscores, and dashes.
const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
const changeUsername = async (req, res, next) => {
	try{
		const user = req.user;
		assert(user, 'Please login again.');

		const { username } = req.body;
		assert(username, 'Please provide a username.');
		assert(usernameRegex.test(username), 'Username must be between 3 and 20 characters long, and can only contain letters, numbers, underscores, and dashes.');
		assert(username !== user.username, 'Your new username must be different than your current username.');

		const usernameExists = await User.methods.findByUsername(username);
		assert(!usernameExists, 'Username already exists.');

		const updated = await User.methods.updateUsername(user.id, username);
		assert(updated, 'Failed to update username.');

		return res.status(200).json({
			success: true
		});
	} catch(err){
		return next(err);
	}
};

// password regex. password must be between 8 and 100 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,100}$/;
const changePassword = async (req, res, next) => {
	try{
		const user = req.user;
		assert(user, 'Please login again.');

		const { password, newPassword, confirmPassword } = req.body;
		assert(password, 'Please provide your current password.');
		assert(newPassword, 'Please provide a new password.');
		assert(confirmPassword, 'Please confirm your new password.');
		assert(passwordRegex.test(newPassword), 'New password must be between 8 and 100 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
		assert(newPassword === confirmPassword, 'New password and confirm password do not match.');
		assert(newPassword !== password, 'New password must be different than your current password.');
		// validate current password
		const validPassword = await validatePassword(password, user.password);
		assert(validPassword, 'Invalid password.');
		// hash new password
		const hashedPassword = await hashPassword(newPassword);
		assert(hashedPassword, 'Failed to hash new password.');
		// update password
		const updated = await User.methods.updatePassword(user.id, hashedPassword);
		assert(updated, 'Failed to update password.');

		return res.status(200).json({
			success: true
		});
	} catch(err){
		return next(err);
	}
};

module.exports = {
	getUser,
	changeUsername,
	changePassword
};