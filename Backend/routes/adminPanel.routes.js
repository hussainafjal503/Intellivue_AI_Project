const express=require('express');
const router=express.Router();
const {isAuthenticated,isAdmin}=require("../middlewares/Auth.middleware");

const adminController=require('../controllers/adminController');
const contAdmin=new adminController();

router.get('/getData-admin',isAuthenticated,isAdmin,contAdmin.getAdminDataController);

router.get('/getMessage-admin',isAuthenticated,isAdmin,contAdmin.getAllMessageController);

router.get('/getDeleteRequest-admin',isAuthenticated,isAdmin,contAdmin.getAllDeletedRequestController);

router.post('/send-message',contAdmin.sendMessageRequestController);

router.delete('/delete-message/:id',isAuthenticated,isAdmin,contAdmin.deleteMessageController);

router.put('/approve-request/:id',isAuthenticated,isAdmin,contAdmin.approveDeleteRequestController)




module.exports=router;