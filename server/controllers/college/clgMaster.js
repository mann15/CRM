import { collegeSchema } from "../../config/validation.js";
import {
  updateClgService,
  addClgService,
  fetchClgByNameService,
  deleteClgService,
  fetchClgByIdService,
  fetchAllClgService,
  fetchClgByLimitService,
  fetchAllCollegeService,
} from "../../services/college/clgMaster.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchClgByIdController = catchAsync(async (req, res) => {
  const { collegeId } = req.body;
  if (collegeId) {
    const responseClgData = await fetchClgByIdService(collegeId);
    if (responseClgData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgData,
        message: "College Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the college Id",
    });
  }
});

export const fetchClgByNameController = catchAsync(async (req, res) => {
  const { collegeName } = req.body;
  if (collegeName) {
    const responseClgData = await fetchClgByNameService(collegeName);
    if (responseClgData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgData,
        message: "College Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the College name",
    });
  }
});

export const fetchAllClgController = catchAsync(async (req, res) => {
  const responseClgData = await fetchAllClgService();
  if (responseClgData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseClgData,
      message: "All College Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of College",
    });
  }
});

export const fetchClgByLimitController = catchAsync(async (req, res) => {
  const clgData = req.body;
  const responseClgData = await fetchClgByLimitService(clgData);
  if (responseClgData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseClgData,
      message: "College Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of College",
    });
  }
});

export const fetchAllCollegeController = catchAsync(async (req, res) => {
  const responseClgData = await fetchAllCollegeService();
  if (responseClgData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseClgData,
      message: "All College Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of College",
    });
  }
});


export const addClgController = catchAsync(async (req, res) => {
  const clgData = req.body;
  const { error, value } = collegeSchema.validate(clgData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.universityId && value.typeId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseClgData = await addClgService(value);
      if (responseClgData && Object.keys(responseClgData).length > 0) {
        return res.status(200).json({
          success: true,
          data: responseClgData,
          message: "College Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "College is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the College details",
      });
    }
  }
});

export const updateClgController = catchAsync(async (req, res) => {
  const clgData = req.body;
  const { error, value } = collegeSchema.validate(clgData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.collegeId && value.universityId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseClgData = await updateClgService(value);
      if (responseClgData.length === 1 && responseClgData[0] === 1) {
        return res.status(200).json({
          success: true,
          data: responseClgData,
          message: "College Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "College Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the College details",
      });
    }
  }
});

export const deleteClgController = catchAsync(async (req, res) => {
  const clgData = req.body;
  clgData.userId = req?.session?.user?.userId;
  clgData.userName = req?.session?.user?.userName;
  clgData.userType = req?.session?.user?.userType;
  clgData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (clgData.collegeId) {
    const responseClgData = await deleteClgService(clgData);
    if (responseClgData !== 0) {
      return res.status(200).json({
        success: true,
        data: responseClgData,
        message: "College Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "College  not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the college ID",
    });
  }
});
