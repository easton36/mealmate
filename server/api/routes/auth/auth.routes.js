const express = require('express');
const router = express.Router();

const { login, register } = require('./controllers/auth.controller');

express.post('/login', login); // /api/auth/login
express.post('/register', register); // /api/auth/register

module.exports = router;