const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/newUser");


//to protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // separating bearer word from token adn saving token in "token"
    // } else if (req.cookies.token) {
    //   token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse("Not Authorized", 401));
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("Please login Again", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized", 401));
  }
});

//grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User  role ${req.user.role} is not Authorized`, 401)
      );
    }
    next();
  };
};

//grant module  to specific offices
exports.moduleSelection = (model) => {
  return asyncHandler(async (req, res, next) => {
    var office = await Office.findById(req.user.officeId);
    // console.log("office is", office);
    if (model === Attendance) {
      if (!office.attendance) {
        return next(new ErrorResponse(`Unauthorized: Access is denied `, 401));
      }
    } else if (
      model === Rewards ||
      model === EmployeeOfTheMonth ||
      model === employeeOfTheDay
    ) {
      if (!office.rewardSystem) {
        return next(new ErrorResponse(`Unauthorized: Access is denied `, 401));
      }
    } else if (model === Poll) {
      if (!office.voting) {
        return next(new ErrorResponse(`Unauthorized: Access is denied `, 401));
      }
    } else if (model === LeaveRequest) {
      if (!office.leaveManagement) {
        return next(new ErrorResponse(`Unauthorized: Access is denied `, 401));
      }
    } else if (model === Grade) {
      if (!office.payroll) {
        return next(new ErrorResponse(`Unauthorized: Access is denied `, 401));
      }
    }

    // if (!roles.includes(req.user.role)) {
    //   return next(
    //     new ErrorResponse(`User  role ${req.user.role} is not Authorized`, 401)
    //   );
    // }
    next();
  });
};
