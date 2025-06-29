// models/StudentProfile.js (No Change from previous revision)
const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    photoUrl: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    currentCity: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    languages: {
      type: [String],
      default: [],
    },
    resumeUrl: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    careerObjective: {
      type: String,
      trim: true,
    },
    education: [
      {
        degree: { type: String, trim: true },
        major: { type: String, trim: true },
        institution: { type: String, trim: true },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String, trim: true },
      },
    ],
    workExperience: [
      {
        title: { type: String, trim: true },
        company: { type: String, trim: true },
        location: { type: String, trim: true },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String, trim: true },
      },
    ],
    extraCurricularActivities: {
      type: [String],
      default: [],
    },
    trainingsCourses: {
      type: [String],
      default: [],
    },
    academicPersonalProjects: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        projectUrl: { type: String, trim: true },
      },
    ],
    portfolioWorkSamples: [
      {
        title: { type: String, trim: true },
        url: { type: String, trim: true },
        description: { type: String, trim: true },
      },
    ],
    accomplishmentsAdditionalDetails: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
