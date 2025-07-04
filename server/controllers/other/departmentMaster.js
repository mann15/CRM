import { departmentSchema } from "../../config/validation.js";
import {
  updateDepartmentService,
  addDepartmentService,
  fetchDepartmentByNameService,
  deleteDepartmentService,
  fetchDepartmentByIdService,
  fetchAllDepartmentService,
} from "../../services/other/departmentMaster.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchDepartmentByIdController = catchAsync(async (req, res) => {
  const { departmentId } = req.body;
  if (departmentId) {
    const responseDepartmentData = await fetchDepartmentByIdService(
      departmentId
    );
    if (responseDepartmentData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseDepartmentData,
        message: "department Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for departmentId",
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please pass the departmentId",
    });
  }
});

export const fetchDepartmentByNameController = catchAsync(async (req, res) => {
  const { departmentName } = req.body;
  if (departmentName) {
    const responseDepartmentData = await fetchDepartmentByNameService(
      departmentName
    );
    if (responseDepartmentData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseDepartmentData,
        message: "department Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for departmentName",
      });
    }
  } else {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please pass the departmentName",
    });
  }
});

export const fetchAllDepartmentController = catchAsync(async (req, res) => {
  const responseDepartmentData = await fetchAllDepartmentService();
  if (responseDepartmentData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseDepartmentData,
      message: "All department Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of department",
    });
  }
});

export const addDepartmentController = catchAsync(async (req, res) => {
  const departmentData = req.body;
  const { error, value } = departmentSchema.validate(departmentData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.departmentName) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseDepartmentData = await addDepartmentService(value);
      if (
        responseDepartmentData &&
        Object.keys(responseDepartmentData).length > 0
      ) {
        if (responseDepartmentData.message) {
          return res.status(200).json({
            success: false,
            message: responseDepartmentData.message,
          });
        }
        return res.status(200).json({
          success: true,
          data: responseDepartmentData,
          message: "department Data Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "department Data is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please pass the departmentName",
      });
    }
  }
});

export const updateDepartmentController = catchAsync(async (req, res) => {
  const departmentData = req.body;
  const { error, value } = departmentSchema.validate(departmentData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.departmentId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseDepartmentData = await updateDepartmentService(value);
      if (
        responseDepartmentData.length === 1 &&
        responseDepartmentData[0] === 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseDepartmentData,
          message: "department Data Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Data Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please pass the department data",
      });
    }
  }
});

export const deleteDepartmentController = catchAsync(async (req, res) => {
  const departmentData = req.body;
  departmentData.userId = req?.session?.user?.userId;
  departmentData.userName = req?.session?.user?.userName;
  departmentData.userType = req?.session?.user?.userType;
  departmentData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (departmentData.departmentId) {
    const responseDepartmentData = await deleteDepartmentService(
      departmentData
    );
    if (responseDepartmentData) {
      return res.status(200).json({
        success: true,
        data: responseDepartmentData,
        message: "department Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "department not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the departmentId",
    });
  }
});
