const CodeReview = require("../models/codeReviewModels");
const User = require("../models/UserModels");
const fetchAiData = require("../config/AiFetchData");
const AdminSchema=require("../models/AdminModel")

class CodeReviewService {
  createCodingService = async (userId) => {
    try {
      const prompt =
        "generate one Coding Question and its constrains and it example output max output example is 3 for the user and make sure the question will be able to solve through any programming language and try to fetch the question from coding plateform like leetcode, codechef, gfg for unique questions";

      const codingQuestion = await fetchAiData(prompt);

      const response = await CodeReview.create({
        userId: userId,
        codeQuestion: codingQuestion,
      });
      if (!response) {
        return {
          message: "unable to create coding Question for you..",
          statusCode: 400,
        };
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            codingQuestions: response._id,
          },
        },
        { new: true }
      );
      // console.log(user);
      if (!user) {
        return {
          message: "unable to find user",
          statusCode: 400,
        };
      }



      const adminData = await AdminSchema.findOne(); // Fetch the existing data
        
                if (adminData) {
                    
                    adminData.codingCount += 1;
                    await adminData.save(); 
                } else {
                  
                    await AdminSchema.create({ codingCount: 1 });
                }






      return response;
    } catch (err) {
      console.log(`Error Occured in create Coding Service: ${err}`);
      throw err;
    }
  };

  submitCodeAnswerService = async (userId, data) => {
    try {
      const { answer } = data;
      if (!answer) {
        return {
          message: "please submit Your answer",
          statusCode: 400,
        };
      }
      const user = await User.findById(userId, {
        codingQuestions: { $slice: -1 },
      })
        .populate("codingQuestions")
        .exec();
      //   console.log(user);

      const questionId = user.codingQuestions[0];
      // console.log("hello------->", questionId._id);

      const updatedData = await CodeReview.findByIdAndUpdate(
        questionId._id,
        {
          userAnswer: answer,
        },
        { new: true }
      );

      return updatedData;
    } catch (err) {
      console.log(`Error occured in submit code answer service : ${err}`);
      throw err;
    }
  };

  getCodeReviewService = async (userId) => {
    try {
      if (!userId) {
        return {
          message: "user id is not found",
          statusCode: 400,
        };
      }

      const response = await User.findById(userId).populate("codingQuestions");
      // console.log(response.codingQuestions);
      const len = response.codingQuestions.length;
      const question = response.codingQuestions[len - 1];
      const prompt = `Now you are a code Reviewer so analyse this question "${question.codeQuestion}" and this answer "${question.userAnswer}" and if it is right and give response to user it is right and if it is not right then tell him wrong answer and provide him answer`;

      const aiResponse = await fetchAiData(prompt);
      // console.log(aiResponse);
      const data = await CodeReview.findByIdAndUpdate(
        question._id,
        {
          reviewFeedback: aiResponse,
        },
        { new: true }
      );

      // console.log(data);
      if (!data) {
        return {
          message: "unable to update the code Review",
          statusCode: 400,
        };
      }

      return data;
    } catch (err) {
      console.log(`Error occured in get review service: ${err}`);
      throw err;
    }
  };

  deleteCodeReviewService = async (userId, params) => {
    try {
      const { id } = params;
      if (!id) {
        return {
          message: "user id not found",
          statusCode: 400,
        };
      }

      const response = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { codingQuestions: id },
        },
        { new: true }
      );

      const deletedData = await CodeReview.findByIdAndDelete(id);

      if (!deletedData) {
        return {
          message: "unable to delete review",
          statusCode: 400,
        };
      }

      return deletedData;
    } catch (err) {
      console.log(`Error Occured in delete code Review service: ${err}`);
      throw err;
    }
  };

  getCodeByIdService=async(params)=>{
    try{
      const {id}=params;
      // console.log(id);
      const response=await CodeReview.findById(id);
      if(!response){
        return {
          success:false,
          message:"unable to get coe",
          statusCode:400
        }
      }

      return response;

    }catch(err){
      console.log(`Error occured in get code by id service : ${err}`);
      throw err;
    }
  }

  getAllReviewService = async (userId) => {
    try {
      if (!userId) {
        return {
          message: "user id is not available",
          statusCode: 400,
        };
      }

      const response = await User.findById(userId)
        .select("codingQuestions")
        .populate("codingQuestions")
        .exec();
      // console.log(response);

      return response;
    } catch (err) {
      console.log(`Error Occured in get All review service : ${err}`);
      throw err;
    }
  };
  
}

module.exports = CodeReviewService;
