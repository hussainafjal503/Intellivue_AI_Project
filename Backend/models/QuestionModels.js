const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({
	interviewId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Interview"
	},
	question:{
		type:String,
		trim:true
	},
	userAnswer:{
		type:String,
		trim:true,
	},
	feedBack:{
		type:String,
		trim:true,
	}

},{timestamps:true});

module.exports=mongoose.model("Question",questionSchema);