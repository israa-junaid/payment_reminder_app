const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const advanceResults = require("../middleware/advanceResults");
const {
  login,
  portalLogin,
  logout,
  attLogin,
} = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
// router.post("/login/admin", adminlogin);
router.route("/attendanceLogin").post(attLogin);
router.post("/portalLogin", portalLogin);
router.get("/logout", logout);


module.exports = router;
