const express = require('express');
const router = express.Router();

const passport = require('../middlewear/passport.middlewear');

const AuthRoutes = require('./auth/auth.routes');

router.use(passport.initialize());

router.get('/', (req, res) => {
	return res.status(200).json({
		name: 'MealMate API',
		author: {
			name: 'Easton Schram',
			github: 'https://github.com/easton36'
		}
	});
});

router.use('/auth', AuthRoutes);

module.exports = router;