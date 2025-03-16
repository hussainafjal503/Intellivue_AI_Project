const AdminSchema = require("../models/AdminModel");
const User = require("../models/UserModels");
const CodeReview=require('../models/codeReviewModels');
const RoadMaps=require('../models/RoadMapsModels');
const Interview=require('../models/InterviewModels');
const Question=require('../models/QuestionModels');

class adminService {
  getAdminDataService = async (id) => {
    try {
      if (!id) {
        return {
          statusCode: 400,
          message: "You Are not Authorized",
        };
      }

      const user = await User.findById(id);
      if (user.role !== "admin") {
        return {
          statusCode: 400,
          message: "UnAuthorized Resources",
        };
      }

      const response = await AdminSchema.findOne();
      if (!response) {
        return false;
      }

      return response;
    } catch (err) {
      console.log(`error occured in getAdminData service : ${err}`);
      throw err;
    }
  };

  getAllMessageService = async (id) => {
    try {
      if (!id) {
        return {
          statusCode: 400,
          message: "You Are not Authorized",
        };
      }

      const user = await User.findById(id);
      if (user.role !== "admin") {
        return {
          statusCode: 400,
          message: "UnAuthorized Resources",
        };
      }

      const response = await AdminSchema.findOne().select("userMessage");
      if (!response) {
        return {
          statusCode: 400,
          message: "data not found",
        };
      }

    //   response.reverse();
	return response.userMessage.reverse();
	// console.log(response);
    //   return response;
    } catch (err) {
      console.log(`Error Occured in get user Message service : ${err}`);
      throw err;
    }
  };

  getAllDeletedRequestService = async (id) => {
    try {
      if (!id) {
        return {
          statusCode: 400,
          message: "You Are not Authorized",
        };
      }

      const user = await User.findById(id);
      if (user.role !== "admin") {
        return {
          statusCode: 400,
          message: "UnAuthorized Resources",
        };
      }

      // console.log("Request arives")
      const response = await AdminSchema.findOne()
      .select("deleteRequest")
        .populate({
          path: "deleteRequest",
          module: "User",
          select:"-password"
        })
        .exec();
        // console.log(response);


        
      if (!response) {
        return {
          statusCode: 400,
          message: "data not found",
        };
      }

      return response.deleteRequest
    } catch (err) {
      console.log(`Error Occured in get ALL delted Request service : ${err}`);
      throw err;
    }
  };

  sendMessageRequestService = async (data) => {
    try {
      const { message, email, phone, fullName } = data;

      if (!message || !email || !fullName) {
        return {
          statusCode: 400,
          message: "All Fields are required..",
        };
      }

      const response = await AdminSchema.findOne();
	  
      response.userMessage.push({
		message:message,
		email:email,
		fullName:fullName,
		phone:phone
	  });

      if (response.messageCount) {
        response.messageCount += 1;
      } else {
        response.messageCount = 1;
      }
	//   console.log(response)
      await response.save();

      return response;
    } catch (err) {
      console.log(`Error occured in send message service  : ${err}`);
      throw err;
    }
  };

  deleteMessageService = async (params) => {
    try {
      const { id } = params;
      if (!id) {
        return {
          statusCode: 400,
          message: "please provide id to delete",
        };
      }

      const response = await AdminSchema.findOne();
      response.userMessage.pull(id);
      await response.save();
    //   console.log(response)
	return response.userMessage;
    } catch (err) {
      console.log(`Error OCcured in delete Message service  : ${err}`);
      throw err;
    }
  };

 
  approveDeleteRequestService = async (adminId, params) => {
    try {
      const { id } = params;
      const deleteId=id;

      if (!adminId) {
        return {
          statusCode: 400,
          message: "You Are not Authorized",
        };
      }

      if (!deleteId) {
        return {
          statusCode: 400,
          message: "unable to get user to delete",
        };
      }

      
      const user=await User.findById(deleteId);

      if(!user){
        return {
          message:"unable to find the user ",
          statusCode:400
        }
      }

      if(user.codingQuestions.length>0){
        user.codingQuestions.forEach(async(id)=>{
           await CodeReview.findByIdAndDelete(id);
        })
      }

      if(user.roadMaps.length>0){
        user.roadMaps.forEach(async(id)=>{
         await RoadMaps.findByIdAndDelete(id);
        })
      }

      if(user.interview.length>0){
        user.interview.forEach(async(intId)=>{
            const interv=Interview.findById(intId);

            if(interv.questions.length>0){
              interv.questions.forEach(async(qid)=>{
              await  Question.findByIdAndDelete(qid);
              })
            }

          await  Interview.findByIdAndDelete(intId);
        })
      }

    const deletedUser=  await User.findByIdAndDelete(deleteId);
    if(!deletedUser){
      return {
        message:"unable to delete",
        statusCode:400
      }
    }

      const response = await AdminSchema.findOneAndUpdate(
        {},
        {
          $pull: { deleteRequest: deleteId },
        },
        { new: true }
      );

      if (!response) {
        return {
          statusCode: 400,
          message: "data not found",
        };
      }

      return response;
    } catch (err) {
      console.log(`Error Occured in approveDelete Request service : ${err}`);
      throw err;
    }
  };
}

module.exports = adminService;
