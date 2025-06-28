const router = require("express").Router();
const authController = require("../controller/authController");
// const { protect } = require("../middleware/authMiddleware");
// const { validateLogin } = require("../middleware/validationMiddleware");

// Login route
router.post("/login", authController.logIn);
router.post("/signup", authController.signUp);

module.exports = router;
