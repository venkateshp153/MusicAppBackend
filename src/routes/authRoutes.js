const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { validateSignup, validateLogin, checkValidation } = require('../utils/validation');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', validateSignup, checkValidation, registerUser);
router.post('/signin', validateLogin, checkValidation, loginUser);
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;