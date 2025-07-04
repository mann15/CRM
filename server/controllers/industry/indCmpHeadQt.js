import {
  updateIndCmpHeadQtService,
  addIndCmpHeadQtService,
  deleteIndCmpHeadQtService,
  fetchIndCmpHeadQtService,
} from "../../services/industry/indCmpHeadQt.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchIndCmpHeadQtController = catchAsync(async (req, res) => {
  const { companyId } = req.body;
  if (!companyId) {
    return res.status(400).json({
      success: false,
      message: "Please pass the Indcmp id",
    });
  }
  const responseIndCmpHeadQtData = await fetchIndCmpHeadQtService(companyId);
  if (responseIndCmpHeadQtData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndCmpHeadQtData,
      message: "All industry head Quarter Fetched Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "No Data Found of Indcmp id",
    });
  }
});

export const addIndCmpHeadQtController = catchAsync(async (req, res) => {
  const indCmpHeadQtData = req.body;
  indCmpHeadQtData.userId = req?.session?.user?.userId;
  indCmpHeadQtData.userName = req?.session?.user?.userName;
  indCmpHeadQtData.userType = req?.session?.user?.userType;
  indCmpHeadQtData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpHeadQtData.companyId) {
    const responseIndCmpHeadQtData = await addIndCmpHeadQtService(
      indCmpHeadQtData
    );
    if (
      responseIndCmpHeadQtData &&
      Object.keys(responseIndCmpHeadQtData).length > 0
    ) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpHeadQtData,
        message: "industry head Quarter Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "industry head Quarter is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Indcmp head quarter details",
    });
  }
});

export const updateIndCmpHeadQtController = catchAsync(async (req, res) => {
  const indCmpHeadQtData = req.body;
  indCmpHeadQtData.userId = req?.session?.user?.userId;
  indCmpHeadQtData.userName = req?.session?.user?.userName;
  indCmpHeadQtData.userType = req?.session?.user?.userType;
  indCmpHeadQtData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpHeadQtData.headQuarterId) {
    const responseIndCmpHeadQtData = await updateIndCmpHeadQtService(
      indCmpHeadQtData
    );
    if (
      responseIndCmpHeadQtData.length === 1 &&
      responseIndCmpHeadQtData[0] == 1
    ) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpHeadQtData,
        message: "industry head Quarter Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "industry head Quarter Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the industry head Quarter details",
    });
  }
});

export const deleteIndCmpHeadQtController = catchAsync(async (req, res) => {
  const indCmpHeadQtData = req.body;
  indCmpHeadQtData.userId = req?.session?.user?.userId;
  indCmpHeadQtData.userName = req?.session?.user?.userName;
  indCmpHeadQtData.userType = req?.session?.user?.userType;
  indCmpHeadQtData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpHeadQtData.headQuarterId) {
    const responseIndCmpHeadQtData = await deleteIndCmpHeadQtService(
      indCmpHeadQtData
    );
    if (responseIndCmpHeadQtData) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpHeadQtData,
        message: "industry head Quarter Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "industry head Quarter not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the industry head Quarter ID",
    });
  }
});
