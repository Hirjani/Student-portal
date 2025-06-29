// models/Application.js (NEW MODEL)
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "withdrawn",
        "reviewed",
        "interviewed",
      ], // Added more statuses for completeness
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    // Optional: Fields for application-specific questions
    answers: {
      type: Map, // Use a Map to store key-value pairs for answers
      of: String, // Values are strings
    },
    // Optional: Custom resume for this application (if different from student's primary resume)
    customResumeUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add a unique compound index to prevent a student from applying to the same internship multiple times
applicationSchema.index({ internship: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
