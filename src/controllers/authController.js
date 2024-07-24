
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User')


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  };
  
  exports.registerUser = async (req, res) => {
    const { username, email, phone, password } = req.body;
  
    try {
      const emailExists = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });
      const phoneExists = await User.findOne({ phone });
  
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      if (phoneExists) {
        return res.status(400).json({ message: 'Phone number already in use' });
      }
      const user = await User.create({ username, email, phone, password });
  
      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };