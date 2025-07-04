import { universityEmployeeSchema } from "../../config/validation.js";
import {
  updateUniEmployeeService,
  addUniEmployeeService,
  fetchUniEmployeeByNameService,
  deleteUniEmployeeService,
  fetchUniEmployeeByIdService,
  fetchAllUniEmployeeService,
  fetchUniEmployeeByLimitService,
  fetchUniEmployeeByUniversityIdService,
  addUniEmployeeDesignationService,
  updateUniEmployeeDesignationService,
} from "../../services/university/uniEmployee.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchUniEmployeeByIdController = catchAsync(async (req, res) => {
  const { employeeId } = req.body;
  if (employeeId) {
    const responseUniEmployeeData = await fetchUniEmployeeByIdService(
      employeeId
    );
    if (responseUniEmployeeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniEmployeeData,
        message: "University Employee Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found of University Employee",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the University Employee Id",
    });
  }
});

export const fetchUniEmpDataByUniversityIdController = catchAsync(
  async (req, res) => {
    const { universityId } = req.body;
    if (universityId) {
      const responseUniEmployeeData =
        await fetchUniEmployeeByUniversityIdService(universityId);
      if (responseUniEmployeeData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseUniEmployeeData,
          message: "University Employee Fetched Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "No Data Found of University Employee",
        });
      }
    }
    return res.status(400).json({
      success: false,
      message: "Please pass the University Id",
    });
  }
);

export const fetchUniEmployeeByNameController = catchAsync(async (req, res) => {
  const { employeeName } = req.body;
  if (employeeName) {
    const responseUniEmployeeData = await fetchUniEmployeeByNameService(
      employeeName
    );
    if (responseUniEmployeeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniEmployeeData,
        message: "University Employee Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for University Employee",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the University employee name",
    });
  }
});

export const fetchAllUniEmployeeController = catchAsync(async (req, res) => {
  const responseUniEmployeeData = await fetchAllUniEmployeeService();
  if (responseUniEmployeeData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseUniEmployeeData,
      message: "All University employee Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of University employee",
    });
  }
});

export const fetchUniEmployeeByLimitController = catchAsync(
  async (req, res) => {
    const uniEmployeeData = req.body;
    const responseUniEmployeeData = await fetchUniEmployeeByLimitService(
      uniEmployeeData
    );
    if (responseUniEmployeeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniEmployeeData,
        message: "University employees Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found of University employee",
      });
    }
  }
);

export const addUniEmployeeController = catchAsync(async (req, res) => {
  const uniEmployeeData = req.body;
  const { error, value } = universityEmployeeSchema.validate(uniEmployeeData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseUniEmployeeData = await addUniEmployeeService(value);
      if (
        responseUniEmployeeData &&
        Object.keys(responseUniEmployeeData).length
      ) {
        return res.status(200).json({
          success: true,
          data: responseUniEmployeeData,
          message: "University Employee Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "University Employee is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the University Employee details",
      });
    }
  }
});

export const addUniEmployeeDesignationController = catchAsync(
  async (req, res) => {
    const uniEmployeeData = req.body;
    // console.log(req.body);

    // Potential Logical Considerations:
    if (!uniEmployeeData.employeeName) {
      return res.status(400).json({
        success: false,
        message: "Please pass the University Employee details",
      });
    }
    // Adding user session details
    uniEmployeeData.userId = req?.session?.user?.userId;
    uniEmployeeData.userName = req?.session?.user?.userName;
    uniEmployeeData.userType = req?.session?.user?.userType;
    uniEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;

    const responseUniEmployeeData = await addUniEmployeeDesignationService(
      uniEmployeeData
    );

    // Error handling logic
    if (responseUniEmployeeData.message) {
      return res.status(200).json({
        success: false,
        message: responseUniEmployeeData.message,
      });
    }

    // Success response logic
    if (
      responseUniEmployeeData &&
      Object.keys(responseUniEmployeeData).length
    ) {
      return res.status(200).json({
        success: true,
        data: responseUniEmployeeData,
        message: "University Employee Added Successfully",
      });
    }
  }
);

export const updateUniEmployeeController = catchAsync(async (req, res) => {
  const uniEmployeeData = req.body;
  const { error, value } = universityEmployeeSchema.validate(uniEmployeeData);
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
      const responseUniEmployeeData = await updateUniEmployeeService(value);
      if (
        responseUniEmployeeData.length === 1 &&
        responseUniEmployeeData[0] === 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseUniEmployeeData,
          message: "University Employee Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "University Employee Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the University Employee details",
      });
    }
  }
});

export const updateUniEmployeeDesignationController = catchAsync(
  async (req, res) => {
    const uniEmployeeData = req.body;
    if (uniEmployeeData.employeeId) {
      uniEmployeeData.userId = req?.session?.user?.userId;
      uniEmployeeData.userName = req?.session?.user?.userName;
      uniEmployeeData.userType = req?.session?.user?.userType;
      uniEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseUniEmployeeData = await updateUniEmployeeDesignationService(
        uniEmployeeData
      );
      if (
        responseUniEmployeeData.length === 1 &&
        responseUniEmployeeData[0] === 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseUniEmployeeData,
          message: "University Employee Designation Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message:
            "University Employee Designation Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the University Employee details",
      });
    }
  }
);

export const deleteUniEmployeeController = catchAsync(async (req, res) => {
  const uniEmployeeData = req.body;
  uniEmployeeData.userId = req?.session?.user?.userId;
  uniEmployeeData.userName = req?.session?.user?.userName;
  uniEmployeeData.userType = req?.session?.user?.userType;
  uniEmployeeData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (uniEmployeeData.employeeId) {
    const responseUniEmployeeData = await deleteUniEmployeeService(
      uniEmployeeData
    );
    if (responseUniEmployeeData) {
      return res.status(200).json({
        success: true,
        data: responseUniEmployeeData,
        message: "University Employee Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "University Employee not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the university employee ID",
    });
  }
});
