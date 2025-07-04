import {
  updateDesignationService,
  addDesignationService,
  fetchDesignationByNameService,
  deleteDesignationService,
  fetchDesignationByIdService,
  fetchAllDesignationService,
} from "../../services/common/designation.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchDesignationByIdController = catchAsync(async (req, res) => {
  const designationData = req.body;
  if (designationData.designationId && designationData.designationType) {
    const responseDesignationData = await fetchDesignationByIdService(
      designationData
    );
    if (responseDesignationData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseDesignationData,
        message: "Designation Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for designationId",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the designationId",
    });
  }
});

export const fetchDesignationByNameController = catchAsync(async (req, res) => {
  const designationData = req.body;
  if (designationData.designationName && designationData.designationType) {
    const responseDesignationData = await fetchDesignationByNameService(
      designationData
    );
    if (responseDesignationData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseDesignationData,
        message: "Designation Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for designationName",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the designationName",
    });
  }
});

export const fetchAllDesignationController = catchAsync(async (req, res) => {
  const designationData = req.body;
  if(!designationData.designationType){
    return res.status(400).json({
      success: false,
      message: "Please pass the designationType",
    });
  }
  const responseDesignationData = await fetchAllDesignationService(
    designationData
  );
  if (responseDesignationData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseDesignationData,
      message: "All Designation Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of Designation",
    });
  }
});

export const addDesignationController = catchAsync(async (req, res) => {
  const designationData = req.body;
  designationData.userId = req?.session?.user?.userId;
  designationData.userName = req?.session?.user?.userName;
  designationData.userType = req?.session?.user?.userType;
  designationData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (designationData.designationName && designationData.designationType) {
    const responseDesignationData = await addDesignationService(
      designationData
    );
    if (
      responseDesignationData &&
      Object.keys(responseDesignationData).length > 0
    ) {
      if (responseDesignationData.message) {
        return res.status(200).json({
          success: false,
          message: responseDesignationData.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: responseDesignationData,
        message: "Designation Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Designation Data is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the designationName",
    });
  }
});

export const updateDesignationController = catchAsync(async (req, res) => {
  const designationData = req.body;
  designationData.userId = req?.session?.user?.userId;
  designationData.userName = req?.session?.user?.userName;
  designationData.userType = req?.session?.user?.userType;
  designationData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (designationData.designationId && designationData.designationType) {
    const responseDesignationData = await updateDesignationService(
      designationData
    );
    if (
      responseDesignationData.length === 1 &&
      responseDesignationData[0] == 1
    ) {
      return res.status(200).json({
        success: true,
        data: responseDesignationData,
        message: "Designation Data Updated Successfully",
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
      message: "Please pass the Designation data",
    });
  }
});

export const deleteDesignationController = catchAsync(async (req, res) => {
  const designationData = req.body;
  designationData.userId = req?.session?.user?.userId;
  designationData.userName = req?.session?.user?.userName;
  designationData.userType = req?.session?.user?.userType;
  designationData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (designationData.designationId && designationData.designationType) {
    const responseDesignationData = await deleteDesignationService(
      designationData
    );
    if (responseDesignationData !== 0) {
      return res.status(200).json({
        success: true,
        data: responseDesignationData,
        message: "Designation Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Designation not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the designationId",
    });
  }
});
