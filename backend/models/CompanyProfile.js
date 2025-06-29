// models/CompanyProfile.js (No Change from previous revision)
const mongoose = require("mongoose");

const companyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    companyDescription: {
      type: String,
      required: true,
      trim: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    companyLogoUrl: {
      type: String,
      trim: true,
    },
    headquarters: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompanyProfile", companyProfileSchema);
