import {
  fetchClgCourseById,
  fetchClgCourseByName,
  addClgCourse,
  updateClgCourse,
  deleteClgCourse,
  fetchAllClgCourse,
  fetchCollegeCourseByCollegeId,
} from "../../repositories/college/clgCourse.js";
  
  import { addLog } from "../../repositories/other/logTable.js";
  
  export const fetchClgCourseByIdService = async (courseId) => {
    return await fetchClgCourseById(courseId);
  };

  export const fetchCollegeCourseByCollegeIdService = async (collegeId) => {
    return await fetchCollegeCourseByCollegeId(collegeId);
  };
  
  export const fetchClgCourseByNameService = async (courseName) => {
    return await fetchClgCourseByName(courseName);
  };
  
  export const fetchAllClgCourseService = async () => {
    return await fetchAllClgCourse();
  };
  
  export const addClgCourseService = async (clgCourseData) => {
    const addClgCourseDataResponse = await addClgCourse(clgCourseData);
    const { userId, userName, userType,userEmployeeId } = clgCourseData;
    const actionType = "add";
    const tableName = "college_course";
    const recordId = addClgCourseDataResponse.dataValues.courseId;
    const logData = {
      userId,
      userName,
      userType,
      actionType,
      tableName,
      recordId,
      userEmployeeId
    };
    const logDataResponse = await addLog(logData);
    return addClgCourseDataResponse;
  };
  
  export const updateClgCourseService = async (clgCourseData) => {
    const updateClgCourseDataResponse = await updateClgCourse(clgCourseData);
    const { userId, userName, userType, courseId, userEmployeeId } = clgCourseData;
    const actionType = "update";
    const tableName = "college_course";
    const recordId = courseId;
    const logData = {
      userId,
      userName,
      userType,
      actionType,
      tableName,
      recordId,
      userEmployeeId
    };
    const logDataResponse = await addLog(logData);
    return updateClgCourseDataResponse;
  };
  
  export const deleteClgCourseService = async (clgCourseData) => {
    const deleteClgCourseDataResponse = await deleteClgCourse(clgCourseData);
    const { userId, userName, userType, courseId,userEmployeeId } = clgCourseData;
    const actionType = "delete";
    const tableName = "college_course";
    const recordId = courseId;
    const logData = {
      userId,
      userName,
      userType,
      actionType,
      tableName,
      recordId,
      userEmployeeId
    };
    const logDataResponse = await addLog(logData);
    return deleteClgCourseDataResponse;
  };
  