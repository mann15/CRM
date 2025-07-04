import { industrySchema } from "../../config/validation.js";
import {
  updateIndService,
  addIndService,
  fetchIndByNameService,
  deleteIndService,
  fetchIndByIdService,
  fetchAllIndService,
  fetchIndByLimitService,
  addIndCmpService,
} from "../../services/industry/indMaster.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchIndByIdController = catchAsync(async (req, res) => {
  const { industryId } = req.body;
  if (industryId) {
    const responseIndData = await fetchIndByIdService(industryId);
    if (responseIndData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndData,
        message: "Industry Company Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for Industry Company",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Company Id",
    });
  }
});

export const fetchIndByNameController = catchAsync(async (req, res) => {
  const { industryNameId } = req.body;
  if (industryNameId) {
    const responseIndData = await fetchIndByNameService(industryNameId);
    if (responseIndData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndData,
        message: "Industry Company Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for Industry Company Name",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the indutry data",
    });
  }
});

export const fetchAllIndController = catchAsync(async (req, res) => {
  const responseIndData = await fetchAllIndService();
  if (responseIndData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndData,
      message: "All Industry Company Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found for Industry data",
    });
  }
});

export const fetchIndByLimitController = catchAsync(async (req, res) => {
  const indData = req.body;
  const responseIndData = await fetchIndByLimitService(indData);
  if (responseIndData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndData,
      message: "Industry Company Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of Industry Company",
    });
  }
});

export const addIndCmpController = catchAsync(async (req, res) => {
  const indData = req.body;

  if (indData.industryNameId && indData.typeId) {
    indData.userId = req?.session?.user?.userId;
    indData.userName = req?.session?.user?.userName;
    indData.userType = req?.session?.user?.userType;
    indData.userEmployeeId = req?.session?.user?.userEmployeeId;
    const responseIndData = await addIndCmpService(indData);
    if (responseIndData && Object.keys(responseIndData).length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndData,
        message: "Industry Company Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Industry Company is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Company details",
    });
  }
});

export const addIndController = catchAsync(async (req, res) => {
  const indData = req.body;
  const { error, value } = industrySchema.validate(indData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.industryNameId && value.typeId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseIndData = await addIndService(value);
      if (responseIndData && Object.keys(responseIndData).length > 0) {
        return res.status(200).json({
          success: true,
          data: responseIndData,
          message: "Industry  Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Industry  is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry  details",
      });
    }
  }
});

export const updateIndController = catchAsync(async (req, res) => {
  const indData = req.body;
  const { error, value } = industrySchema.validate(indData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.industryId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseIndData = await updateIndService(value);
      if (responseIndData.length === 1 && responseIndData[0] == 1) {
        return res.status(200).json({
          success: true,
          data: responseIndData,
          message: "Industry Company Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Industry  is Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry  details",
      });
    }
  }
});

export const deleteIndController = catchAsync(async (req, res) => {
  const indData = req.body;
  indData.userId = req?.session?.user?.userId;
  indData.userName = req?.session?.user?.userName;
  indData.userType = req?.session?.user?.userType;
  indData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indData.industryId) {
    const responseIndData = await deleteIndService(indData);
    if (responseIndData != 0) {
      return res.status(200).json({
        success: true,
        data: responseIndData,
        message: "Industry Company is Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Industry company not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Company ID",
    });
  }
});
