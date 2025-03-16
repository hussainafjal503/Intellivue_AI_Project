const CustomError=require('../utils/Error');
const RoadMapService=require('../services/roadMapService');
const serviceRoadmap=new RoadMapService();



class RoadMapController{

	createGoalController=async(req,res,next)=>{
		try{
			const response=await serviceRoadmap.createGoalService(req.user.id,req.body);
			if(Response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			// console.log(response);
			return res.status(200).json({
				message:"Your Goal Created Successfully...",
				success:true,
				data:response
			})

		}	catch(err){
			console.log(`Error Occured in Create roadmap controller : ${err}`);
			return next(new CustomError("unable to create goal",500));
		}	
	}

	generateRoadMapController=async(req,res,next)=>{
		try{
			const response=await serviceRoadmap.generateRoadMapService(req.params);
			if(!response){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				message:"Your RoadMap is: ",
				success:true,
				data:response,
			})
			
		}catch(err){
			console.log(`Error occured in generate RoadMap controller: ${err}`);
			return next(new CustomError("unable to generate Response",500));
		}
	}




	deleteRoadmapController=async(req,res,next)=>{
		try{
			const response=await serviceRoadmap.deleteRoadMapService(req.user.id,req.params);
			if(response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				message:"deleted successfully..",
				success:true,
				data:response
			})
			
			

		}catch(err){
		  console.log(`Error occured in delete RoadMap controller : ${err}`);
		  return next(new CustomError("unablet to delte the roadMap",500));
		}
	}

	getAllRoadMapResponseController=async(req,res,next)=>{
		try{
			const response=await serviceRoadmap.getAllRoadMapResponsesServices(req.user.id);
			if(response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				message:"all get",
				success:true,
				data:response,
			})

		}catch(Err){
			console.log(`Error occured in get all roadmap response controller : ${Err}`);
			return next(new CustomError("unable to get all response",500));
		}
	}

	getDetailsByIdController=async(req,res,next)=>{
		try{

				// console.log(req.params);
			
			const response=await serviceRoadmap.getDetailsByIdService(req.params);
			if(response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				message:"fetch details",
				success:true,
				data:response
			})

		}catch(err){
			console.log(`Error occured in getDetails by id controller : ${err}`);
			return next(new CustomError("unable to get details by id",500));
		}
	}

}

module.exports=RoadMapController;