const Repository = require("../repository/userRepository");
const MailSender=require('../controllers/mailController');
const{cloudinary}=require('../config/imageUpload')
const jwt=require('jsonwebtoken');
require('dotenv').config();
const mail=new MailSender();
const fs=require('fs');
const AdminSchema = require('../models/AdminModel');



const repositoryUser = new Repository();

class UserService {

  registerService = async (data) => {

	try{
		const { firstName, lastName, email, password } =data;
		if (!firstName || !lastName || !email || !password) {
			return {
				message:"All fields are required",
				success:false,
				statusCode:400,
			}
		}
	
		
		const response = await repositoryUser.registerRepository(data);

		if(response.statusCode===400){
			return {
				message:response.message,
				statusCode:400,
				success:false

			}
		}

		if(!response){
			return {
				message:"User already Exists",
				success:false,
				statusCode:400,
			}
		}


		const option={
			id:response._id,
			email:response.email,
			role:response.role
		}

		const token=jwt.sign(option,process.env.JWT_SECRET,{
			expiresIn:"1d"
		})
		return {
			user:response,
			token
		}

	}catch(err){
		console.log(`error occured in Register services:  ${err}`);
		throw err;
	}
   
  };

  loginService=async(data)=>{
	try{
		const {email,password}=data;
		if(!email || !password){
			return {
				message:"All fields are required",
				success:false,
				statusCode:400,
			}

		}
		const response=await repositoryUser.loginRepository(data);
		// console.log(response)

		if(!response){
			return{
				message:"user doesn't Exist please Register yourself ",
				success:false,
				statusCode:400,
			}
		}

		if(response=='invalid Creadentials'){
			return {
				message:"invalid credentials",
				success:false,
				statusCode:400,
				
			}
		}
		

		const option={
			id:response._id,
			email:response.email,
			role:response.role
		};


		const token=jwt.sign(option, process.env.JWT_SECRET,{
			expiresIn:"1d"
		})

		return {
			user:response,
			token
		}


	}catch(err){
		console.log(`error occured in login service : ${err}`);
		throw err;

	}
  }

  getUserService=async(data)=>{
	try{
		const id=data;
		if(!id){
			return {
				message:"User not authenticated",
				statusCode:400
			}
		}

		const response=await repositoryUser.getUserRepository(id);
		if(!response){
			return{
				message:"user not exist..",
				statusCode:400
			}

		}
		return response;

	}catch(err){

	}
  }

  updatePasswordService=async(user,data)=>{
	try{
		const id=user;
		const {oldPassword,newPassword,confirmPassword}=data;
		if(!oldPassword || ! newPassword || !confirmPassword){
			return {
				message:"All fields Required..",
				statusCode:400
			}
		}

		if(newPassword!==confirmPassword){
			return {
				message:"Password and confirm password must be same",
				statusCode:400
			}
		}

		const response=await repositoryUser.updatePasswordRepository(id,data);
		if(!response){
			return {
				message:"Enter valid Old password",
				statusCode:400
			}
		};

		return response;

		
	}catch(err){
		console.log(`error occured in update password service : ${err}`);
		throw err;
	}
  }

  updateProfileService=async(id,data)=>{
	try{
			const {firstName,lastName,gender,about}=data;
			if(!firstName || !lastName || !gender || !about){
				return {
					message:"All fields are required",
					statusCode:400
				}
			}
			const response=await repositoryUser.updateProfileRepository(id,data);
			if(!response){
				return{
					message:"user not found",
					statusCode:400
				}
			}
			return response;

	}catch(err){
		console.log(`error occured in updateProfileService : ${err}`);
		throw err;
	}
  }


  updateAvtarService=async(id,data)=>{
	try{
		const file=data;
		// console.log(file);
		if(!file){
			return {
				message:"Please Select an Image",
				statusCode:400,
				success:false
			}
		}

		const result=await cloudinary.uploader.upload(file.path,{
			allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
			folder: 'profilePicture',   
			quality: 'auto:low',          
			// format: 'webp,jpg,png,jpeg',                
			transformation: [
			  { width: 800, height: 600, crop: 'limit' }  // Resize while maintaining aspect ratio
			]
		  });

		//   console.log("Result",result);



		if(!result){
			return {
				message:"Unable to upload Picture",
				statusCode:400,
				success:false
			}
		}

		fs.unlink(file.path,(err)=>{
			if(err){
				console.log('unable to delete file from path: ',err);
			}else{
				// console.log(`file deleted `);
			}
		})

		const response=await repositoryUser.updateAvtarRepository(id,result.secure_url);

		// console.log(response);
		if(!response){
			return {
				message:"Unable to find user",
				statusCode:400,
				success:false,
			}
		}

		// console.log(response);
		return response;
		

	}catch(err){
		console.log(`Error Occured updateAvtarService : ${err.message}`);
		throw `service ${err}`
	}
  }

  getAlluserService=async()=>{
	try{
		const response=await repositoryUser.getAlluserRepository();
		if(!response){
			return {
				message:"There is no user Available..",
				statusCode:400
			}
		}

		return response;

	}catch(err){
		console.log(`Error occured in get All user : ${err}`);
		throw err;
	}
  }







sendAccountDeleteRequestService=async(id)=>{
		try{
			if(!id){
				return {
					message:"please provide user details to delete",
					statusCode:400
				}
			}

			let response=await AdminSchema.findOne();
			if(!response){
				response=await AdminSchema.create();

			}



			response.deleteRequest.push(id);
			await response.save();
			return true;

			

		}catch(err){
			console.log(`Error Occured in send Account Delete Request service : ${err}`);
			throw err;
		}
	}







}

module.exports = UserService;
