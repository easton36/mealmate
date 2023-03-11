const express = require('express');
const router = express.Router();

const passport = require('../../middlewear/passport.middlewear');
const { getUser } = require('./controllers/user.controller');

router.get('/', passport.authenticate('jwt', { session: false }), getUser); // /api/user

module.exports = router;