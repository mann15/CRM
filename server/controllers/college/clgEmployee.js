import { collegeDepartmentEmployeeSchema } from "../../config/validation.js";
import {
  updateClgEmployeeService,
  addClgEmployeeService,
  fetchClgEmployeeByNameService,
  deleteClgEmployeeService,
  fetchClgEmployeeByIdService,
  fetchAllClgEmployeeService,
  fetchClgEmployeeByLimitService,
  fetchEmpDataService,
  addClgEmployeeDesignationService,
  updateClgEmployeeDesignationService,
} from "../../services/college/clgEmployee.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchClgEmployeeByIdController = catchAsync(async (req, res) => {
  const { employeeId } = req.body;
  if (employeeId) {
    const responseClgEmployeeData = await fetchClgEmployeeByIdService(
      employeeId
    );
    if (responseClgEmployeeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgEmployeeData,
        message: "College employee Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College employee",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the college employee Id",
    });
  }
});

export const fetchEmpDataController = catchAsync(async (req, res) => {
  const { collegeId } = req.body;
  if (collegeId) {
    const responseClgEmployeeData = await fetchEmpDataService(collegeId);
    if (responseClgEmployeeData) {
      return res.status(200).json({
        success: true,
        data: responseClgEmployeeData,
        message: "College employee Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College employee",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the college employee Id",
    });
  }
});

export const fetchClgEmployeeByNameController = catchAsync(async (req, res) => {
  const { employeeName } = req.body;
  if (employeeName) {
    const responseClgEmployeeData = await fetchClgEmployeeByNameService(
      employeeName
    );
    if (responseClgEmployeeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgEmployeeData,
        message: "College employee Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College employee",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the College employee",
    });
  }
});

export const fetchAllClgEmployeeController = catchAsync(async (req, res) => {
  const responseClgEmployeeData = await fetchAllClgEmployeeService();
  if (responseClgEmployeeData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseClgEmployeeData,
      message: "All College employee Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of College employee",
    });
  }
});

export const fetchClgEmployeeByLimitController = catchAsync(
  async (req, res) => {
    const clgEmployeeData = req.body;
    const responseClgEmployeeData = await fetchClgEmployeeByLimitService(
      clgEmployeeData
    );
    if (responseClgEmployeeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgEmployeeData,
        message: "College employee Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found of College employee",
      });
    }
  }
);

export const addClgEmployeeController = catchAsync(async (req, res) => {
  const clgEmployeeData = req.body;
  const { error, value } =
    collegeDepartmentEmployeeSchema.validate(clgEmployeeData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.collegeDepartmentId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseClgEmployeeData = await addClgEmployeeService(value);
      if (
        responseClgEmployeeData &&
        Object.keys(responseClgEmployeeData).length > 0
      ) {
        return res.status(200).json({
          success: true,
          data: responseClgEmployeeData,
          message: "College Employee Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "College Employee is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the College Employee details",
      });
    }
  }
});

export const addClgEmployeeDesignationController = catchAsync(
  async (req, res) => {
    const clgEmployeeData = req.body;

    if (!clgEmployeeData.employeeName) {
      return res.status(400).json({
        success: false,
        message: "Please pass the College Employee details",
      });
    }
    // Adding user session details
    clgEmployeeData.userId = req?.session?.user?.userId;
    clgEmployeeData.userName = req?.session?.user?.userName;
    clgEmployeeData.userType = req?.session?.user?.userType;
    clgEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;

    const responseclgEmployeeData = await addClgEmployeeDesignationService(
      clgEmployeeData
    );

    // Error handling logic
    if (responseclgEmployeeData.message) {
      return res.status(200).json({
        success: false,
        message: responseclgEmployeeData.message,
      });
    }

    // Success response logic
    if (
      responseclgEmployeeData &&
      Object.keys(responseclgEmployeeData).length
    ) {
      return res.status(200).json({
        success: true,
        data: responseclgEmployeeData,
        message: "College Employee Added Successfully",
      });
    }
  }
);

export const updateClgEmployeeController = catchAsync(async (req, res) => {
  const clgEmployeeData = req.body;
  const { error, value } =
    collegeDepartmentEmployeeSchema.validate(clgEmployeeData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.employeeId && value.collegeDepartmentId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseClgEmployeeData = await updateClgEmployeeService(value);
      if (
        responseClgEmployeeData.length === 1 &&
        responseClgEmployeeData[0] == 1
      ) {
        return res.status(200).json({  
          success: true,
          data: responseClgEmployeeData,
          message: "College Employee Updated Successfully",
        });
      } else {
        return res.status(200).json({ 
          success: false,
          message: "College Employee Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the College Employee details",
      });
    }
  }
});

export const updateClgEmployeeDesignationController = catchAsync(
  async (req, res) => {
    const clgEmployeeData = req.body;
    if (clgEmployeeData.employeeId) {
      clgEmployeeData.userId = req?.session?.user?.userId;
      clgEmployeeData.userName = req?.session?.user?.userName;
      clgEmployeeData.userType = req?.session?.user?.userType;
      clgEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseclgEmployeeData = await updateClgEmployeeDesignationService(
        clgEmployeeData
      );
      if (
        responseclgEmployeeData.length === 1 &&
        responseclgEmployeeData[0] === 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseclgEmployeeData,
          message: "College Employee Designation Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message:
            "College Employee Designation Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the College Employee details",
      });
    }
  }
);

export const deleteClgEmployeeController = catchAsync(async (req, res) => {
  const clgEmployeeData = req.body;
  if (clgEmployeeData.employeeId) {
    clgEmployeeData.userId = req?.session?.user?.userId;
    clgEmployeeData.userName = req?.session?.user?.userName;
    clgEmployeeData.userType = req?.session?.user?.userType;
    clgEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;
    const responseClgEmployeeData = await deleteClgEmployeeService(
      clgEmployeeData
    );
    if (responseClgEmployeeData != 0) {
      return res.status(200).json({
        success: true,
        data: responseClgEmployeeData,
        message: "College employee Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "College employee  not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the college employee ID",
    });
  }
});
