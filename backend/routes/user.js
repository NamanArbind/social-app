const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuthenticated, followUser);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteProfile);
router.route("/me").get(isAuthenticated,myProfile)
router.route("/user/:id").get(isAuthenticated,getUserProfile)
router.route("/users").get(isAuthenticated,getAllUsers)
router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;