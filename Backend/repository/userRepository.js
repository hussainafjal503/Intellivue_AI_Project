const User = require("../models/UserModels");
const OTP=require('../models/Otp.models');
const { response } = require("express");
const AdminSchema=require('../models/AdminModel');
class UserRepository {
  registerRepository = async (data) => {
    try {
      const { email } = data;
      const alreadyExist = await User.findOne({ email });
      if (alreadyExist) {
        return false;
      }
      
      const otpdb=await OTP.findOne({email});
      // console.log(otpdb);
      if(!otpdb){
        return {
          statusCode:400,
          message:"OTP not Verified.."
        }
      }
      const response = await User.create(data);

      otpdb.userId=response._id;
      await otpdb.save();
      response.allOTP.push(otpdb._id);
      await response.save();

      //updating the admin schema 


      const adminData = await AdminSchema.findOne(); // Fetch the existing data

        if (adminData) {
            
            adminData.totalUser += 1;
            await adminData.save(); 
        } else {
          
            await AdminSchema.create({ totalUser: 1 });
        }









    
        response.password=undefined;
      return response;
    } catch (err) {
      console.log(`error occured in Register Repository:  ${err}`);
      throw err;
    }
  };

  loginRepository = async (data) => {
    try {
      const { email, password } = data;
      const user = await User.findOne({ email });
      if (!user) {
        return false;
      }
      // console.log(user);

      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return "invalid Creadentials";
      }
      user.password=undefined;
      return user;
    } catch (err) {
      console.log(`error occured in login Repository ${err}`);
      throw err;
    }
  };

  getUserRepository = async (id) => {
    try {
      const response = await User.findById(id).select("-password");
      if (!response) {
        return false;
      }
      return response;
    } catch (err) {
      console.log(`Error occured in get user Repository .. ${err}`);
      throw err;
    }
  };

  updatePasswordRepository = async (id, data) => {
    try {
      const { oldPassword, newPassword } = data;
      const user = await User.findById(id);
      const isPasswordMatched = user.comparePassword(oldPassword);

      if (!isPasswordMatched) {
        return false;
      }
      user.password = newPassword;
      const updatedUser = await user.save();
      // console.log(updatedUser);
      updatedUser.password=undefined;
      return updatedUser;
    } catch (err) {
      console.log(`Error occured in update Password Repository: ${err}`);
      throw err;
    }
  };

  updateProfileRepository = async (id, data) => {
    try {
      const user = await User.findByIdAndUpdate(
        id,
       data,
        { new: true }
      );

      if(!user){
        return false;
      }
      user.password=undefined;
      return user;
    } catch (err) {
      console.log(`Error Occured in updateProfileRepository : ${err}`);
      throw err;
    }
  };

  updateAvtarRepository = async (id,data) => {
    try {

      const response=await User.findById(id);
      if(!response){
        return false;
      }
      response.avtar=data;
      const updateData=await response.save();
      // console.log("updatedData",updateData);
      updateData.password=undefined;
      return updateData;


    } catch (err) {
      console.log(`Error Occured in update Avtar Repository :${err}`);
      throw `repository : ${err}`
    }
  };

  getAlluserRepository=async()=>{
    try{

      const data=await User.find();
      if(!data){
        return false;
      }
      return data;

    }catch(err){
      console.log(`erro occured in get all user repository : ${err}`);
      throw err;
    }
  }



}

module.exports = UserRepository;
