const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({
	totalUser:{
		type:Number,
	},
	resumeCount:{
		type:Number,
	},
	codingCount:{
		type:Number
	},
	interviewCount:{
		type:Number
	},
	messageCount:{
		type:Number
	},
	deleteRequest:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	}],
	userMessage:[
		{
			email:String,
			message:String,
			phone:String,
			fullName:String
		},
	]
})


module.exports=mongoose.model("AdminSchema",adminSchema);