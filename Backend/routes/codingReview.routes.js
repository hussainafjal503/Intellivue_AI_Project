const express=require('express');
const router=express.Router();
const {isAuthenticated,isUser}=require("../middlewares/Auth.middleware");
const CodeReviewController=require('../controllers/codingReviewController');
const ReviewCode=new CodeReviewController();

router.get('/create-code',isAuthenticated,isUser,ReviewCode.createCodingController);
router.post('/submit-code',isAuthenticated,isUser,ReviewCode.submitCodeAnswerController);
router.get('/get-codeReview',isAuthenticated,isUser,ReviewCode.getCodeReviewController);

router.delete('/delete-review/:id',isAuthenticated,isUser,ReviewCode.deleteCodeReviewController);
router.get('/get-codebyId/:id',isAuthenticated,isUser,ReviewCode.getCodeByIdController);

router.get('/getAll-review',isAuthenticated,isUser,ReviewCode.getAllReviewController);



module.exports=router;