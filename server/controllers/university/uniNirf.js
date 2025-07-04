import {
  updateNirfService,
  addNirfService,
  fetchNirfByNameService,
  deleteNirfService,
  fetchNirfByIdService,
  fetchAllNirfService,
} from "../../services/university/uniNirf.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchNirfByIdController = catchAsync(async (req, res) => {
  const { nirfId } = req.body;
  if (nirfId) {
    const responseNirfData = await fetchNirfByIdService(nirfId);
    if (responseNirfData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseNirfData,
        message: "Nirf Rank Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for Nirf Rank",
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: "Please pass the nirfId",
    });
  }
});

export const fetchNirfByNameController = catchAsync(async (req, res) => {
  const { nirfRank } = req.body;
  if (nirfRank) {
    const responseNirfData = await fetchNirfByNameService(nirfRank);
    if (responseNirfData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseNirfData,
        message: "Nirf Rank Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for Nirf Rank",
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: "Please pass the Nirf Rank",
    });
  }
});

export const fetchAllNirfController = catchAsync(async (req, res) => {
  const responseNirfData = await fetchAllNirfService();
  if (responseNirfData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseNirfData,
      message: "All Nirf Rank Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of Nirf Rank",
    });
  }
});

export const addNirfController = catchAsync(async (req, res) => {
  const nirfData = req.body;
  nirfData.userId = req?.session?.user?.userId;
  nirfData.userName = req?.session?.user?.userName;
  nirfData.userType = req?.session?.user?.userType;
  nirfData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (nirfData.nirfRank) {
    const responseNirfData = await addNirfService(nirfData);
    if (responseNirfData && Object.keys(responseNirfData).length > 0) {
      if (responseNirfData.message) {
        return res.status(200).json({
          success: false,
          message: responseNirfData.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: responseNirfData,
        message: "Nirf Rank Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Nirf Rank is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Nirf Rank",
    });
  }
});

export const updateNirfController = catchAsync(async (req, res) => {
  const nirfData = req.body;
  nirfData.userId = req?.session?.user?.userId;
  nirfData.userName = req?.session?.user?.userName;
  nirfData.userType = req?.session?.user?.userType;
  nirfData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (nirfData.nirfId && nirfData.nirfRank) {
    const responseNirfData = await updateNirfService(nirfData);
    if (responseNirfData.length === 1 && responseNirfData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseNirfData,
        message: "Nirf Rank Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Nirf Rank Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the required data",
    });
  }
});

export const deleteNirfController = catchAsync(async (req, res) => {
  const nirfData = req.body;
  nirfData.userId = req?.session?.user?.userId;
  nirfData.userName = req?.session?.user?.userName;
  nirfData.userType = req?.session?.user?.userType;
  nirfData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (nirfData.nirfId) {
    const responseNirfData = await deleteNirfService(nirfData);
    if (responseNirfData) {
      return res.status(200).json({
        success: true,
        data: responseNirfData,
        message: "Nirf Rank Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Nirf Rank not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the nirfId",
    });
  }
});
