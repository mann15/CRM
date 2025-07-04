import {
  updateUniCourseService,
  addUniCourseService,
  fetchUniCourseByNameService,
  deleteUniCourseService,
  fetchUniCourseByIdService,
  fetchAllUniCourseService,
  fetchUniCourseByUniversityIdService,
} from "../../services/university/uniCourse.js";

import { catchAsync } from "../../utils/catchAsync.js";

export const fetchUniCourseByIdController = catchAsync(async (req, res) => {
  const { courseId } = req.body;
  if (courseId) {
    const responseUniCourseData = await fetchUniCourseByIdService(courseId);
    if (responseUniCourseData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniCourseData,
        message: "University Course Data Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for University Course",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the Course Id",
    });
  }
});

export const fetchUniCourseByUniversityIdController = catchAsync(
  async (req, res) => {
    const { universityId } = req.body;
    if (universityId) {
      const responseUniCourseData = await fetchUniCourseByUniversityIdService(
        universityId
      );
      if (responseUniCourseData.length > 0) {
        return res.status(200).json({
          success: true,
          data: responseUniCourseData,
          message: "University Course Fetched Successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "No Data Found for University Course",
        });
      }
    }
    return res.status(400).json({
      success: false,
      message: "Please pass the University Id",
    });
  }
);

export const fetchUniCourseByNameController = catchAsync(async (req, res) => {
  const { courseName } = req.body;
  if (courseName) {
    const responseUniCourseData = await fetchUniCourseByNameService(courseName);
    if (responseUniCourseData.length > 0) {
      return res.status(200).json({
        success: true,
        data: responseUniCourseData,
        message: "University Course Fetched Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No Data Found for University Course",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the University Course name",
    });
  }
});

export const fetchAllUniCourseController = catchAsync(async (req, res) => {
  const responseUniCourseData = await fetchAllUniCourseService();
  if (responseUniCourseData.length > 0) {
    return res.status(200).json({
      success: true,
      data: responseUniCourseData,
      message: "All University Course Fetched Successfully",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No Data Found of University Course",
    });
  }
});

export const addUniCourseController = catchAsync(async (req, res) => {
  const uniCourseData = req.body;
  uniCourseData.userId = req?.session?.user?.userId;
  uniCourseData.userName = req?.session?.user?.userName;
  uniCourseData.userType = req?.session?.user?.userType;
  uniCourseData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (uniCourseData.universityDepartmentId && uniCourseData.courseName) {
    const responseUniCourseData = await addUniCourseService(uniCourseData);
    if (
      responseUniCourseData &&
      Object.keys(responseUniCourseData).length > 0
    ) {
      return res.status(200).json({
        success: true,
        data: responseUniCourseData,
        message: "University Course Added Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "University Course is not added, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the University Course details",
    });
  }
});

export const updateUniCourseController = catchAsync(async (req, res) => {
  const uniCourseData = req.body;
  uniCourseData.userId = req?.session?.user?.userId;
  uniCourseData.userName = req?.session?.user?.userName;
  uniCourseData.userType = req?.session?.user?.userType;
  uniCourseData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (uniCourseData.courseId && uniCourseData.courseName) {
    const responseUniCourseData = await updateUniCourseService(uniCourseData);
    if (responseUniCourseData.length === 1 && responseUniCourseData[0] === 1) {
      return res.status(200).json({
        success: true,
        data: responseUniCourseData,
        message: "University Course Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "University Course Not Updated, Please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the University Course details",
    });
  }
});

export const deleteUniCourseController = catchAsync(async (req, res) => {
  const uniCourseData = req.body;
  uniCourseData.userId = req?.session?.user?.userId;
  uniCourseData.userName = req?.session?.user?.userName;
  uniCourseData.userType = req?.session?.user?.userType;
  uniCourseData.userEmployeeId = req?.session?.user?.userEmployeeId;
  if (uniCourseData.courseId) {
    const responseUniCourseData = await deleteUniCourseService(uniCourseData);
    if (responseUniCourseData) {
      return res.status(200).json({
        success: true,
        data: responseUniCourseData,
        message: "University Course Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "University Course not deleted, please try again",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Please pass the university course ID",
    });
  }
});
