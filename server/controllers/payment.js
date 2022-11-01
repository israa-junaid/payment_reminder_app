const User = require("../models/newUser");
const Payment = require("../models/payment")
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc  Get all payments
// @route Get /api/v1/payment
// private - accces to user

exports.getPayments = asyncHandler(async (req, res, next) => {
  if (req.user.status === "Inactive") {
    return next(new ErrorResponse(`Your status is Inactive`, 404));
  }
  res.status(200).json(res.advanceResults);
});
// @desc  Create Payment
// @route POST /api/v1/payment
// private - accces to User
exports.createPayment = asyncHandler(async (req, res, next) => {
    req.body.userId = req.user._id;
    var payment = await Payment.create(req.body);
    res.status(201).json({
      success: true,
      data: payment,
    });
});
// @desc  Get single Payment
// @route Get /api/v1/payment/:id
// private - accces to User

exports.getPayment = asyncHandler(async (req, res, next) => {
    var payment = await Payment.findById(req.params.id);
    if (!payment) {
      return next(
        new ErrorResponse(`payment not found of id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: payment,
    });
  });
// @desc  Edit Payment
// @route Put /api/v1/payment/:id
// private - accces to User

exports.editPayment = asyncHandler(async (req, res, next) => {
    let payment = await Payment.findById(req.params.id);
    if (!payment) {
      return next(
        new ErrorResponse(`payment not found of id ${req.params.id}`, 404)
      );
    }
    if (payment.status === "Deleted") {
      return next(new ErrorResponse(`Payment is deleted`, 404));
    }
    payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      data: payment,
    });
  });
  // @desc  Soft delete any payment
// @route PUT /api/v1/payment/:id/delete
// private - accces to User
exports.updateStatus = asyncHandler(async (req, res, next) => {
    let payment = await Payment.findById(req.params.id);
  
    if (!payment) {
      return next(
        new ErrorResponse(`Payment not found of id ${req.params.id}`, 404)
      );
    }
    if(payment.status === req.body.status){
      return next(
        new ErrorResponse(`Payment status is already ${req.body.status}`, 400)
      );
    }
    payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status:req.body.status },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, data: payment });
  });
  


// @desc  Soft delete any payment
// @route PUT /api/v1/payment/:id/delete
// private - accces to User
exports.deletePayment = asyncHandler(async (req, res, next) => {
    let payment = await Payment.findById(req.params.id);
  
    if (!payment) {
      return next(
        new ErrorResponse(`Payment not found of id ${req.params.id}`, 404)
      );
    }
    payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: "Deleted" },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, data: payment });
  });
  

