const User = require("../models/User");
const { generateToken } = require("../utils/helpers");
const studentProfile = require("../models/StudentProfile");
const companyProfile = require("../models/CompanyProfile");

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = await generateToken({ id: user._id });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signUp = async (req, res) => {
  const {
    email,
    password,
    firstName = "",
    lastName = "",
    role = "student",
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const user = new User({
      email,
      password,
      role,
    });

    let userProfile;
    if (role === "student") {
      userProfile = new studentProfile({ user: user._id, firstName, lastName });
    } else if (role === "company") {
      userProfile = new companyProfile({ user: user._id });
    } else {
      userProfile = null;
    }
    if (userProfile) {
      await userProfile.save();
      user.profile = userProfile._id;
    }

    await user.save();
    // Generate JWT token
    const token = await generateToken({ id: user._id });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      firstName: userProfile?.firstName ? userProfile?.firstName : "",
      lastName: userProfile?.lastName ? userProfile?.lastName : "",
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
