const express=require('express');
const router=express.Router();

const MailSender=require('../controllers/mailController');
const controllerUser=require('../controllers/userController');
const {isAuthenticated,isAdmin}=require("../middlewares/Auth.middleware");
const{upload}=require('../config/imageUpload')


const userController= new controllerUser();
const mail=new MailSender();



router.post('/otp-send',mail.otpSent);
router.post('/verify',mail.verifyOtp);
router.post('/register',userController.registerController);
router.post('/login',userController.loginController);
router.post('/update-password',isAuthenticated,userController.updatePasswordController);
router.post('/update-profile',isAuthenticated,userController.updateProfileController);
router.post('/pp-update',isAuthenticated,upload.single('image'),userController.updateAvtarController);
router.get('/logout',isAuthenticated,userController.logoutUserController);
router.post('/delete-account',isAuthenticated,userController.sendAccountDeleteRequestController);



router.get('/get-user-detail',isAuthenticated,isAdmin,userController.getUserController);
router.get('/getAll-user',isAuthenticated,isAdmin,userController.getAlluserController);



module.exports=router;