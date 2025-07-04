import { industryCompanySchema } from "../../config/validation.js";
import {
  updateIndCmpService,
  addIndCmpService,
  fetchIndCmpByNameService,
  deleteIndCmpService,
  fetchIndCmpByIdService,
  fetchAllIndCmpService,
  fetchIndCmpByLimitService,
  fetchIndDataService,
  updateIndCompanyService,
} from "../../services/industry/indCmp.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchIndCmpByIdController = catchAsync(async (req, res) => {
  const { companyId } = req.body;
  if (companyId) {
    const responseIndCmpData = await fetchIndCmpByIdService(companyId);
    if (responseIndCmpData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpData,
        message: "IndCmpustry Company Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for IndCmpustry Company",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the IndCmpustry Company Id",
    });
  }
});

export const fetchIndDataController = catchAsync(async (req, res) => {
  const responseIndCmpData = await fetchIndDataService();
  if (responseIndCmpData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndCmpData,
      message: "IndCmpustry Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found for IndCmpustry",
    });
  }
});

export const fetchIndCmpByNameController = catchAsync(async (req, res) => {
  const { companyName } = req.body;
  if (companyName) {
    const responseIndCmpData = await fetchIndCmpByNameService(companyName);
    if (responseIndCmpData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpData,
        message: "IndCmpustry Company Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for IndCmpustry Company Name",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Company",
    });
  }
});

export const fetchAllIndCmpController = catchAsync(async (req, res) => {
  const responseIndCmpData = await fetchAllIndCmpService();
  if (responseIndCmpData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndCmpData,
      message: "All IndCmpustry Company Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found for IndCmpustry Company",
    });
  }
});

export const fetchIndCmpByLimitController = catchAsync(async (req, res) => {
  const indCmpData = req.body;
  const responseIndCmpData = await fetchIndCmpByLimitService(indCmpData);
  if (responseIndCmpData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndCmpData,
      message: "IndCmpustry Company Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of IndCmpustry Company",
    });
  }
});

export const addIndCmpController = catchAsync(async (req, res) => {
  const indCmpData = req.body;
  const { error, value } = industryCompanySchema.validate(indCmpData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.companyName) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseIndCmpData = await addIndCmpService(value);
      if (responseIndCmpData && Object.keys(responseIndCmpData).length > 0) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpData,
          message: "IndCmpustry Company Added Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "IndCmpustry Company is not added, please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the IndCmpustry Company details",
      });
    }
  }
});

export const updateIndCmpController = catchAsync(async (req, res) => {
  const indCmpData = req.body;
  const { error, value } = industryCompanySchema.validate(indCmpData);
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  } else {
    if (value.companyId) {
      value.userId = req?.session?.user?.userId;
      value.userName = req?.session?.user?.userName;
      value.userType = req?.session?.user?.userType;
      value.userEmployeeId = req?.session?.user?.userEmployeeId;
      const responseIndCmpData = await updateIndCmpService(value);
      if (responseIndCmpData.length === 1 && responseIndCmpData[0] == 1) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpData,
          message: "IndCmpustry Company Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "IndCmpustry Company is Not Updated, Please try again",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the IndCmpustry Company details",
      });
    }
  }
});

export const updateIndCompanyController = catchAsync(async (req, res) => {
  const indCmpData = req.body;
  indCmpData.userId = req?.session?.user?.userId;
  indCmpData.userName = req?.session?.user?.userName;
  indCmpData.userType = req?.session?.user?.userType;
  indCmpData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpData.companyId) {
    const responseIndCmpData = await updateIndCompanyService(indCmpData);

    if (responseIndCmpData.success) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpData,
        message: "IndCmpustry Company Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "IndCmpustry Company is Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the IndCmpustry Company details",
    });
  }
});

export const deleteIndCmpController = catchAsync(async (req, res) => {
  const indCmpData = req.body;
  indCmpData.userId = req?.session?.user?.userId;
  indCmpData.userName = req?.session?.user?.userName;
  indCmpData.userType = req?.session?.user?.userType;
  indCmpData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpData.companyId) {
    const responseIndCmpData = await deleteIndCmpService(indCmpData);
    if (responseIndCmpData != 0) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpData,
        message: "IndCmpustry Company is Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "IndCmpustry company not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the IndCmpustry Company ID",
    });
  }
});
