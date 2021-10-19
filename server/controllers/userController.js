const User = require("../models/user");
const asyncHandler = require("express-async-handler"); //this handles errors
const generateToken = require("../utils/generateToken");

//registration
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const createdUser = new User({
    username: username,
    email: email,
    password: password,
  });
  const userExists = await User.findOne({ email });
  //if the user already exists,throw an error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const savedUser = await createdUser.save();

  if (savedUser) {
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      token: generateToken(savedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured");
  }
});

//LogIn
const loggingInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
module.exports = { registerUser, loggingInUser };
