import {
  fetchAllIndCmpLocService,
  addIndCmpLocService,
  updateIndCmpLocService,
  deleteIndCmpLocService,
} from "../../services/industry/indCmpLoc.js";

import { catchAsync } from "../../utils/catchAsync.js";

// export const fetchIndCmpByIdController = async (req, res) => {
//     const { cmpId } = req.body;
//     if (cmpId) {
//         const responseIndCmpData = await fetchIndCmpByIdService(cmpId);
//         if (responseIndCmpData) {
//             return res.status().json({
//
//                 success: true,
//                 data: responseIndCmpData,
//                 message: "Industry Company Data Fetched Successfully",
//             });
//         } else {
//             return res.status().json({
//
//                 success: false,
//                 message: "No Data Found for Industry Company",
//             });
//         }
//     } else {
//         return res.status().json({
//
//             success: false,
//             message: "Please pass the Industry Company Id",
//         });
//     }
// };

// export const fetchIndCmpByNameController = async (req, res) => {
//     const { cmpName } = req.body;
//     if (cmpName) {
//         const responseIndCmpData = await fetchIndCmpByNameService(cmpName);
//         if (responseIndCmpData) {
//             return res.status().json({
//
//                 success: true,
//                 data: responseIndCmpData,
//                 message: "Industry Company Fetched Successfully",
//             });
//         } else {
//             return res.status().json({
//
//                 success: false,
//                 message: "No Data Found for Industry Company Name",
//             });
//         }
//     } else {
//         return res.status().json({
//
//             success: false,
//             message: "Please pass the Company",
//         });
//     }
// };

export const fetchAllIndCmpLocController = catchAsync(async (req, res) => {
  const { locationId } = req.body;
  if (!locationId) {
    return res.status(400).json({
      success: false,
      message: "Please pass the Location Id",
    });
  }
  const responseIndCmpLocData = await fetchAllIndCmpLocService(locationId);
  if (responseIndCmpLocData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseIndCmpLocData,
      message: "All Industry Company Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found for Industry Company",
    });
  }
});

// export const fetchIndCmpByLimitController = async (req, res) => {
//     const indData = req.body;
//     const responseIndCmpData = await fetchIndCmpByLimitService(indData);
//     if (responseIndCmpData) {
//         return res.status().json({
//
//             success: true,
//             data: responseIndCmpData,
//             message: "Industry Company Fetched Successfully",
//         });
//     } else {
//         return res.status().json({
//
//             success: false,
//             message: "No Data Found of Industry Company",
//         });
//     }
// };

export const addIndCmpLocController = catchAsync(async (req, res) => {
  const indCmpLocData = req.body;
  indCmpLocData.userId = req?.session?.user?.userId;
  indCmpLocData.userName = req?.session?.user?.userName;
  indCmpLocData.userType = req?.session?.user?.userType;
  indCmpLocData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (
    indCmpLocData.stateId &&
    indCmpLocData.cityId &&
    indCmpLocData.countryId
  ) {
    const responseIndCmpData = await addIndCmpLocService(indCmpLocData);
    if (responseIndCmpData && Object.keys(responseIndCmpData).length > 0) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpData,
        message: "Industry Company Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Industry Company is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Company details",
    });
  }
});

export const updateIndCmpLocController = catchAsync(async (req, res) => {
  const indCmpLocData = req.body;
  indCmpLocData.userId = req?.session?.user?.userId;
  indCmpLocData.userName = req?.session?.user?.userName;
  indCmpLocData.userType = req?.session?.user?.userType;
  indCmpLocData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpLocData.locationId) {
    const responseIndCmpLocData = await updateIndCmpLocService(indCmpLocData);
    if (responseIndCmpLocData.length === 1 && responseIndCmpLocData[0] == 1) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpLocData,
        message: "Industry Company Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Industry Company is Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Company details",
    });
  }
});

export const deleteIndCmpLocController = catchAsync(async (req, res) => {
  const indCmpLocData = req.body;
  indCmpLocData.userId = req?.session?.user?.userId;
  indCmpLocData.userName = req?.session?.user?.userName;
  indCmpLocData.userType = req?.session?.user?.userType;
  indCmpLocData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (indCmpLocData.locationId) {
    const responseIndCmpLocData = await deleteIndCmpLocService(indCmpLocData);
    if (responseIndCmpLocData != 0) {
      return res.status(200).json({
        success: true,
        data: responseIndCmpLocData,
        message: "Industry Company is Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Industry company not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Industry Company ID",
    });
  }
});
