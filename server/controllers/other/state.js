import {
  updateStateService,
  addStateService,
  fetchStateByNameService,
  deleteStateService,
  fetchStateByIdService,
  fetchAllStateService,
} from "../../services/other/state.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchStateByIdController = catchAsync(async (req, res) => {
  const { stateId } = req.body;
  if (stateId) {
    const responseStateData = await fetchStateByIdService(stateId);
    if (responseStateData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseStateData,
        message: "state Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for stateId",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the stateId",
    });
  }
});

export const fetchStateByNameController = catchAsync(async (req, res) => {
  const { stateName } = req.body;
  if (stateName) {
    const responseStateData = await fetchStateByNameService(stateName);
    if (responseStateData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseStateData,
        message: "state Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for stateName",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the stateName",
    });
  }
});

export const fetchAllStateController = catchAsync(async (req, res) => {
  const responseStateData = await fetchAllStateService();
  if (responseStateData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseStateData,
      message: "All state Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of state",
    });
  }
});

export const addStateController = catchAsync(async (req, res) => {
  const stateData = req.body;
  stateData.userId = req?.session?.user?.userId;
  stateData.userName = req?.session?.user?.userName;
  stateData.userType = req?.session?.user?.userType;
  stateData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (stateData.stateName) {
    const responseStateData = await addStateService(stateData);
    if (responseStateData && Object.keys(responseStateData).length > 0) {
      if (responseStateData.message) {
        return res.status(200).json({
          success: false,
          message: responseStateData.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: responseStateData,
        message: "state Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "state Data is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the stateName",
    });
  }
});

export const updateStateController = catchAsync(async (req, res) => {
  const stateData = req.body;
  stateData.userId = req?.session?.user?.userId;
  stateData.userName = req?.session?.user?.userName;
  stateData.userType = req?.session?.user?.userType;
  stateData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (stateData.stateId && stateData.stateName) {
    const responseStateData = await updateStateService(stateData);
    if (responseStateData.length === 1 && responseStateData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseStateData,
        message: "state Data Updated Successfully",
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
      message: "Please pass the state data",
    });
  }
});

export const deleteStateController = catchAsync(async (req, res) => {
  const stateData = req.body;
  stateData.userId = req?.session?.user?.userId;
  stateData.userName = req?.session?.user?.userName;
  stateData.userType = req?.session?.user?.userType;
  stateData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (stateData.departmentId) {
    const responseStateData = await deleteStateService(stateData);
    if (responseStateData) {
      return res.status(200).json({
        success: true,
        data: responseStateData,
        message: "state Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "state not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the stateId",
    });
  }
});
