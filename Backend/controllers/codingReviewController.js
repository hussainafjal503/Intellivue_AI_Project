const CodeReviewService = require("../services/codingReviewService");
const CustomError = require("../utils/Error");
const CodeReview = require("../models/codeReviewModels");

const reviewService = new CodeReviewService();

class CodeReviewController {

  
  createCodingController = async (req, res, next) => {
    try {
      const response = await reviewService.createCodingService(req.user.id);
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "Question generated for you",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error Occured in create Coding Controller: ${err}`);
      return next(new CustomError("unable to generate Question", 500));
    }
  };

  submitCodeAnswerController = async (req, res, next) => {
    try {
      const response = await reviewService.submitCodeAnswerService(
        req.user.id,
        req.body
      );
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "Answered submit successfully...",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error occured in submit code answer controller : ${err}`);
      return next(new CustomError("unable to submit your answer", 500));
    }
  };

  getCodeReviewController = async (req, res, next) => {
    try {
      const response = await reviewService.getCodeReviewService(req.user.id);
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "code Reviewed successfully..",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error occured in get review controller: ${err}`);
      return next(new CustomError("unable to review your code", 500));
    }
  };

  deleteCodeReviewController = async (req, res, next) => {
    try {
      const response = await reviewService.deleteCodeReviewService(
        req.user.id,
        req.params
      );
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "review deleted Successfully..:)",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error Occured in delete code Review Controller: ${err}`);
      return next(new CustomError("unable delete code review", 500));
    }
  };

  getCodeByIdController=async(req,res,next)=>{
    try{
      // console.log(req.params);
      const response=await reviewService.getCodeByIdService(req.params);
      if(response.success===false){
        return next(new CustomError(response.message,response.statusCode));
      }

      return res.status(200).json({
        message:"code find successfully",
        success:true,
        data:response
      })

    }catch(err){
      console.log(`Error occured in get code by id controller : ${err}`);
      return next(new CustomError("unable to get code ",500));
    }
  }

  getAllReviewController = async (req, res, next) => {
    try {
      const response = await reviewService.getAllReviewService(req.user.id);
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "fetch all Review",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error Occured in get All review controller : ${err}`);
      return next(new CustomError("unable to get all review", 500));
    }
  };
}

module.exports = CodeReviewController;
