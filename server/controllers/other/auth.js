import {
  loginService,
  changePasswordService,
} from "../../services/other/auth.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const loginController = catchAsync(async (req, res) => {
  const loginData = req.body;
  if (loginData.userName && loginData.userPassword) {
    const responseLoginData = await loginService(loginData);
    if (responseLoginData) {
      req.session.user = responseLoginData;
      return res.status(200).json({
        success: true,
        data: responseLoginData,
        message: "User logged-in Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Username or Password is incorrect",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the required login details.",
    });
  }
});

export const logoutController = catchAsync(async (req, res) => {
  req.session.user = null;
  return res.status(200).json({
    success: true,
    message: "User logged-out Successfully",
  });
});

export const changePasswordController = catchAsync(async (req, res) => {
  const userData = req.body;
  userData.sessionUserId = req?.session?.user?.userId;
  userData.sessionUserName = req?.session?.user?.userName;
  userData.sessionUserType = req?.session?.user?.userType;
  userData.sessionUserEmployeeId = req?.session?.user?.userEmployeeId;
  if (userData.userId && userData.userPassword) {
    const responseUserData = await changePasswordService(userData);
    if (responseUserData.length === 1 && responseUserData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseUserData,
        message: "Password changed Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Password change failed",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the required details.",
    });
  }
});

export const getProfileController = catchAsync(async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req?.session?.user,
    message: "User Profile fetched Successfully",
  });
});
