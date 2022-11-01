const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const PaymentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require:[true,"Title is required"]
    },
    description: {
        type: String,
        require:[true,"Description is required"]
      },
    dueDate:{
        type:Date
    },
    status:{
        type: String,
        enum: ["Paid", "Unpaid","Deleted"],
        default: "Unpaid",
    },
    userId:{
        type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "UserId is required"],
    }
  },
  {timestamps:true}
);




module.exports = mongoose.model("Payment", PaymentSchema);

