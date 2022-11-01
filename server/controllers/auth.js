const User = require("../models/newUser");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//desc    login User
//route   post /api/v1/auth/login
//public

exports.login = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log("body of login is ",req.body)
  //validate with email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  //check user
  const user = await User.findOne({ email }).select("+password");

  //to compare current token with previous one
  if(req.body.token){
    var fcm = await User.find({fcmTokens:{$in:[req.body.token]}, email:req.body.email});
     console.log("fcm ~",fcm)
     if(!fcm.length){
    var token = await User.updateOne(
      { _id: user._id },
      { $push: { fcmTokens: req.body.token } }
   )
     }
  }

  // console.log("token save ", token);

  if (!user) {
    return next(new ErrorResponse("Invalid  Credential", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid  Credential", 401));
  }
  if (user.status === "Inactive") {
    return next(new ErrorResponse("Status is Inactive", 401));
  }

  SendTokenResponse(user, 200, res);
});

//desc    Admin Login (for Attendance)
//route   post /api/v1/auth/login/admin
//public   only to admin

exports.attLogin = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  // if (req.user.role == "admin") {
  //   console.log("Admin here");
  // }
  //validate with email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  //check user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid  Credential", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid  Credential", 401));
  }
  if (user.status === "Inactive") {
    return next(new ErrorResponse("Status is Inactive", 401));
  }
  //kfjdkjfdkj
  if (user.role === "admin") {
    console.log("Admin here");
  } else {
    console.log("role is ", user.role);
    user.isWFH = "true";
    user.save();
  }
  SendTokenResponse(user, 200, res);
});

exports.portalLogin = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  //validate with email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  //check user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid  Credential", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid  Credential", 401));
  }

  if (user.status === "Inactive") {
    return next(new ErrorResponse("Status is Inactive", 401));
  }

  if (user.role === "employee") {
    return next(new ErrorResponse("Your role is Employee", 401));
  }

  SendTokenResponse(user, 200, res);
});

//desc    get logout and clear cookie
//route   Get /api/v1/auth/logout
//private -- need token

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});


//get token from model , creatte cookie and send response
const SendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
};
