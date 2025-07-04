import { industryNameSchema } from "../../config/validation.js";
import {
  updateIndNameService,
  addIndNameService,
  fetchIndNameByNameService,
  deleteIndNameService,
  fetchIndNameByIdService,
  fetchAllIndNameService,
} from "../../services/industry/indName.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchIndNameByIdController = catchAsync(async (req, res) => {
  const { industryNameId } = req.body;
  if (industryNameId) {
    const responseIndNameData = await fetchIndNameByIdService(industryNameId);
    if (responseIndNameData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndNameData,
        message: "IndName Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for IndustryNameId",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the industryNameId",
    });
  }
});

export const fetchIndNameByNameController = catchAsync(async (req, res) => {
  const { industryName } = req.body;
  if (industryName) {
    const responseIndNameData = await fetchIndNameByNameService(industryName);
    if (responseIndNameData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndNameData,
        message: "IndName Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for IndName",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the industry name",
    });
  }
});

export const fetchAllIndNameController = catchAsync(async (req, res) => {
  const responseIndNameData = await fetchAllIndNameService();
  if (responseIndNameData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndNameData,
      message: "All IndName Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of IndustryName",
    });
  }
});

export const addIndNameController = catchAsync(async (req, res) => {
  const indNameData = req.body;
  const { error, value } = industryNameSchema.validate(indNameData);
  
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.industryName) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      
      const responseIndNameData = await addIndNameService(value);
      if (responseIndNameData && Object.keys(responseIndNameData).length > 0) {
        return res.status(200).json({
          success: true,
          data: responseIndNameData,
          message: "IndustryName Data Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "IndustryName Data is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the industry name",
      });
    }
  }
});

export const updateIndNameController = catchAsync(async (req, res) => {
  const indNameData = req.body;
  const { error, value } = industryNameSchema.validate(indNameData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.industryName && value.industryNameId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseIndNameData = await updateIndNameService(value);
      if (responseIndNameData.length === 1 && responseIndNameData[0] == 1) {
        return res.status(200).json({
          success: true,
          data: responseIndNameData,
          message: "IndustryName Data Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Data Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the IndustryName data",
      });
    }
  }
});

export const deleteIndNameController = catchAsync(async (req, res) => {
  const indNameData = req.body;
  indNameData.userId = req?.session?.user?.userId;
  indNameData.userName = req?.session?.user?.userName;
  indNameData.userType = req?.session?.user?.userType;
  if (indNameData.industryNameId) {
    const responseIndNameData = await deleteIndNameService(indNameData);
    if (responseIndNameData != 0) {
      return res.status(200).json({
        success: true,
        data: responseIndNameData,
        message: "IndustryName Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "IndustryName not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the industryNameId",
    });
  }
});
