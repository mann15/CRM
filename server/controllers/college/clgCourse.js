import {
  updateClgCourseService,
  addClgCourseService,
  fetchClgCourseByNameService,
  deleteClgCourseService,
  fetchClgCourseByIdService,
  fetchAllClgCourseService,
  fetchCollegeCourseByCollegeIdService,
} from "../../services/college/clgCourse.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchClgCourseByIdController = catchAsync(async (req, res) => {
  const { courseId } = req.body;
  if (courseId) {
    const responseClgCourseData = await fetchClgCourseByIdService(courseId);
    if (responseClgCourseData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgCourseData,
        message: "College Course Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College Course",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Course Id",
    });
  }
});

export const fetchCollegeCourseByCollegeIdController = catchAsync(async (req, res) => {
  const { collegeId} = req.body;
  if (collegeId) {
    const responseClgCourseData = await fetchCollegeCourseByCollegeIdService(collegeId);
    
    if (responseClgCourseData ) {
      return res.status(200).json({
        success: true,
        data: responseClgCourseData,
        message: "College Course Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College Course",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the College Id",
    });
  }
});


export const fetchClgCourseByNameController = catchAsync(async (req, res) => {
  const { courseName } = req.body;
  if (courseName) {
    const responseClgCourseData = await fetchClgCourseByNameService(courseName);
    if (responseClgCourseData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseClgCourseData,
        message: "College Course Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for College Course",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the College Course",
    });
  }
});

export const fetchAllClgCourseController = catchAsync(async (req, res) => {
  const responseClgCourseData = await fetchAllClgCourseService();
  if (responseClgCourseData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseClgCourseData,
      message: "All College Course Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of College Course",
    });
  }
});

export const addClgCourseController = catchAsync(async (req, res) => {
  const clgCourseData = req.body;
  clgCourseData.userId = req?.session?.user?.userId;
  clgCourseData.userName = req?.session?.user?.userName;
  clgCourseData.userType = req?.session?.user?.userType;
  clgCourseData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (clgCourseData.courseName && clgCourseData.collegeDepartmentId) {
    const responseClgCourseData = await addClgCourseService(clgCourseData);
    if (
      responseClgCourseData &&
      Object.keys(responseClgCourseData).length > 0
    ) {
      return res.status(200).json({
        success: true,
        data: responseClgCourseData,
        message: "College Course Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "College Course is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the College Course details",
    });
  }
});

export const updateClgCourseController = catchAsync(async (req, res) => {
  const clgCourseData = req.body;
  clgCourseData.userId = req?.session?.user?.userId;
  clgCourseData.userName = req?.session?.user?.userName;
  clgCourseData.userType = req?.session?.user?.userType;
  clgCourseData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (clgCourseData.courseId) {
    const responseClgCourseData = await updateClgCourseService(clgCourseData);
    if (responseClgCourseData.length === 1 && responseClgCourseData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseClgCourseData,
        message: "College Course Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "College Course Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the College Course details",
    });
  }
});

export const deleteClgCourseController = catchAsync(async (req, res) => {
  const clgCourseData = req.body;
  clgCourseData.userId = req?.session?.user?.userId;
  clgCourseData.userName = req?.session?.user?.userName;
  clgCourseData.userType = req?.session?.user?.userType;
  clgCourseData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (clgCourseData.courseId) {
    const responseClgCourseData = await deleteClgCourseService(clgCourseData);
    if (responseClgCourseData != 0) {
      return res.status(200).json({
        success: true,
        data: responseClgCourseData,
        message: "College Course Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "College Course not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the college course ID",
    });
  }
});
