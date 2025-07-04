import { universitySchema } from "../../config/validation.js";
import {
  updateUniService,
  addUniService,
  fetchUniByNameService,
  deleteUniService,
  fetchUniByIdService,
  fetchAllUniService,
  fetchUniByLimitService,
  fetchUniDataService,
} from "../../services/university/uniMaster.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchUniByIdController = catchAsync(async (req, res) => {
  const { universityId } = req.body;
  if (universityId) {
    const responseUniData = await fetchUniByIdService(universityId);
    if (responseUniData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniData,
        message: "University Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for University",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the university Id",
    });
  }
});

export const fetchUniDataController = catchAsync(async (req, res) => {
  const responseUniData = await fetchUniDataService();
  if (responseUniData) {
    return res.status(200).json({
      success: true,
      data: responseUniData,
      message: "All University Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of University",
    });
  }
});

export const fetchUniByNameController = catchAsync(async (req, res) => {
  const { universityName } = req.body;
  if (universityName) {
    const responseUniData = await fetchUniByNameService(universityName);
    if (responseUniData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniData,
        message: "University Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for University",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the University name",
    });
  }
});

export const fetchAllUniController = catchAsync(async (req, res) => {
  const responseUniData = await fetchAllUniService();
  if (responseUniData) {
    return res.status(200).json({
      success: true,
      data: responseUniData,
      message: "All University Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of University",
    });
  }
});

export const fetchUniByLimitController = catchAsync(async (req, res) => {
  const uniData = req.body;
  const responseUniData = await fetchUniByLimitService(uniData);
  if (responseUniData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseUniData,
      message: "Universities Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of University",
    });
  }
});

export const addUniController = catchAsync(async (req, res) => {
  const uniData = req.body;
  const { error, value } = universitySchema.validate(uniData);
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
      const responseUniData = await addUniService(value);
      if (responseUniData && Object.keys(responseUniData).length > 0) {
        return res.status(200).json({
          success: true,
          data: responseUniData,
          message: "University Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "University is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the University details",
      });
    }
  }
});

export const updateUniController = catchAsync(async (req, res) => {
  const uniData = req.body;
  const { error, value } = universitySchema.validate(uniData);
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
      const responseUniData = await updateUniService(value);
      if (responseUniData.length === 1 && responseUniData[0] === 1) {
        return res.status(200).json({
          success: true,
          data: responseUniData,
          message: "University Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "University Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the University details",
      });
    }
  }
});

export const deleteUniController = catchAsync(async (req, res) => {
  const uniData = req.body;
  uniData.userId = req?.session?.user?.userId;
  uniData.userName = req?.session?.user?.userName;
  uniData.userType = req?.session?.user?.userType;
  uniData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (uniData.universityId) {
    const responseUniData = await deleteUniService(uniData);
    if (responseUniData) {
      return res.status(200).json({
        success: true,
        data: responseUniData,
        message: "University Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "University  not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the university ID",
    });
  }
});
