const Interview = require("../models/InterviewModels");
const User = require("../models/UserModels");
const Question = require("../models/QuestionModels");
const fetchAiData = require("../config/AiFetchData");

class InterviewRepository {
  createInterviewRepository = async (id, data) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return false;
      }

      const interview = new Interview({ userId: id, technology: data });
      const newInterview = await interview.save();
      user.interview.push(newInterview._id);
      const updatedUser = await user.save();

      return newInterview;
    } catch (err) {
      console.log(`error occured in create interview controller : ${err}`);
      throw err;
    }
  };

  getAllInterviewRepository = async (id) => {
    try {
      const response = await User.findById(id)
        .populate({
          path: "interview",
          model: "Interview",
        })
        .select("interview")
        .exec();

      if (!response) {
        return false;
      }

      return response;
    } catch (err) {
      console.log(`Error occured in get All interview Repository: ${err}`);
      throw err;
    }
  };

  getInterviewDetailByIdRepository = async (id) => {
    try {
      const response = await Interview.findById(id)
        .populate({
          path: "questions",
          model: "Question",
        })
        .exec();
      if (!response) {
        return false;
      }

      return response;
    } catch (err) {
      console.log(
        `Error occured in get Interview details by id repository : ${err}`
      );
      throw err;
    }
  };

  addQuestionRepository = async (id, question) => {
    try {
      const response = await Question.create({
        question: question,
        interviewId: id,
      });
      if (!response) {
        return false;
      }

      const updatedInterview = await Interview.findByIdAndUpdate(
        id,
        { $push: { questions: response._id } },
        { new: true }
      );

      if (!updatedInterview) {
        return false;
      }


        
              const adminData = await AdminSchema.findOne(); // Fetch the existing data
        
                if (adminData) {
                    
                    adminData.interviewCount += 1;
                    await adminData.save(); 
                } else {
                  
                    await AdminSchema.create({ interviewCount: 1 });
                }
        















      // console.log(response._id);
      return response;
    } catch (err) {
      console.log(`Error Occured in add Question repository : ${err}`);
      throw err;
    }
  };

  submitAnswerRepository = async (id, answer) => {
    try {
      const interview = await Interview.findById(id).select({
        questions: { $slice: -1 },
      });
      const latesQuestion = interview.questions[0];
      // console.log(latesQuestion);

      const response = await Question.findByIdAndUpdate(
        latesQuestion,
        {
          userAnswer: answer,
        },
        { new: true }
      );

      if (!response) {
        return false;
      }
      return response;
    } catch (err) {
      console.log(`Error occured in submit answer repository: ${err}`);
      throw err;
    }
  };

  aiResponseRepository = async (id) => {
    try {
      const interview = await Interview.findById(id).select({
        questions: { $slice: -1 },
      });
      const latestQuestion = interview.questions[0];
      //  console.log(latestQuestion);

      const questionResponse = await Question.findById(latestQuestion);
      const userAnswer = questionResponse.userAnswer;
      const question = questionResponse.question;
      // console.log(question);

      const prompt = `check this  user answer ,"${userAnswer}" based on this question "${question}" is right or not and based on his answer the feedback is like wrong anwer and right answer if the answer is wrong the give the right answer and if the answer is right and only tell that absolutely right`;

      const aiFeedback = await fetchAiData(prompt);
      questionResponse.feedBack = aiFeedback;
      const updatedData = await questionResponse.save();
      return updatedData;
    } catch (err) {
      console.log(`Error Occured in ai Response repository : ${err}`);
      throw err;
    }
  };

  deleteInterviewRepository = async (userId, id) => {
    try {
      // console.log(id)
      const questionResponse = await Interview.findById(id);
      const allQues = questionResponse.questions;
      console.log(allQues);

      allQues.forEach(async (qId) => {
        await Question.findByIdAndDelete(qId);
      });

      const response = await Interview.findByIdAndDelete(id);
      // console.log(response);
      if (!response) {
        return false;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { interview: id },
        },
        { new: true }
      ).populate({
        path:"interview",
        model:"Interview"
      }).select("Interview").exec();

      // console.log(user)
      if (!user) {
        return false;
      }
      return user

      // return allQues;
    } catch (err) {
      console.log(`Error occured in deleteinterview service : ${err}`);
      throw err;
    }
  };
}

module.exports = InterviewRepository;
