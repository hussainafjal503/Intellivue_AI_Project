const CustomError = require("../utils/Error");
const fetchAiData = require("../config/AiFetchData");
const RoadMaps = require("../models/RoadMapsModels");
const User = require("../models/UserModels");
const fetchRoadMapchart = require("../config/roadMapChart");
const mongoose = require("mongoose");

class RoadMapService {
  createGoalService = async (userId, data) => {
    try {
      const { goal } = data;
      if (!goal) {
        return {
          message: "please Enter technology..",
          statusCode: 400,
        };
      }

      const response = await RoadMaps.create({ userId: userId, goals: goal });

      if (!response) {
        return {
          message: "unable to set goal",
          statusCode: 400,
        };
      }
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { roadMaps: response._id },
        },
        { new: true }
      );

      if (!user) {
        return {
          message: "unable to update user",
          statusCode: 400,
        };
      }

      const chartValue = await fetchRoadMapchart(goal);
      const responseData = {
        response,
        chartValue,
      };
      return responseData;
    } catch (err) {
      console.log(`Error Occured in Create roadmap controller : ${err}`);
      throw err;
    }
  };

  generateRoadMapService = async (params) => {
    try {
      const { id } = params;
      // console.log(id);
      if (!id) {
        return {
          message: "provide your goal id",
          statusCode: 400,
        };
      }

      const fetchroadmap = await RoadMaps.findOne({ _id: id });
      const goal = fetchroadmap.goals;

      const prompt = `give me the road map for this goal "${goal}", please only give technology name in structure way`;
      const aiFullRoadMap = await fetchAiData(prompt);

      const resource = `Give me the youtube channel name for becoming"${goal}" please only give the channel name to related to the technology`;
      const aiResource = await fetchAiData(resource);

      fetchroadmap.resources = aiResource;
      const updateData = await fetchroadmap.save();

      // fetchroadmap.roadmap.push(createdGoal._id);
      // await fetchroadmap.save();

      const allData = aiFullRoadMap + "\n\n" + aiResource;
      return allData;
    } catch (err) {
      console.log(`Error occured in generate RoadMap service: ${err}`);
      throw err;
    }
  };


  deleteRoadMapService = async (userId, params) => {
    try {
      const { id } = params;

      if (!id) {
        return {
          message: "unable to find the roadmap id",
          statusCode: 400,
        };
      }

   

      const user = await User.findByIdAndUpdate(userId, {
        $pull: { roadMaps: id },
      },{new:true}).populate({
           path:"roadMaps",
        model:"RoadMaps"
      }).select("roadMaps").exec();

      if (!user) {
        return {
          message: "unable to find user",
          statusCode: 400,
        };
      }


      //deleting user
      const deletedData = await RoadMaps.findByIdAndDelete(id);
      return user;
    } catch (err) {
      console.log(`Error occured in delete RoadMap service : ${err}`);
      throw err;
    }
  };

  getAllRoadMapResponsesServices=async(id)=>{
    // console.log(id);
    try{
      const response=await User.findById(id).populate({
        path:"roadMaps",
        model:"RoadMaps"
      }).select("roadMaps").exec();

      if(!response){
        return {
          statusCode:400,
          message:"no data found"
        }
      }

      return response;
    }catch(err){
      console.log(`Error Occured in get All roadMap responses Services : ${err}`);
      throw err;
    }
  } 


    getDetailsByIdService=async(params)=>{
      try{
        const {id}=params;
        // console.log(id);
        if(!id){
          return {
            message:"please provide id ",
            statusCode:400
          }
        }

        const response=await RoadMaps.findById(id);
        if(!response){
          return {
            message:"unable to get detail with that id",
            statusCode:400
          }
        }
        // console.log(response);

        return response;
  
      }catch(err){
        console.log(`Error occured in getDetails by id service : ${err}`);
        throw err;
      }
    }
  
}

module.exports = RoadMapService;
