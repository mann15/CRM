import { changePasswordService } from "../../services/other/auth.js";
import {
  fetchUserByIdService,
  fetchAllUserService,
  fetchUserByNameService,
  addUserService,
  deleteUserService,
} from "../../services/other/user.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchUserByIdController = catchAsync(async (req, res) => {
  const { userId } = req.body;
  if (userId) {
    const responseUserData = await fetchUserByIdService(userId);
    if (responseUserData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUserData,
        message: "User Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for UserId",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the userId",
    });
  }
});

export const fetchUserByNameController = catchAsync(async (req, res) => {
  const { userName } = req.body;
  if (userName) {
    const responseUserData = await fetchUserByNameService(userName);
    if (responseUserData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUserData,
        message: "User Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for UserName",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the userName",
    });
  }
});

export const fetchAllUserController = catchAsync(async (req, res) => {
  const responseUserData = await fetchAllUserService();
  if (responseUserData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseUserData,
      message: "All User Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of User",
    });
  }
});

export const addUserController = catchAsync(async (req, res) => {
  const userData = req.body;
  if (
    userData.userName &&
    userData.userPassword &&
    userData.userType &&
    userData.userEmail &&
    userData.userAccess &&
    userData.userEmployeeId &&
    userData.userStatus
  ) {
    const responseUserData = await addUserService(userData);
    if (responseUserData && Object.keys(responseUserData).length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUserData,
        message: "User Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "User Data is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Data",
    });
  }
});

export const updateUserController = catchAsync(async (req, res) => {
  const userData = req.body;
  if (userData.userId && userData.userPassword) {
    const responseUserData = await changePasswordService(userData);
    console.log(responseUserData);

    if (responseUserData.length === 1 && responseUserData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseUserData,
        message: "User Data Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Data Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the User data",
    });
  }
});

export const deleteUserController = catchAsync(async (req, res) => {
  const userData = req.body;
  if (userData && userData.userId) {
    const responseUserData = await deleteUserService(userData);
    if (responseUserData) {
      return res.status(200).json({
        success: true,
        data: responseUserData,
        message: "User Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "User not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the UserId",
    });
  }
});
