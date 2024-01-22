const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  NOT_FOUND,
  BAD_REQUEST
} = require("../constants");

//@desc User login
//@route POST /api/v1/user/login
//@access public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error("Both username and password is required");
  }

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m"
      }
    );

    res.status(200).json({
      accessToken: accessToken
    });
  } else {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error("Invalid username or password");
  }
});

//@desc New user registration
//@route POST /api/v1/user/register
//@access public
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Requested body:", req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } else {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error("Invalid user details");
  }
});

//@desc Get all users
//@route GET /api/v1/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users.length === 0) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error("No users found");
  }

  res.status(200).json({
    users: users
  });
});

//@desc Get current user
//@route GET /api/v1/user/current
//@access public
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req?.user
  });
});

//@desc Get user by username
//@route GET /api/v1/user/:username
//@access public
const getUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`User ${req.params.username} not found`);
  }

  res.status(200).json({
    user: user
  });
});

//@desc Delete a user
//@route DELETE /api/v1/user/:username
//@access public
const deleteUserByUsername = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({ username: req.params.username });

  if (!user) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`User ${req.params.username} not found`);
  }

  res.status(200).json({
    message: `Deactivated account of user ${req.params.username}`
  });
});

module.exports = {
  login,
  register,
  getUsers,
  getCurrentUser,
  getUserByUsername,
  deleteUserByUsername
};
