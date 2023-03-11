const express = require('express');
const router = express.Router();

const passport = require('../../middlewear/passport.middlewear');
const { login, register, logout } = require('./controllers/auth.controller');

router.post('/login', login); // /api/auth/login
router.post('/register', register); // /api/auth/register
router.get('/logout', passport.authenticate('jwt', { session: false }), logout); // /api/auth/logout

module.exports = router;