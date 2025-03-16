const InterviewRepository = require("../repository/interviewRepository");
const repositoryInterview = new InterviewRepository();
const Interview = require("../models/InterviewModels");
const fetchAiData = require("../config/AiFetchData");

class InterviewService {
  createInterviewService = async (id, data) => {
    try {
      const { technology } = data;
      if (!technology) {
        return {
          message: "please Enter your Technology..",
          statusCode: 400,
        };
      }

      const response = await repositoryInterview.createInterviewRepository(
        id,
        technology
      );
      if (!response) {
        return {
          message: "user is not found || not authenticated",
          statusCode: 400,
        };
      }
      return response;
    } catch (err) {
      console.log(`error occured in create interview service : ${err}`);
      throw err;
    }
  };

  getAllInterviewService = async (id) => {
    try {
      if (!id) {
        return {
          message: "user is not Authenticated..",
          statusCode: 400,
        };
      }

      const response = await repositoryInterview.getAllInterviewRepository(id);
      if (!response) {
        return {
          message: "unable to find user",
          statusCode: 400,
        };
      }

      return response;
    } catch (err) {
      console.log(`Error occured in get all interview service : ${err}`);
      throw err;
    }
  };

  getInterviewDetailByIdService = async (data) => {
    try {
      const { id } = data;
      if (!id) {
        return {
          message: "unable to find the interview id",
          statusCode: 400,
        };
      }

      const response =
        await repositoryInterview.getInterviewDetailByIdRepository(id);
      if (!response) {
        return {
          message: "unable to find the interview with this id",
          statusCode: 400,
        };
      }

      return response;
    } catch (err) {
      console.log(
        `Error occured in get Interview details by id service : ${err}`
      );
      throw err;
    }
  };

  addQuestionService = async (params) => {
    try {
      const { id } = params;
      //   console.log(id);
      if (!id) {
        return {
          message: "unable to get interview details",
          statusCode: 400,
        };
      }

      const interview = await Interview.findById(id);

      const data = interview.technology;
      //   console.log(interview.technology);
      const prompt = `Generate one Question with this technology ${data} `;

      let question = await fetchAiData(prompt);
      //   console.log(question);
      if (!question) {
        return {
          message: "Unable to generate question for you please try again..",
          statusCode: 400,
        };
      }

      const response = await repositoryInterview.addQuestionRepository(
        id,
        question
      );
      if (!response) {
        return {
          message: "unable to add question in this interview id",
          statusCode: 400,
        };
      }

      return response;
    } catch (err) {
      console.log(`Error Occured in add Question Service : ${err}`);
      throw err;
    }
  };

  submitAnswerService = async (params, data) => {
    try {
      const { id } = params;
      const { answer } = data;

      if (!id || !answer) {
        return {
          message: "Interview is not available || please Submit your answer",
          statusCode: 200,
          success:false
        };
      }

      const response = await repositoryInterview.submitAnswerRepository(
        id,
        answer
      );
      if (!response) {
        return {
          message: "unable to find interview with this id",
          statusCode: 200,
          success:false
        };
      }

      return response;
    } catch (err) {
      console.log(`Error occured in submit answer service: ${err}`);
      throw err;
    }
  };

  aiResponseService = async (params) => {
    try {
      const { id } = params;
      if (!id) {
        return {
          message: "please provide interview id",
          statusCode: 400,
        };
      }

      const response = await repositoryInterview.aiResponseRepository(id);
      if (!response) {
        return {
          message: "unable to find interview with this id",
          statusCode: 400,
        };
      }

      return response;
    } catch (err) {
      console.log(`Error Occured in ai Response service : ${err}`);
      throw err;
    }
  };

  deleteInterviewService = async (userId, params) => {
    try {
      const { id } = params;
      if (!id) {
        return {
          message: "unable to find id to delted",
          statusCode: 400,
        };
      }

      const response = await repositoryInterview.deleteInterviewRepository(
        userId,
        id
      );
      if (!response) {
        return {
          message: "unable to delete it",
          statusCode: 400,
        };
      }

      return response;
    } catch (err) {
      console.log(`Error occured in deleteinterview service : ${err}`);
      throw err;
    }
  };
}

module.exports = InterviewService;
