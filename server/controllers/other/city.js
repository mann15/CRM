import {
  updateCityService,
  addCityService,
  fetchCityByNameService,
  deleteCityService,
  fetchCityByIdService,
  fetchAllCityService,
} from "../../services/other/city.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchCityByIdController = catchAsync(async (req, res) => {
  const { cityId } = req.body;
  if (cityId) {
    const responseCityData = await fetchCityByIdService(cityId);
    if (responseCityData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseCityData,
        message: "City Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for CityId",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the cityId",
    });
  }
});

export const fetchCityByNameController = catchAsync(async (req, res) => {
  const { cityName } = req.body;
  if (cityName) {
    const responseCityData = await fetchCityByNameService(cityName);
    if (responseCityData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseCityData,
        message: "City Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for CityName",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the cityName",
    });
  }
});

export const fetchAllCityController = catchAsync(async (req, res) => {
  const responseCityData = await fetchAllCityService();
  if (responseCityData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseCityData,
      message: "All City Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of City",
    });
  }
});

export const addCityController = catchAsync(async (req, res) => {
  const cityData = req.body;
  cityData.userId = req?.session?.user?.userId;
  cityData.userName = req?.session?.user?.userName;
  cityData.userType = req?.session?.user?.userType;
  cityData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (cityData.cityName) {
    const responseCityData = await addCityService(cityData);
    if (responseCityData && Object.keys(responseCityData).length > 0) {
      if (responseCityData.message) {
        return res.status(200).json({
          success: false,
          message: "City Already Exists",
        });
      }
      return res.status(200).json({
        success: true,
        data: responseCityData,
        message: "City Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "City Data is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the cityName",
    });
  }
});

export const updateCityController = catchAsync(async (req, res) => {
  const cityData = req.body;
  cityData.userId = req?.session?.user?.userId;
  cityData.userName = req?.session?.user?.userName;
  cityData.userType = req?.session?.user?.userType;
  cityData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (cityData.cityId && cityData.cityName) {
    const responseCityData = await updateCityService(cityData);
    if (responseCityData.length === 1 && responseCityData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseCityData,
        message: "City Data Updated Successfully",
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
      message: "Please pass the City data",
    });
  }
});

export const deleteCityController = catchAsync(async (req, res) => {
  const cityData = req.body;
  cityData.userId = req?.session?.user?.userId;
  cityData.userName = req?.session?.user?.userName;
  cityData.userType = req?.session?.user?.userType;
  cityData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (cityData.cityId) {
    const responseCityData = await deleteCityService(cityData);
    if (responseCityData != 0) {
      return res.status(200).json({
        success: true,
        data: responseCityData,
        message: "City Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "City not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the cityId",
    });
  }
});
