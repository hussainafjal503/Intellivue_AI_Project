const express=require('express');
const router=express.Router();
const {isAuthenticated,isUser}=require("../middlewares/Auth.middleware");

const InterviewController=require('../controllers/interviewController');
const controllerInterview=new InterviewController();


router.post('/create-interview',isAuthenticated,isUser,controllerInterview.createInterviewController);
router.get("/getall-interview",isAuthenticated,isUser,controllerInterview.getAllInterviewController);
router.get('/getInterview-detail/:id',isAuthenticated,isUser,controllerInterview.getInterviewDetailByIdController);
router.put('/:id/add-question',isAuthenticated,isUser,controllerInterview.addQuestionController);
router.put('/:id/submit-answer',isAuthenticated,isUser,controllerInterview.submitAnswerController);
router.put('/:id/ai-feedback',isAuthenticated,isUser,controllerInterview.aiResponseController);
router.delete('/delete-interview/:id',isAuthenticated,isUser,controllerInterview.deleteInterviewController);


module.exports=router;