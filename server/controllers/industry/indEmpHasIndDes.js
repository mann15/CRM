import {
  fetchEmpDesByIdService,
  fetchAllEmpDesService,
  addEmpDesService,
  updateEmpDesService,
  deleteEmpDesService,
} from "../../services/industry/indEmpHasIndDes.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchIndEmpHasIndDesByIdController = catchAsync(
  async (req, res) => {
    const empDesData = req.body;
    if (empDesData) {
      const responseEmpDesData = await fetchEmpDesByIdService(empDesData);
      if (responseEmpDesData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseEmpDesData,
          message: "EmpDes Data Fetched Successfully",
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

export const fetchAllIndEmpHasIndDesController = catchAsync(
  async (req, res) => {
    const responseEmpDesData = await fetchAllEmpDesService();
    if (responseEmpDesData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseEmpDesData,
        message: "EmpDes Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found",
      });
    }
  }
);

export const addIndEmpHasIndDesController = catchAsync(async (req, res) => {
  const empDesData = req.body;
  empDesData.userId = req?.session?.user?.userId;
  empDesData.userName = req?.session?.user?.userName;
  empDesData.userType = req?.session?.user?.userType;
  empDesData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (empDesData.employeeId && empDesData.designationId) {
    const responseEmpDesData = await addEmpDesService(empDesData);
    if (responseEmpDesData && Object.keys(responseEmpDesData).length > 0) {
      return res.status(200).json({
        success: true,
        data: responseEmpDesData,
        message: "EmpDes Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to add EmpDes Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the data",
    });
  }
});

export const updateIndEmpHasIndDesController = catchAsync(async (req, res) => {
  const empDesData = req.body;
  empDesData.userId = req?.session?.user?.userId;
  empDesData.userName = req?.session?.user?.userName;
  empDesData.userType = req?.session?.user?.userType;
  empDesData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (
    empDesData.employeeId &&
    empDesData.designationId &&
    empDesData.oldDesignationId
  ) {
    const responseEmpDesData = await updateEmpDesService(empDesData);
    if (responseEmpDesData.error) {
      return res.status(200).json({
        success: false,
        message: responseEmpDesData.error,
      });
    }
    if (responseEmpDesData.length === 1 && responseEmpDesData[0] == 1) {
      return res.status(200).json({
        success: true,
        data: responseEmpDesData,
        message: "EmpDes Data Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to update EmpDes Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the data",
    });
  }
});

export const deleteIndEmpHasIndDesController = catchAsync(async (req, res) => {
  const empDesData = req.body;
  empDesData.userId = req?.session?.user?.userId;
  empDesData.userName = req?.session?.user?.userName;
  empDesData.userType = req?.session?.user?.userType;
  empDesData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (empDesData.employeeId && empDesData.designationId) {
    const responseEmpDesData = await deleteEmpDesService(empDesData);
    if (responseEmpDesData != 0) {
      return res.status(200).json({
        success: true,
        data: responseEmpDesData,
        message: "EmpDes Data Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Failed to delete EmpDes Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the data",
    });
  }
});
