const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require:[true,"Username is required"]
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      // unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    fcmTokens:[
      String
    ],
    password: {
      type: String,
      required: [true, "please add a password"],
      minlength: 6,
      select: false, // donot return pass on get request
    },
  },
  {timestamps:true}
);


//encrypt pass
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign JWT and return
//user login and its activity--access to user id
// static called on model
//method called on what you get from model
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//match user entered and hashed pass
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //expire in 10 minutes

  return resetToken;
};


module.exports = mongoose.model("User", UserSchema);

