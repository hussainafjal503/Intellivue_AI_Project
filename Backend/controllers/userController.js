
const Service=require('../services/userService');
const CustomError=require("../utils/Error")
const serviceUser=new Service();

class UserController{

	registerController = async (req,res,next) => {

		try{
			const response = await serviceUser.registerService(req.body);

			if(response.success===false){
				return next(new CustomError(response.message, response.statusCode ));
			}

			return res.cookie("token",response.token,{
				expiresIn:new Date()+1*24*60*60*1000,
				httpOnly:true,
			}).status(200).json({
				success:true,
				message:"User Register Successfully..:)",
				user:response.user,
				token:response.token
			})
	
		}catch(err){
			console.log(`Error occured in register Controler ${err}`);
			return next(new CustomError('unable register user'),500);
		}
	
	}


	loginController=async(req,res,next)=>{
		try{
			const response =await serviceUser.loginService(req.body);

			if(response.success===false){
				return next(new CustomError(response.message, response.statusCode ));
			}


			
			return res.cookie("token",response.token,{
				expiresIn:new Date()+1*24*60*60*1000,
				httpOnly:true,
			}).status(200).json({
				success:true,
				message:"login Successfully..:)",
				user:response.user,
				token:response.token
			})

		}catch(err){
			console.log(`Error occured in login controller : ${err}`);
			return next(new CustomError('unable to login'),500);
		}
	}


	getUserController=async(req,res,next)=>{
		try{
			const response=await serviceUser.getUserService(req.user.id);
			return res.status(200).json({
				success:true,
				message:"User Fetched successfully",
				user:response
			})

		}catch(err){
			console.log(`error occured in get  user controller : ${err}`);
			return next(new CustomError("Unable to get user ",500));

		}
	}

	updatePasswordController=async(req,res,next)=>{
		try{
			const response=await serviceUser.updatePasswordService(req.user.id,req.body);

			if(response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				message:"Password Updated Successfully",
				success:true,
				data:response
			})

		}catch(err){
			console.log(`Error Occured in update Password Controller : ${err}`);
			return next(new CustomError("Unable to Update Password",500));
		}
	};


	updateProfileController=async(req,res,next)=>{
		try{
			const response=await serviceUser.updateProfileService(req.user.id,req.body);
			
			if(response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				message:"Profile Updated Successfully..:)",
				success:true,
				user:response,
			})

		}catch(err){
			console.log(`Error Occured in update Profile Controller: ${err}`);
			return next(new CustomError("Unable to update Profile ",500));
		}
	};

	updateAvtarController=async(req,res,next)=>{
		try{

			// console.log(req.file)
			const response=await serviceUser.updateAvtarService(req.user.id,req.file);
			if(response.success===false){
				// console.log("success false")
				return next(new CustomError(response.message,response.statusCode));
			} 

			return res.status(200).json({
				message:"Profile Image Updated Successfully..:)",
				success:true,
				user:response
			})

		}catch(err){
			console.log(`Error Occured in updateAvtarController : ${err.message}`);
			return next(new CustomError("Unable to update Avtar",500));
		}
	};


	getAlluserController = async(req,res,next)=>{
		try{
			const response=await serviceUser.getAlluserService();
			if(response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				success:true,
				message:"All data fetched..",
				response,
			})

		}catch(err){
			console.log(`error occured in get all user Controller : ${err}`);
			return next(new CustomError("Unable to get all user data",500));
		}
	}

	logoutUserController=async(req,res,next)=>{
		try{
			const {id}=req.user;
			// console.log(id);
			if(!id){
				return res.status(200).json({
					message:"user not authenticated",
					success:false
				})
			}

			return res.cookie("token","",{
				maxAge:0,
				httpOnly:true,
				path:"/"
			}).status(200).json({
				message:"You LogedOut",
				success:true,
				data:""
	
			})

		}catch(err){
			console.log(`Error Occured in logOut user controller : ${err}`);
			return next(new CustomError('unable to logout You',500));
		}
	}






	sendAccountDeleteRequestController=async(req,res,next)=>{
		try{
			const response=await serviceUser.sendAccountDeleteRequestService(req.user.id);
			if(response.statusCode===400){
				return next(new CustomError(response.message,response.statusCode));
			}

			return res.status(200).json({
				message:"Your Account will be deleted within a Week",
				success:true,
				data:response
			})

		}catch(err){
			console.log(`Error Occured in send Account Delete Request Controller : ${err}`);
			return next(new CustomError("Unable to send delete Request",500));
		}
	}

}


module.exports=UserController;

