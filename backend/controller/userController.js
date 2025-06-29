const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");
const CompanyProfile = require("../models/CompanyProfile");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("profile");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    ).populate("user", "firstName lastName email");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    ).populate("user", "firstName lastName email");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating company profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    ).populate("user", "firstName lastName email");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const companyProfile = await CompanyProfile.findOne({
      user: userId,
    }).populate("user", "firstName lastName email");

    if (!companyProfile) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    res.status(200).json(companyProfile);
  } catch (error) {
    console.error("Error fetching company profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const studentProfile = await StudentProfile.findOne({
      user: userId,
    }).populate("user", "firstName lastName email");

    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json(studentProfile);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
