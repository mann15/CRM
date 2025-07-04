import {
  updateClgEmployeeHasDesignationService,
  deleteClgEmployeeHasDesignationService,
  addClgEmployeeHasDesignationService,
  fetchClgEmployeeHasDesignationByIdService,
  fetchAllClgEmployeeHasDesignationService,
} from "../../services/college/clgEmployeeHasDesignation.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchClgEmployeeHasDesignationByIdController = catchAsync(
  async (req, res) => {
    const clgEmpDesignationData = req.body;
    if (
      clgEmpDesignationData.employeeId &&
      clgEmpDesignationData.designationId
    ) {
      const responseClgEmpDesignationData =
        await fetchClgEmployeeHasDesignationByIdService(clgEmpDesignationData);
      if (responseClgEmpDesignationData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseClgEmpDesignationData,
          message: "College Employee Designation Data Fetched Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "No Data Found for this id",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the required details",
      });
    }
  }
);

export const fetchAllClgEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const responseClgEmpDesignationData =
      await fetchAllClgEmployeeHasDesignationService();
    if (responseClgEmpDesignationData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgEmpDesignationData,
        message: "College Employee Designation Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found",
      });
    }
  }
);

export const addClgEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const clgEmpDesignationData = req.body;
    clgEmpDesignationData.userId = req?.session?.user?.userId;
    clgEmpDesignationData.userName = req?.session?.user?.userName;
    clgEmpDesignationData.userType = req?.session?.user?.userType;
    clgEmpDesignationData.userEmployeeId = req?.session?.user?.userEmployeeId;
    if (
      clgEmpDesignationData.employeeId &&
      clgEmpDesignationData.designationId
    ) {
      const responseClgEmpDesignationData =
        await addClgEmployeeHasDesignationService(clgEmpDesignationData);
      if (
        responseClgEmpDesignationData &&
        Object.keys(responseClgEmpDesignationData).length > 0
      ) {
        return res.status(200).json({
          success: true,
          data: responseClgEmpDesignationData,
          message: "College employee designation Data Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Add College employee designation Data",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the employeeId and designationId",
      });
    }
  }
);

export const updateClgEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const clgEmpDesignationData = req.body;
    clgEmpDesignationData.userId = req?.session?.user?.userId;
    clgEmpDesignationData.userName = req?.session?.user?.userName;
    clgEmpDesignationData.userType = req?.session?.user?.userType;
    clgEmpDesignationData.userEmployeeId = req?.session?.user?.userEmployeeId;

    if (
      clgEmpDesignationData.employeeId &&
      clgEmpDesignationData.designationId &&
      clgEmpDesignationData.oldDesignationId
    ) {
      const responseClgEmpDesignationData =
        await updateClgEmployeeHasDesignationService(clgEmpDesignationData);
      if (responseClgEmpDesignationData.error) {
        return res.status(200).json({
          success: false,
          message: responseClgEmpDesignationData.error,
        });
      }
      if (
        responseClgEmpDesignationData.length === 1 &&
        responseClgEmpDesignationData[0] == 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseClgEmpDesignationData,
          message: "College employee designation Data Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Update College employee designation Data",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the id, employeeId and designationId",
      });
    }
  }
);

export const deleteClgEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const clgEmpDesignationData = req.body;
    clgEmpDesignationData.userId = req?.session?.user?.userId;
    clgEmpDesignationData.userName = req?.session?.user?.userName;
    clgEmpDesignationData.userType = req?.session?.user?.userType;
    clgEmpDesignationData.userEmployeeId = req?.session?.user?.userEmployeeId;
    if (
      clgEmpDesignationData.employeeId &&
      clgEmpDesignationData.designationId
    ) {
      const responseClgEmpDesignationData =
        await deleteClgEmployeeHasDesignationService(clgEmpDesignationData);
      if (responseClgEmpDesignationData != 0) {
        return res.status(200).json({
          success: true,
          data: responseClgEmpDesignationData,
          message: "College employee designation Data Deleted Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Delete College employee designation Data",
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
