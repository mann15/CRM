import {
  updateTypeService,
  addTypeService,
  fetchTypeByNameService,
  deleteTypeService,
  fetchTypeByIdService,
  fetchAllTypeService,
} from "../../services/common/type.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchTypeByIdController = catchAsync(async (req, res) => {
  const typeData = req.body;
  if (typeData.typeId && typeData.typesType) {
    const responseTypeData = await fetchTypeByIdService(typeData);
    if (responseTypeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseTypeData,
        message: "Type Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for TypeId",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the typeId and typesType",
    });
  }
});

export const fetchTypeByNameController = catchAsync(async (req, res) => {
  const typeData = req.body;
  if (typeData.typeName && typeData.typesType) {
    const responseTypeData = await fetchTypeByNameService(typeData);
    if (responseTypeData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseTypeData,
        message: "Type Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for TypeName",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the typeName and typesType",
    });
  }
});

export const fetchAllTypeController = catchAsync(async (req, res) => {
  const typeData = req.body;
  if(!typeData.typesType){
    return res.status(400).json({
      success: false,
      message: "Please pass the type",
    });
  }
  const responseTypeData = await fetchAllTypeService(typeData);
  if (responseTypeData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseTypeData,
      message: "All Type Data Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of Type",
    });
  }
});

export const addTypeController = catchAsync(async (req, res) => {
  const typeData = req.body;
  typeData.userId = req?.session?.user?.userId;
  typeData.userName = req?.session?.user?.userName;
  typeData.userType = req?.session?.user?.userType;
  typeData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (typeData.typeName && typeData.typesType) {
    const responseTypeData = await addTypeService(typeData);
    if (responseTypeData && Object.keys(responseTypeData).length > 0) {
      if (responseTypeData.message) {
        return res.status(200).json({
          success: false,
          message: responseTypeData.message,
        });
      }
      return res.status(200).json({
        success: true,
        data: responseTypeData,
        message: "Type Data Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Type Data is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the typeName",
    });
  }
});

export const updateTypeController = catchAsync(async (req, res) => {
  const typeData = req.body;
  typeData.userId = req?.session?.user?.userId;
  typeData.userName = req?.session?.user?.userName;
  typeData.userType = req?.session?.user?.userType;
  typeData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (typeData.typeId && typeData.typesType) {
    const responseTypeData = await updateTypeService(typeData);
    if (responseTypeData.length === 1 && responseTypeData[0] == 1) {
      return res.status(200).json({
        success: true,
        data: responseTypeData,
        message: "Type Data Updated Successfully",
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
      message: "Please pass the Type data",
    });
  }
});

export const deleteTypeController = catchAsync(async (req, res) => {
  const typeData = req.body;
  typeData.userId = req?.session?.user?.userId;
  typeData.userName = req?.session?.user?.userName;
  typeData.userType = req?.session?.user?.userType;
  typeData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (typeData.typeId && typeData.typesType) {
    const responseTypeData = await deleteTypeService(typeData);
    if (responseTypeData !== 0) {
      return res.status(200).json({
        success: true,
        data: responseTypeData,
        message: "Type Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Type not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the typeId",
    });
  }
});
