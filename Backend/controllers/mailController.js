const User = require("../models/UserModels");
const sendMail = require("../config/mailerConfig");
const otpGenerator = require("otp-generator");
const otpTemplate = require("../Data/otpTemplate");
const OTP = require("../models/Otp.models");
const CustomError = require("../utils/Error");

class MailSender {
  otpSent = async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "please Enter Your email",
          success: false,
        });
      }

      const alreadyExistUser = await User.findOne({ email });
      if (alreadyExistUser) {
        return res.status(200).json({
          success: false,
          message: "User already Exists",
        });
      }

      const newOtp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      const template = otpTemplate(newOtp);

      const isSent = sendMail(email, "OTP Verification", template);
      if (!isSent) {
        return res.status(500).json({
          success: false,
          message: "Unable to send the OTP",
        });
      }

      const otp = await OTP.create({ email: email, otp: newOtp });

      return res.status(200).json({
        success: true,
        message: "OTP sent Successfully...:)",
        otp,
      });
    } catch (err) {
      console.log(`Error occured while sending the mail: ${err} `);
      return next(new CustomError("Unable to Send OTP", 500));
    }
  };

  verifyOtp = async (req, res, next) => {
    try {
      const { otp, email } = req.body;
      if (!otp) {
        return res.status(200).json({
          success: false,
          message: "OTP is Required..",
        });
      }

      // console.log("otp", otp);
      const dbOtp = await OTP.findOne({ email, otp }).sort({ createdAt: -1 });
      // console.log("dbotp", dbOtp);
      if (!dbOtp) {
        console.log("hello")
        return res.status(200).json({
          message: "Invalid Otp",
          success: false,
        });
      }

     
      const isExpired = new Date(dbOtp.createdAt) < new Date(Date.now() - 10 * 60 * 1000);

      // console.log(isExpired);

      if (isExpired) {
        return res.status(200).json({
          success: false,
          message: "OTP Expired",
        });
      }

      dbOtp.isVerified = true;
      await dbOtp.save();
      return res.status(200).json({
        message: "Otp Verified",
        success: true,
        dbOtp,
      });
    } catch (err) {
      console.log(`Error Occured while verifying the Otp : ${err}`);
      return next(new CustomError("Unable to Verify OTP ", 500));
    }
  };
}

module.exports = MailSender;
