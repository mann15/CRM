import {
  updateCmpDeptService,
  deleteCmpDeptService,
  addCmpDeptService,
  fetchCmpDeptByIdService,
  fetchAllCmpDeptService,
} from "../../services/industry/indCmpHasIndCmpDept.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchIndCmpHasIndCmpDeptByIdController = catchAsync(
  async (req, res) => {
    const indCmpHasIndCmpDeptData = req.body;
    if (indCmpHasIndCmpDeptData) {
      const responseIndCmpHasIndCmpDeptData = await fetchCmpDeptByIdService(
        indCmpHasIndCmpDeptData
      );
      if (responseIndCmpHasIndCmpDeptData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpHasIndCmpDeptData,
          message: "IndCmpHasIndCmpDept Data Fetched Successfully",
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
  }
);

export const fetchAllIndCmpHasIndCmpDeptController = catchAsync(
  async (req, res) => {
    const responseIndCmpHasIndCmpDeptData = await fetchAllCmpDeptService();
    if (responseIndCmpHasIndCmpDeptData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpHasIndCmpDeptData,
        message: "IndCmpHasIndCmpDept Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found",
      });
    }
  }
);

export const addIndCmpHasIndCmpDeptController = catchAsync(async (req, res) => {
  const indCmpDeptData = req.body;
  indCmpDeptData.userId = req?.session?.user?.userId;
  indCmpDeptData.userName = req?.session?.user?.userName;
  indCmpDeptData.userType = req?.session?.user?.userType;
  indCmpDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpDeptData.companyId && indCmpDeptData.departmentId) {
    const responseIndCmpHasIndCmpDeptData = await addCmpDeptService(
      indCmpDeptData
    );
    if (
      responseIndCmpHasIndCmpDeptData &&
      Object.keys(responseIndCmpHasIndCmpDeptData).length > 0
    ) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpHasIndCmpDeptData,
        message: "IndCmpHasIndCmpDept Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to Add IndCmpHasIndCmpDept Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the indCmpId and indCmpDeptId",
    });
  }
});

export const updateIndCmpHasIndCmpDeptController = catchAsync(
  async (req, res) => {
    const indCmpDeptData = req.body;
    indCmpDeptData.userId = req?.session?.user?.userId;
    indCmpDeptData.userName = req?.session?.user?.userName;
    indCmpDeptData.userType = req?.session?.user?.userType;
    indCmpDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
    if (
      indCmpDeptData.companyId &&
      indCmpDeptData.departmentId &&
      indCmpDeptData.oldDepartmentId
    ) {
      const responseIndCmpHasIndCmpDeptData = await updateCmpDeptService(
        indCmpDeptData
      );
      if (responseIndCmpHasIndCmpDeptData.error) {
        return res.status(200).json({
          success: false,
          message: responseIndCmpHasIndCmpDeptData.error,
        });
      }
      if (
        responseIndCmpHasIndCmpDeptData.length === 1 &&
        responseIndCmpHasIndCmpDeptData[0] == 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpHasIndCmpDeptData,
          message: "IndCmpHasIndCmpDept Data Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Update IndCmpHasIndCmpDept Data",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the id, indCmpId and indCmpDeptId",
      });
    }
  }
);

export const deleteIndCmpHasIndCmpDeptController = catchAsync(
  async (req, res) => {
    const indCmpDeptData = req.body;
    indCmpDeptData.userId = req?.session?.user?.userId;
    indCmpDeptData.userName = req?.session?.user?.userName;
    indCmpDeptData.userType = req?.session?.user?.userType;
    indCmpDeptData.userEmployeeId = req?.session?.user?.userEmployeeId;
    if (
      indCmpDeptData.companyDepartmentId ||
      (indCmpDeptData.departmentId && indCmpDeptData.companyId)
    ) {
      const responseIndCmpHasIndCmpDeptData = await deleteCmpDeptService(
        indCmpDeptData
      );
      if (responseIndCmpHasIndCmpDeptData != 0) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpHasIndCmpDeptData,
          message: "IndCmpHasIndCmpDept Data Deleted Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Delete IndCmpHasIndCmpDept Data",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the id",
      });
    }
  }
);
