require("dotenv").config();
const fetchAiData = require("../config/AiFetchData");
const Resume = require("../models/ResumeModels");
const User = require("../models/UserModels");

class ResumeService {
  
  keywordResponseService = async (data) => {
    try {
      const { prompt } = data;

      if (!prompt) {
        return {
          message: "please provide searching details",
          statusCode: 400,
        };
      }

      const response = await fetchAiData(prompt);

      return {
        message: "successfully fetch the data ..",
        statusCode: 200,
        data: response,
      };
    } catch (err) {
      console.log(`error occured in keyword Resposonse Controller : ${err}`);
      throw err;
    }
  };

  createResumeService = async (userId, data) => {
    try {
      const {
        name,
        email,
        phone,
        summary,
        education,
        experience,
        skills,
        certifications,
        projects,
        socialLinks,
        languages,
        hobbies,
      } = data;
      if (
        !name ||
        !email ||
        !phone ||
        !summary ||
        !education ||
        !skills ||
        !projects ||
        !socialLinks ||
        !languages ||
        !hobbies
      ) {
        return {
          message: "all fields are required",
          statusCode: 400,
        };
      }
      let response;
      if (experience && certifications) {
        response = await Resume.create({
          userId,
          name,
          email,
          phone,
          summary,
          education,
          experience,
          skills,
          certifications,
          projects,
          socialLinks,
          languages,
          hobbies,
        });
      } else {
        response = await Resume.create({
          userId,
          name,
          email,
          phone,
          summary,
          education,
          skills,
          projects,
          socialLinks,
          languages,
          hobbies,
        });
      }

      const user = await User.findByIdAndUpdate(userId, {
        allResume: response._id,
      });

      if (!user) {
        return {
          message: "unable to find user to set",
          statusCode: 400,
        };
      }
      return response;
    } catch (err) {
      console.log(`Error Occured in create resume service : ${err}`);
      throw err;
    }
  };

  deleteResumeService = async (userId,params) => {
    try {

      const {id}=params;
      if(!id){
        return {
          message:"id is not available..",
          statusCode:400,
        }
      }

      const response=await Resume.findByIdAndDelete(id);
      const user=await User.findByIdAndUpdate(userId,{
        $pull:{allResume:id}
      },{new:true});

      if(!user){
        return {
          message:"unable to delete user",
          statusCode:400
        }
      }
      return response;
    } catch (err) {
      console.log(`Error Occured in delete Resume service: ${err}`);
      throw err;
    }
  };


  resumeDownloadService=async()=>{
    try{
      const adminData = await AdminSchema.findOne(); // Fetch the existing data
        
      if (adminData) {
          
          adminData.resumeCount += 1;
          await adminData.save(); 
      } else {
        
          await AdminSchema.create({ resumeCount: 1 });
      }

      if(!adminData){
        return false;
      }

      return adminData;

    }catch(err){
      console.log( `Error occured in resume download : ${err}`);
      throw err;
    }
  }


}

module.exports = ResumeService;
