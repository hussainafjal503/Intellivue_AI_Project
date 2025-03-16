const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    avtar: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    about: {
      type: String,
      trim: true,
    },
    dob:{
      type:Date
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    resumeCount: {
      type: Number,
      default: 0,
    },
    codingQuestions:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"CodeReview"
      }
    ],
    allResume: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
      },
    ],
    roadMaps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoadMaps",
      },
    ],
    interview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
    allOTP: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OTP",
      },
    ],
  },
  { timestamps: true }
);

//hashing the password before saving the user details
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//comparing the password
userSchema.methods.comparePassword = async function (inputPassword) {
  if (!this.password) {
    throw new Error("Password not found for this user");
  }
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  // console.log(isMatch);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
