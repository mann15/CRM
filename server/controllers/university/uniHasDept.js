import {
  updateUniDeptService,
  deleteUniDeptService,
  addUniDeptService,
  fetchUniDeptByIdService,
  fetchAllUniDeptService,
} from "../../services/university/uniHasDept.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchUniHasDeptByIdController = catchAsync(async (req, res) => {
  const uniDeptData = req.body;
  if (uniDeptData) {
    const responseUniHasDeptData = await fetchUniDeptByIdService(uniDeptData);
    if (responseUniHasDeptData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniHasDeptData,
        message: "UniHasDept Data Fetched Successfully",
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

export const fetchAllUniHasDeptController = catchAsync(async (req, res) => {
  const responseUniHasDeptData = await fetchAllUniDeptService();
  if (responseUniHasDeptData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseUniHasDeptData,
      message: "UniHasDept Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found",
    });
  }
});

export const addUniHasDeptController = catchAsync(async (req, res) => {
  const uniDeptData = req.body;
  uniDeptData.userId = req?.session?.user?.userId;
  uniDeptData.userName = req?.session?.user?.userName;
  uniDeptData.userType = req?.session?.user?.userType;
  uniDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (uniDeptData.universityId && uniDeptData.departmentId) {
    const responseUniHasDeptData = await addUniDeptService(uniDeptData);
    if (
      responseUniHasDeptData &&
      Object.keys(responseUniHasDeptData).length > 0
    ) {
      return res.status(200).json({
        success: true,
        data: responseUniHasDeptData,
        message: "UniHasDept Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Add UniHasDept Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the uniId and deptId",
    });
  }
});

export const updateUniHasDeptController = catchAsync(async (req, res) => {
  const uniDeptData = req.body;
  uniDeptData.userId = req?.session?.user?.userId;
  uniDeptData.userName = req?.session?.user?.userName;
  uniDeptData.userType = req?.session?.user?.userType;
  uniDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (
    uniDeptData.universityId &&
    uniDeptData.departmentId &&
    uniDeptData.oldDepartmentId
  ) {
    const responseUniHasDeptData = await updateUniDeptService(uniDeptData);
    if (responseUniHasDeptData.error) {
      return res.status(200).json({
        success: false,
        message: responseUniHasDeptData.error,
      });
    }
    if (
      responseUniHasDeptData.length === 1 &&
      responseUniHasDeptData[0] === 1
    ) {
      return res.status(200).json({
        success: true,
        data: responseUniHasDeptData,
        message: "UniHasDept Data Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Update UniHasDept Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the id, uniId and deptId",
    });
  }
});

export const deleteUniHasDeptController = catchAsync(async (req, res) => {
  const uniDeptData = req.body;
  uniDeptData.userId = req?.session?.user?.userId;
  uniDeptData.userName = req?.session?.user?.userName;
  uniDeptData.userType = req?.session?.user?.userType;
  uniDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (
    uniDeptData.universityDepartmentId ||
    (uniDeptData.universityId && uniDeptData.departmentId)
  ) {
    const responseUniHasDeptData = await deleteUniDeptService(uniDeptData);
    if (responseUniHasDeptData) {
      return res.status(200).json({
        success: true,
        data: responseUniHasDeptData,
        message: "UniHasDept Data Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Delete UniHasDept Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the required data",
    });
  }
});
