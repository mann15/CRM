import {
  updateUniEmployeeHasDesignationService,
  deleteUniEmployeeHasDesignationService,
  addUniEmployeeHasDesignationService,
  fetchUniEmployeeHasDesignationByIdService,
  fetchAllUniEmployeeHasDesignationService,
} from "../../services/university/uniEmployeeHasDesignation.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchUniEmployeeHasDesignationByIdController = catchAsync(
  async (req, res) => {
    const uniEmpDesignationData = req.body;
    if (
      uniEmpDesignationData.employeeId &&
      uniEmpDesignationData.designationId
    ) {
      const responseUniEmpDesignationData =
        await fetchUniEmployeeHasDesignationByIdService(uniEmpDesignationData);
      if (responseUniEmpDesignationData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseUniEmpDesignationData,
          message: "University Employee Designation Data Fetched Successfully",
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
        message: "Please pass the id",
      });
    }
  }
);

export const fetchAllUniEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const responseUniEmpDesignationData =
      await fetchAllUniEmployeeHasDesignationService();
    if (responseUniEmpDesignationData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniEmpDesignationData,
        message: "University Employee Designation Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found",
      });
    }
  }
);

export const addUniEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const uniEmpDesignationData = req.body;
    uniEmpDesignationData.userId = req?.session?.user?.userId;
    uniEmpDesignationData.userName = req?.session?.user?.userName;
    uniEmpDesignationData.userType = req?.session?.user?.userType;
    uniEmpDesignationData.userEmployeeId = req?.session?.user?.userEmployeeId;
    if (
      uniEmpDesignationData.employeeId &&
      uniEmpDesignationData.designationId
    ) {
      const responseUniEmpDesignationData =
        await addUniEmployeeHasDesignationService(uniEmpDesignationData);
      if (
        responseUniEmpDesignationData &&
        Object.keys(responseUniEmpDesignationData).length > 0
      ) {
        return res.status(200).json({
          success: true,
          data: responseUniEmpDesignationData,
          message: "University employee designation Data Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Add University employee designation Data",
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

export const updateUniEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const uniEmpDesignationData = req.body;
    uniEmpDesignationData.userId = req?.session?.user?.userId;
    uniEmpDesignationData.userName = req?.session?.user?.userName;
    uniEmpDesignationData.userType = req?.session?.user?.userType;
    uniEmpDesignationData.userEmployeeId = req?.session?.user?.userEmployeeId;

    if (
      uniEmpDesignationData.employeeId &&
      uniEmpDesignationData.designationId &&
      uniEmpDesignationData.oldDesignationId
    ) {
      const responseUniEmpDesignationData =
        await updateUniEmployeeHasDesignationService(uniEmpDesignationData);
      if (responseUniEmpDesignationData.error) {
        return res.status(200).json({
          success: false,
          message: responseUniEmpDesignationData.error,
        });
      }
      if (
        responseUniEmpDesignationData.length === 1 &&
        responseUniEmpDesignationData[0] == 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseUniEmpDesignationData,
          message: "University employee designation Data Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Update University employee designation Data",
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

export const deleteUniEmployeeHasDesignationController = catchAsync(
  async (req, res) => {
    const uniEmpDesignationData = req.body;
    uniEmpDesignationData.userId = req?.session?.user?.userId;
    uniEmpDesignationData.userName = req?.session?.user?.userName;
    uniEmpDesignationData.userType = req?.session?.user?.userType;
    uniEmpDesignationData.userEmployeeId = req?.session?.user?.userEmployeeId;
    if (
      uniEmpDesignationData.employeeId &&
      uniEmpDesignationData.designationId
    ) {
      const responseUniEmpDesignationData =
        await deleteUniEmployeeHasDesignationService(uniEmpDesignationData);
      if (responseUniEmpDesignationData) {
        return res.status(200).json({
          success: true,
          data: responseUniEmpDesignationData,
          message: "University employee designation Data Deleted Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Failed to Delete University employee designation Data",
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
