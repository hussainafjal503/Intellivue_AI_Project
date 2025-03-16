const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async() => {
    try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`DB connected successfully..:)`);

    }catch(err){
      console.log(`unable to connect with database ${err}`);
    }
   
};

module.exports={
	dbConnect
} 