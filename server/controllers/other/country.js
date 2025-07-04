import {
  updateCountryService,
  addCountryService,
  fetchCountryByNameService,
  deleteCountryService,
  fetchCountryByIdService,
  fetchAllCountryService,
} from "../../services/other/country.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchCountryByIdController = catchAsync(async (req, res) => {
  const { countryId } = req.body;
  if (countryId) {
    const responseCountryData = await fetchCountryByIdService(countryId);
    if (responseCountryData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseCountryData,
        message: "country Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for countryId",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the countryId",
    });
  }
});

export const fetchCountryByNameController = catchAsync(async (req, res) => {
  const { countryName } = req.body;
  if (countryName) {
    const responseCountryData = await fetchCountryByNameService(countryName);
    if (responseCountryData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseCountryData,
        message: "country Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for countryName",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the countryName",
    });
  }
});

export const fetchAllCountryController = catchAsync(async (req, res) => {
  const responseCountryData = await fetchAllCountryService();
  if (responseCountryData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseCountryData,
      message: "All country Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of country",
    });
  }
});

export const addCountryController = catchAsync(async (req, res) => {
  const countryData = req.body;
  countryData.userId = req?.session?.user?.userId;
  countryData.userName = req?.session?.user?.userName;
  countryData.userType = req?.session?.user?.userType;
  countryData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (countryData.countryName) {
    const responseCountryData = await addCountryService(countryData);
    if (responseCountryData && Object.keys(responseCountryData).length > 0) {
      if (responseCountryData.message) {
        return res.status(200).json({
          success: false,
          message: responseCountryData.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: responseCountryData,
        message: "country Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "country Data is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the countryName",
    });
  }
});

export const updateCountryController = catchAsync(async (req, res) => {
  const countryData = req.body;
  countryData.userId = req?.session?.user?.userId;
  countryData.userName = req?.session?.user?.userName;
  countryData.userType = req?.session?.user?.userType;
  countryData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (countryData.countryId && countryData.countryName) {
    const responseCountryData = await updateCountryService(countryData);
    if (responseCountryData.length === 1 && responseCountryData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseCountryData,
        message: "country Data Updated Successfully",
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
      message: "Please pass the country data",
    });
  }
});

export const deleteCountryController = catchAsync(async (req, res) => {
  const countryData = req.body;
  countryData.userId = req?.session?.user?.userId;
  countryData.userName = req?.session?.user?.userName;
  countryData.userType = req?.session?.user?.userType;
  countryData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (countryData.countryId) {
    const responseCountryData = await deleteCountryService(countryData);
    if (responseCountryData) {
      return res.status(200).json({
        success: true,
        data: responseCountryData,
        message: "country Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "country not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the countryId",
    });
  }
});
