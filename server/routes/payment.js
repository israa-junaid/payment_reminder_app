const express = require("express");
const {
    createPayment,
    deletePayment,
    getPayment,
    editPayment,
    updateStatus
    ,getPayments
} = require("../controllers/payment");
const Payment = require("../models/payment");
const advanceResults = require("../middleware/advanceResults");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(
    protect,
    advanceResults(Payment,{
      path:"userId",
      select:"email username"
    }),
    getPayments
  )
  .post(protect, createPayment);
  router
  .route("/:id")
  .get(protect, getPayment)
  .put(protect, editPayment);

router.route("/:id/status").put(protect, updateStatus);
  router.route("/:id/delete").put(protect,deletePayment);

module.exports = router;
