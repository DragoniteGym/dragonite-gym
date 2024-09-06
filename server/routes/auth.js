const express = require('express');
const router = express.Router();
const { handleLogin, handleSignUp, handleLogout, handleSession } = require('../controllers/authController');

// login route
router.post('/login', handleLogin);

// sign-up route
router.post('/signup', handleSignUp);

// logout route
router.post('/logout', handleLogout);

// session route
router.get('/session', handleSession);




module.exports = router;