const CustomError = require("../utils/Error");
const ResumeService = require("../services/resumeService");

const serviceResume = new ResumeService();

class ResumeController {

  
  keywordResponseController = async (req, res, next) => {
    try {

      console.log("hello dost")
      const response = await serviceResume.keywordResponseService(req.body);

      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      if (response.statusCode === 200) {
        return res.status(response.statusCode).json({
          message: response.message,
          success: true,
          data: response.data,
        });
      }
    } catch (err) {
      console.log(`error occured in keyword response controller : ${err}`);
      return next(new CustomError("unable to get response", 500));
    }
  };

  
  createResumeController=async(req,res,next)=>{
	try{
		const response=await serviceResume.createResumeService(req.user.id,req.body);
		if(response.statusCode===400){
			return next(new CustomError(response.message,response.statusCode));
		}

		return res.status(200).json({
			message:"Your details is submit to create Resume",
			success:true,
			data:response
		})

	}catch(err){
		console.log(`Error Occured in create resume controller : ${err}`);
		return next(new CustomError("unable to create resume ",500));
	}
  }

  deleteResumeController=async(req,res,next)=>{
    try{
      const response=await serviceResume.deleteResumeService(req.user.id,req.params);
      if(response.statusCode===400){
        return next(new CustomError(response.message,response.statusCode));
      }

      return res.status(200).json({
        message:"resume Deleted successfully..",
        success:true,
        data:response
      })

    }catch(err){
      console.log(`Error Occured in delete Resume controller: ${err}`);
      return next(new CustomError("unable to delete Resume",500));
    }
  }


  downloadResumeController=async(req,res,next)=>{
    try{
      const response=await serviceResume.resumeDownloadService(req.user.id);
      if(!response){
        return next(new CustomError("unable to donwload",500));
      }

      return res.status(200).json({
        message:"resume Downloaded"
      })

    }catch(err){
      console.log( `Error occured in resume download : ${err}`);
      return next(new CustomError("unable to download resume",500));
    }
  }

}

module.exports = ResumeController;
