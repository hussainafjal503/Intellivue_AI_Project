const CustomError = require("../utils/Error");
const InterviewService = require("../services/interviewService");
const serviceInterview = new InterviewService();

class InterviewController {
  createInterviewController = async (req, res, next) => {
    try {
      const response = await serviceInterview.createInterviewService(
        req.user.id,
        req.body
      );
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "Interview Conducted",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`error occured in create interview controller : ${err}`);
      return next(
        new CustomError("unable to create interview with this technology", 500)
      );
    }
  };

  getAllInterviewController = async (req, res, next) => {
    try {
      const response = await serviceInterview.getAllInterviewService(
        req.user.id
      );
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }
      return res.status(200).json({
        message: "fetch all the Interview details of user",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`error occured in get all interview controller : ${err}`);
      return next(new CustomError("unable to get all interview of user", 500));
    }
  };

  getInterviewDetailByIdController = async (req, res, next) => {
    try {
      const response = await serviceInterview.getInterviewDetailByIdService(
        req.params
      );

      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "data fetched by is successfully",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(
        `Error occured in get Interview details by id controller : ${err}`
      );
      return next(new CustomError("unable to get interview detail by id", 500));
    }
  };

  addQuestionController = async (req, res, next) => {
    try {
      const response = await serviceInterview.addQuestionService(req.params);
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "Question added Successfull",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error Occured in add Question Conroller : ${err}`);
      return next(new CustomError("unable to add Question", 500));
    }
  };

  submitAnswerController = async (req, res, next) => {
    try {
      const response = await serviceInterview.submitAnswerService(
        req.params,
        req.body
      );
      if (response.success===false) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "Answer submitted Successfully",
        success: true,
        data:response,
      });
    } catch (err) {
      console.log(`Error occured in submit answer Controller: ${err}`);
      return next(new CustomError("Unable to submit answer", 500));
    }
  };

  aiResponseController = async (req, res, next) => {
    try {
      const response = await serviceInterview.aiResponseService(req.params);
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "your Ai Resposne..",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error Occured in ai Response Controller : ${err}`);
      return next(new CustomError("Unable to submit the answer", 500));
    }
  };

  deleteInterviewController = async (req, res, next) => {
    try {
      const response = await serviceInterview.deleteInterviewService(
        req.user.id,
        req.params
      );
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "deleted successfully..",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error occured in deleteinterview Controller : ${err}`);
      return next(
        new CustomError("unable to delete you interview chat section: ", 500)
      );
    }
  };
}

module.exports = InterviewController;
