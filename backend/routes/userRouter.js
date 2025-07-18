const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Assuming you have auth middleware
const { uploadFiles } = require("../utils/helpers");

// Get user profile
router.get(
  "/profile",
  authMiddleware.isLoggedIn,
  userController.getUserProfile
);

// Student profile routes
router.get(
  "/student/profile",
  authMiddleware.isLoggedIn,
  userController.getStudentProfile
);
router.put(
  "/student/profile",
  authMiddleware.isLoggedIn,
  uploadFiles,
  userController.updateStudentProfile
);

// Company profile routes
router.get(
  "/company/profile",
  authMiddleware.isLoggedIn,
  userController.getCompanyProfile
);
router.get("/company/display", userController.getCompanyProfileById);
router.get("/company/all", userController.getCompanyList);
router.get("/company/search", userController.getCompanyListBySearch);
router.put(
  "/company/profile",
  authMiddleware.isLoggedIn,
  userController.updateCompanyProfile
);

module.exports = router;
