import {
  updateNaacService,
  addNaacService,
  fetchNaacByNameService,
  deleteNaacService,
  fetchNaacByIdService,
  fetchAllNaacService,
} from "../../services/university/uniNaac.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchNaacByIdController = catchAsync(async (req, res) => {
  const { naacId } = req.body;
  if (naacId) {
    const responseNaacData = await fetchNaacByIdService(naacId);
    if (responseNaacData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseNaacData,
        message: "Naac Grade Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for Naac Grade",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the naacId",
    });
  }
});

export const fetchNaacByNameController = catchAsync(async (req, res) => {
  const { naacGrade } = req.body;
  if (naacGrade) {
    const responseNaacData = await fetchNaacByNameService(naacGrade);
    if (responseNaacData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseNaacData,
        message: "Naac Grade Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for Naac Grade",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Naac Grade",
    });
  }
});

export const fetchAllNaacController = catchAsync(async (req, res) => {
  const responseNaacData = await fetchAllNaacService();
  if (responseNaacData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseNaacData,
      message: "All Naac Grade Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of Naac Grade",
    });
  }
});

export const addNaacController = catchAsync(async (req, res) => {
  const naacData = req.body;
  naacData.userId = req?.session?.user?.userId;
  naacData.userName = req?.session?.user?.userName;
  naacData.userType = req?.session?.user?.userType;
  naacData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (naacData.naacGrade) {
    const responseNaacData = await addNaacService(naacData);
    if (responseNaacData && Object.keys(responseNaacData).length > 0) {
      if (responseNaacData.message) {
        return res.status(200).json({
          success: false,
          message: responseNaacData.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: responseNaacData,
        message: "Naac Grade Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Naac Grade is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Naac Grade",
    });
  }
});

export const updateNaacController = catchAsync(async (req, res) => {
  const naacData = req.body;
  naacData.userId = req?.session?.user?.userId;
  naacData.userName = req?.session?.user?.userName;
  naacData.userType = req?.session?.user?.userType;
  naacData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (naacData.naacGrade && naacData.naacId) {
    const responseNaacData = await updateNaacService(naacData);
    if (responseNaacData.length === 1 && responseNaacData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseNaacData,
        message: "Naac Grade Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Naac Grade Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the required data",
    });
  }
});

export const deleteNaacController = catchAsync(async (req, res) => {
  const naacData = req.body;
  naacData.userId = req?.session?.user?.userId;
  naacData.userName = req?.session?.user?.userName;
  naacData.userType = req?.session?.user?.userType;
  naacData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (naacData.naacId) {
    const responseNaacData = await deleteNaacService(naacData);
    if (responseNaacData) {
      return res.status(200).json({
        success: true,
        data: responseNaacData,
        message: "Naac Grade Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Naac Grade not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the naacId",
    });
  }
});
