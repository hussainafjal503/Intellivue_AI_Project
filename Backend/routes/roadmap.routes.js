const express = require("express");
const router = express.Router();
const { isAuthenticated, isUser } = require("../middlewares/Auth.middleware");
const RoadMapController = require("../controllers/roadMapController");

const controllerRoadMap = new RoadMapController();

router.post(
  "/create-goal",
  isAuthenticated,
  isUser,
  controllerRoadMap.createGoalController
);

router.get(
  "/get-roadmap/:id",
  isAuthenticated,
  isUser,
  controllerRoadMap.generateRoadMapController
);


router.delete(
  "/delete-roadmap/:id",
  isAuthenticated,
  isUser,
  controllerRoadMap.deleteRoadmapController
);


router.get('/get-all-response',isAuthenticated,isUser,controllerRoadMap.getAllRoadMapResponseController);
router.get('/get-detailById/:id',isAuthenticated,isUser,controllerRoadMap.getDetailsByIdController);







module.exports = router;
