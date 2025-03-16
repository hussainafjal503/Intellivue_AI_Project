const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", OtpSchema);
