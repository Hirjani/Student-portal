// models/Internship.js (Revised)
const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile", // References CompanyProfile
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    stipend: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      trim: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    applicationDeadline: {
      type: Date,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    // The 'applicants' array is REMOVED from this model.
    // Applications will be managed via the new Application model.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);
