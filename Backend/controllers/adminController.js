const CustomError = require("../utils/Error");
const adminService = require("../services/adminService");
const serviceAdmin = new adminService();

class adminController {
  getAdminDataController = async (req, res, next) => {
    try {
      const response = await serviceAdmin.getAdminDataService(req.user.id);
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      if (!response) {
        return res.status(200).json({
          message: "data not found",
          success: true,
        });
      }
      return res.status(200).json({
        message: "data fetched",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`error occured in getAdminData Controller : ${err}`);
      return next(new CustomError("unable to get Data", 500));
    }
  };

  getAllMessageController = async (req, res, next) => {
    try {
      const response = await serviceAdmin.getAllMessageService(req.user.id);

      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "message fetched",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error Occured in get user Message controller : ${err}`);
      return next(new CustomError("unable to get user message", 500));
    }
  };

  getAllDeletedRequestController = async (req, res, next) => {
    try {
      const response = await serviceAdmin.getAllDeletedRequestService(req.user.id);
      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "data fetched",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(
        `Error Occured in get ALL delted Request Controller : ${err}`
      );
      return next(new CustomError("unable to get all delete Request", 500));
    }
  };

  sendMessageRequestController = async (req, res, next) => {
    try {
      const response = await serviceAdmin.sendMessageRequestService(req.body);

      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "message fetched",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error occured in send message Controller  : ${err}`);
      return next(new CustomError("unable to send message", 500));
    }
  };

  deleteMessageController = async (req, res, next) => {
    try {
      const response = await serviceAdmin.deleteMessageService(req.params);

      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "message fetched",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error OCcured in delete Message Controller  : ${err}`);
      return next(new CustomError("unable to delete Message", 500));
    }
  };

  approveDeleteRequestController = async (req, res, next) => {
    try {
      const response = await serviceAdmin.approveDeleteRequestService(
        req.user.id,
        req.params
      );

      if (response.statusCode === 400) {
        return next(new CustomError(response.message, response.statusCode));
      }

      return res.status(200).json({
        message: "Account deleted",
        success: true,
        data: response,
      });
    } catch (err) {
      console.log(`Error Occured in approveDelete Request Controller : ${err}`);
      return next(new CustomError("unablt to approve delete request", 500));
    }
  };
}

module.exports = adminController;
