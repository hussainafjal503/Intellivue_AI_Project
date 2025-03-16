const mongoose = require("mongoose");

const RoadMapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  goals:
	{
		type:String,
	}
  ,
  resources:{
    type:String,
  },
  completed:{
    type:Boolean,
    default:false,
 
  }

},{timestamps:true});

module.exports = mongoose.model("RoadMaps", RoadMapSchema);
