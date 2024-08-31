const express = require('express');
const router = express.Router();
const { handleLogin, handleSignUp } = require('../controllers/authController');

// login route
router.post('/login', handleLogin);

// sign-up route
router.post('/signup', handleSignUp);

module.exports = router;