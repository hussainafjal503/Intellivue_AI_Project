const express=require('express');
const router=express.Router();
const {isAuthenticated,isUser}=require("../middlewares/Auth.middleware");
const ResumeController=require("../controllers/resumeController");

const controllerResume=new ResumeController();


router.post('/search-keyword',isAuthenticated,isUser,controllerResume.keywordResponseController);
router.post('/create-resume',isAuthenticated,isUser,controllerResume.createResumeController);
router.delete('/delete-resume/:id',isAuthenticated,isUser,controllerResume.deleteResumeController);


module.exports=router;