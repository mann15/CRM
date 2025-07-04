import {
  updateIndCmpHasIndCmpLocService,
  deleteIndCmpHasIndCmpLocService,
  addIndCmpHasIndCmpLocService,
  fetchAllIndCmpHasIndCmpLocService,
  fetchIndCmpHasIndCmpLocService,
} from "../../services/industry/indCmpHasIndCmpLoc.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchIndCmpHasIndCmpLocByIdController = catchAsync(
  async (req, res) => {
    const cmpData = req.body;
    if (cmpData) {
      const responseIndCmpHasIndCmpLocData =
        await fetchIndCmpHasIndCmpLocService(cmpData);
      if (responseIndCmpHasIndCmpLocData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpHasIndCmpLocData,
          message:
            "Industry Company Has Industry Company Location Data Fetched Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message:
            "No Data Found for Industry Company Has Industry Company Location",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please pass the Industry Company Id",
      });
    }
  }
);

export const fetchAllIndCmpHasIndCmpLocController = catchAsync(
  async (req, res) => {
    const responseIndCmpHasIndCmpLocData =
      await fetchAllIndCmpHasIndCmpLocService();
    if (responseIndCmpHasIndCmpLocData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpHasIndCmpLocData,
        message:
          "Industry Company Has Industry Company Location Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message:
          "No Data Found for Industry Company Has Industry Company Location",
      });
    }
  }
);

export const addIndCmpHasIndCmpLocController = catchAsync(async (req, res) => {
  const cmpLocData = req.body;
  cmpLocData.userId = req?.session?.user?.userId;
  cmpLocData.userName = req?.session?.user?.userName;
  cmpLocData.userType = req?.session?.user?.userType;
  cmpLocData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (cmpLocData.companyId && cmpLocData.locationId) {
    const responseIndCmpHasIndCmpLocData = await addIndCmpHasIndCmpLocService(
      cmpLocData
    );
    if (
      responseIndCmpHasIndCmpLocData &&
      Object.keys(responseIndCmpHasIndCmpLocData).length > 0
    ) {
      if (responseIndCmpHasIndCmpLocData === "Record already exists") {
        return res.status(200).json({
          success: false,
          message: "Record already exists",
        });
      }
      return res.status(200).json({
        success: true,
        data: responseIndCmpHasIndCmpLocData,
        message:
          "Industry Company Has Industry Company Location Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message:
          "Failed to Add Industry Company Has Industry Company Location Data",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message:
        "Please pass the Industry Company Id and Industry Company Location Id",
    });
  }
});

export const updateIndCmpHasIndCmpLocController = catchAsync(
  async (req, res) => {
    const cmpLocData = req.body;
    cmpLocData.userId = req?.session?.user?.userId;
    cmpLocData.userName = req?.session?.user?.userName;
    cmpLocData.userType = req?.session?.user?.userType;
    cmpLocData.userEmployeeId = req?.session?.user?.userEmployeeId;

    if (
      cmpLocData.locationId &&
      cmpLocData.companyId &&
      cmpLocData.oldLocationId
    ) {
      const responseIndCmpHasIndCmpLocData =
        await updateIndCmpHasIndCmpLocService(cmpLocData);
      if (responseIndCmpHasIndCmpLocData.error) {
        return res.status(200).json({
          success: false,
          message: responseIndCmpHasIndCmpLocData.error,
        });
      }
      if (
        responseIndCmpHasIndCmpLocData.length === 1 &&
        responseIndCmpHasIndCmpLocData[0] == 1
      ) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpHasIndCmpLocData,
          message:
            "Industry Company Has Industry Company Location Data Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message:
            "Failed to Update Industry Company Has Industry Company Location Data",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Please pass the Industry Company Id and Industry Company Location Id",
      });
    }
  }
);

export const deleteIndCmpHasIndCmpLocController = catchAsync(
  async (req, res) => {
    const cmpLocData = req.body;
    cmpLocData.userId = req?.session?.user?.userId;
    cmpLocData.userName = req?.session?.user?.userName;
    cmpLocData.userType = req?.session?.user?.userType;
    cmpLocData.userEmployeeId = req?.session?.user?.userEmployeeId;

    if (cmpLocData.companyId && cmpLocData.locationId) {
      const responseIndCmpHasIndCmpLocData =
        await deleteIndCmpHasIndCmpLocService(cmpLocData);
      if (responseIndCmpHasIndCmpLocData != 0) {
        return res.status(200).json({
          success: true,
          data: responseIndCmpHasIndCmpLocData,
          message:
            "Industry Company Has Industry Company Location Data Deleted Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message:
            "Failed to Delete Industry Company Has Industry Company Location Data",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Please pass the Industry Company Id and Industry Company Location Id",
      });
    }
  }
);
