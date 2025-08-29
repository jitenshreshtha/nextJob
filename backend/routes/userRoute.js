const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  getCurrentUser,
  logoutUser,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", userRegister);
router.post("/userLogin", userLogin);
router.get("/me", verifyToken, getCurrentUser);
router.post("/logout", logoutUser);

module.exports = router;
