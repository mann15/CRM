import {
  updateClgDeptService,
  deleteClgDeptService,
  addClgDeptService,
  fetchClgDeptByIdService,
  fetchAllClgDeptService,
} from "../../services/college/clgHasDept.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchClgHasDeptByIdController = catchAsync(async (req, res) => {
  const clgHasDeptData = req.body;
  if (clgHasDeptData.collegeId || clgHasDeptData.departmentId) {
    const responseClgHasDeptData = await fetchClgDeptByIdService(
      clgHasDeptData
    );
    if (responseClgHasDeptData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgHasDeptData,
        message: "ClgHasDept Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for id",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the id",
    });
  }
});

export const fetchAllClgHasDeptController = catchAsync(async (req, res) => {
  const responseClgHasDeptData = await fetchAllClgDeptService();
  if (responseClgHasDeptData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseClgHasDeptData,
      message: "ClgHasDept Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found",
    });
  }
});

export const addClgHasDeptController = catchAsync(async (req, res) => {
  const clgDeptData = req.body;
  clgDeptData.userId = req?.session?.user?.userId;
  clgDeptData.userName = req?.session?.user?.userName;
  clgDeptData.userType = req?.session?.user?.userType;
  clgDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (clgDeptData.collegeId && clgDeptData.departmentId) {
    const responseClgHasDeptData = await addClgDeptService(clgDeptData);
    if (
      responseClgHasDeptData &&
      Object.keys(responseClgHasDeptData).length > 0
    ) {
      if (responseClgHasDeptData.message) {
        return res.status(200).json({
          success: false,
          message: responseClgHasDeptData.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: responseClgHasDeptData,
        message: "ClgHasDept Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Add ClgHasDept Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the clgId and deptId",
    });
  }
});

export const updateClgHasDeptController = catchAsync(async (req, res) => {
  const clgDeptData = req.body;
  clgDeptData.userId = req?.session?.user?.userId;
  clgDeptData.userName = req?.session?.user?.userName;
  clgDeptData.userType = req?.session?.user?.userType;
  clgDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (
    clgDeptData.collegeId &&
    clgDeptData.departmentId &&
    clgDeptData.oldDepartmentId
  ) {
    const responseClgHasDeptData = await updateClgDeptService(clgDeptData);
    if (responseClgHasDeptData.error) {
      return res.status(200).json({
        success: false,
        message: responseClgHasDeptData.error,
      });
    }
    if (responseClgHasDeptData.length === 1 && responseClgHasDeptData[0] == 1) {
      return res.status(200).json({
        success: true,
        data: responseClgHasDeptData,
        message: "ClgHasDept Data Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Update ClgHasDept Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the id",
    });
  }
});

export const deleteClgHasDeptController = catchAsync(async (req, res) => {
  const clgDeptData = req.body;
  clgDeptData.userId = req?.session?.user?.userId;
  clgDeptData.userName = req?.session?.user?.userName;
  clgDeptData.userType = req?.session?.user?.userType;
  clgDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (clgDeptData.collegeDepartmentId || (clgDeptData.collegeId && clgDeptData.departmentId)) {
    const responseClgHasDeptData = await deleteClgDeptService(clgDeptData);
    if (responseClgHasDeptData !== 0) {
      return res.status(200).json({
        success: true,
        data: responseClgHasDeptData,
        message: "ClgHasDept Data Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Delete ClgHasDept Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the id",
    });
  }
});
