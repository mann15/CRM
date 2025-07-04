import {
  fetchUniCourseById,
  fetchUniCourseByName,
  addUniCourse,
  updateUniCourse,
  deleteUniCourse,
  fetchAllUniCourse,
  fetchUniCourseByUniversityId
} from "../../repositories/university/uniCourse.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchUniCourseByIdService = async (courseId) => {
  return await fetchUniCourseById(courseId);
};

export const fetchUniCourseByNameService = async (courseName) => {
  return await fetchUniCourseByName(courseName);
};

export const fetchUniCourseByUniversityIdService = async (universityId) => {
  return await fetchUniCourseByUniversityId(universityId);
}


export const fetchAllUniCourseService = async () => {
  return await fetchAllUniCourse();
};

export const addUniCourseService = async (uniCourseData) => {
  const addUniCourseDataResponse = await addUniCourse(uniCourseData);
  const { userId, userName, userType,userEmployeeId } = uniCourseData;
  const actionType = "add";
  const tableName = "university_course";
  const recordId = addUniCourseDataResponse.dataValues.courseId;
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
  return addUniCourseDataResponse;
};

export const updateUniCourseService = async (uniCourseData) => {
  const updateUniCourseDataResponse = await updateUniCourse(uniCourseData);
  const { userId, userName, userType, courseId, userEmployeeId } = uniCourseData;
  const actionType = "update";
  const tableName = "university_course";
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
  return updateUniCourseDataResponse;
};

export const deleteUniCourseService = async (uniCourseData) => {
  const deleteUniCourseDataResponse = await deleteUniCourse(uniCourseData);
  const { userId, userName, userType, courseId,userEmployeeId } = uniCourseData;
  const actionType = "delete";
  const tableName = "university_course";
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
  return deleteUniCourseDataResponse;
};
