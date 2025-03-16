require('dotenv').config();
const axios=require("axios");



const fetchAiData=async(prompt)=>{


	try{

		const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
	 
		   const response = await axios.post(
			 endpoint,
			 {
			   contents: [
				 {
				   parts: [
					 {
					   text: prompt,
					 },
				   ],
				 },
			   ],
			 },
			 {
			   headers: {
				 "Content-Type": "application/json",
			   },
			 }
		   );
	 
		   const apiresponse = response.data.candidates[0].content.parts[0].text;
		   return apiresponse;
 
 }catch(err){
	 console.log(`error occured while fetching the data ${err}`);
	 throw err
 }

}

module.exports=fetchAiData;