const User = require("../models/newUser");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");


exports.createUser = asyncHandler(async (req, res, next) => {
  let body = req.body;
  console.log("body",req.body)
  var user = await User.create(req.body);
  console.log("Create user is ", user);
  
  res.status(201).json({ success: true, data: user });
});

exports.saveToken = asyncHandler(async (req, res, next) => {
  let body = req.body;
  console.log("req.user iss",req.user);
  console.log("body is",req.body)
  var token = await User.updateOne(
    { _id: req.user._id },
    { $push: { fcmTokens: req.body.token } }
 )
  console.log("token save ", token);
  
  res.status(201).json({ success: true, data: token });
});

