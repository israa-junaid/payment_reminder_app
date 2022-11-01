const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const advanceResults = require("../middleware/advanceResults");
const User = require("../models/User");

const {
  createUser,
  saveToken
} = require("../controllers/user");


router
  .route("/")
  .post(createUser);
  router
  .route("/token")
  .post(
    protect,
    saveToken
  );
module.exports = router;
