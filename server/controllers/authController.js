const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
    username,
    email,
    password: hashedPassword,
    });

    res.status(201).json({
        message: "User created successfully",
        token: generateToken(user._id),
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
  
      const isMatch = await bcrypt.compare(
        password,
        user.password
      );
  
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
  
      res.status(200).json({
        message: "Login successful",
        token: generateToken(user._id),
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
  signup,
  login,
  getMe,
};