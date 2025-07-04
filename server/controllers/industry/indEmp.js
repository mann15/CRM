import { industryEmployeeSchema } from "../../config/validation.js";
import {
  fetchAllIndEmpService,
  fetchIndEmpByIdService,
  fetchIndEmpByNameService,
  addIndEmpService,
  updateIndEmpService,
  deleteIndEmpService,
  fetchEmpByCompanyIdService,
  addIndEmployeeDesignationService,
  updateIndEmployeeDesignationService,
} from "../../services/industry/indEmp.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchAllIndEmpController = catchAsync(async (req, res) => {
  const responseIndEmpData = await fetchAllIndEmpService();
  if (responseIndEmpData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndEmpData,
      message: "All Industry Employee Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of Industry Employee",
    });
  }
});

export const fetchEmpDataByCompanyIdController = catchAsync(
  async (req, res) => {
    const { companyId } = req.body;
    if (companyId) {
      const responseIndEmpData = await fetchEmpByCompanyIdService(companyId);
      if (responseIndEmpData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseIndEmpData,
          message: "Industry Employee Fetched Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "No Data Found of Industry Employee",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry Employee Id",
      });
    }
  }
);

export const fetchIndEmpByIdController = catchAsync(async (req, res) => {
  const { employeeId } = req.body;
  if (employeeId) {
    const responseIndEmpData = await fetchIndEmpByIdService(employeeId);
    if (responseIndEmpData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndEmpData,
        message: "Industry Employee Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found of Industry Employee",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Employee Id",
    });
  }
});

export const fetchIndEmpByNameController = catchAsync(async (req, res) => {
  const { employeeName } = req.body;
  if (employeeName) {
    const responseIndEmpData = await fetchIndEmpByNameService(employeeName);
    if (responseIndEmpData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndEmpData,
        message: "Industry Employee Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found of Industry Employee",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Employee Name",
    });
  }
});

export const addIndEmpController = catchAsync(async (req, res) => {
  const indEmpData = req.body;
  const { error, value } = industryEmployeeSchema.validate(indEmpData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.employeeName && value.companyDepartmentId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseIndEmpData = await addIndEmpService(value);
      if (responseIndEmpData && Object.keys(responseIndEmpData).length > 0) {
        return res.status(200).json({
          success: true,
          data: responseIndEmpData,
          message: "Industry Employee Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Industry Employee is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry Employee details",
      });
    }
  }
});

export const addIndEmployeeDesignationController = catchAsync(
  async (req, res) => {
    const indEmployeeData = req.body;

    if (!indEmployeeData.employeeName) {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry Employee details",
      });
    }
    // Adding user session details
    indEmployeeData.userId = req?.session?.user?.userId;
    indEmployeeData.userName = req?.session?.user?.userName;
    indEmployeeData.userType = req?.session?.user?.userType;
    indEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;

    const responseindEmployeeData = await addIndEmployeeDesignationService(
      indEmployeeData
    );

    // Error handling logic
    if (responseindEmployeeData.message) {
      return res.status(200).json({
        success: false,
        message: responseindEmployeeData.message,
      });
    }

    // Success response logic
    if (
      responseindEmployeeData &&
      Object.keys(responseindEmployeeData).length
    ) {
      return res.status(200).json({
        success: true,
        data: responseindEmployeeData,
        message: "Industry Employee Added Successfully",
      });
    }
  }
);

export const updateIndEmpController = catchAsync(async (req, res) => {
  const indEmpData = req.body;
  const { error, value } = industryEmployeeSchema.validate(indEmpData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.employeeId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseIndEmpData = await updateIndEmpService(value);
      if (responseIndEmpData.length === 1 && responseIndEmpData[0] == 1) {
        return res.status(200).json({
          success: true,
          data: responseIndEmpData,
          message: "Industry Employee Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Industry Employee is not updated, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry Employee details",
      });
    }
  }
});

export const updateIndEmployeeDesignationController = catchAsync(
  async (req, res) => {
    const indEmployeeData = req.body;
    if (indEmployeeData.employeeId) {
      indEmployeeData.userId = req?.session?.user?.userId;
      indEmployeeData.userName = req?.session?.user?.userName;
      indEmployeeData.userType = req?.session?.user?.userType;
      indEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseindEmployeeData = await updateIndEmployeeDesignationService(
        indEmployeeData
      );
      if (
        responseindEmployeeData.length === 1 &&
        responseindEmployeeData[0] === 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseindEmployeeData,
          message: "College industry Designation Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message:
            "Industry Employee Designation Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry Employee details",
      });
    }
  }
);

export const deleteIndEmpController = catchAsync(async (req, res) => {
  const indEmpData = req.body;
  indEmpData.userId = req?.session?.user?.userId;
  indEmpData.userName = req?.session?.user?.userName;
  indEmpData.userType = req?.session?.user?.userType;
  indEmpData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indEmpData.employeeId) {
    const responseIndEmpData = await deleteIndEmpService(indEmpData);
    if (responseIndEmpData != 0) {
      return res.status(200).json({
        success: true,
        data: responseIndEmpData,
        message: "Industry Employee Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Industry Employee is not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Employee details",
    });
  }
});
