import db from "../../config/dbConfig.js";
import { collegeMasterBeforeDestroy } from "../../config/hooks.js";
import {
  fetchClgById,
  fetchClgByName,
  addClg,
  updateClg,
  deleteClg,
  fetchAllClg,
  fetchClgByLimit,
  fetchAllCollege,
} from "../../repositories/college/clgMaster.js";

import { addLog, addLogData } from "../../repositories/other/logTable.js";

export const fetchClgByIdService = async (collegeId) => {
  return await fetchClgById(collegeId);
};

export const fetchClgByNameService = async (collegeName) => {
  return await fetchClgByName(collegeName);
};

export const fetchAllClgService = async () => {
  return await fetchAllClg();
};

export const fetchClgByLimitService = async (clgData) => {
  return await fetchClgByLimit(clgData);
};

export const fetchAllCollegeService = async () => {
  return await fetchAllCollege();
};

export const addClgService = async (clgData) => {
  const addClgResponse = await addClg(clgData);
  const { userId, userName, userType, userEmployeeId } = clgData;
  const actionType = "add";
  const tableName = "clg_master";
  const recordId = addClgResponse.dataValues.collegeId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
    userEmployeeId,
  };
  const logDataResponse = await addLog(logData);
  return addClgResponse;
};

export const updateClgService = async (clgData) => {
  const updateClgResponse = await updateClg(clgData);
  const { userId, userName, userType, collegeId, userEmployeeId } = clgData;
  const actionType = "update";
  const tableName = "clg_master";
  const recordId = collegeId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
    userEmployeeId,
  };
  const logDataResponse = await addLog(logData);
  return updateClgResponse;
};

export const deleteClgService = async (clgData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId, userName, userType, collegeId, userEmployeeId } = clgData;
    await collegeMasterBeforeDestroy(clgData, transaction);

    const designationLogData = {
      userId: clgData.userId,
      userName: clgData.userName,
      userType: clgData.userType,
      actionType: "delete",
      tableName: "clg_employee_has_designation",
      recordId: clgData.collegeId,
      userEmployeeId: clgData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const employeeLogData = {
      userId: clgData.userId,
      userName: clgData.userName,
      userType: clgData.userType,
      actionType: "delete",
      tableName: "clg_employee",
      recordId: clgData.collegeId,
      userEmployeeId: clgData.userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    const courseLogData = {
      userId: clgData.userId,
      userName: clgData.userName,
      userType: clgData.userType,
      actionType: "delete",
      tableName: "college_course",
      recordId: clgData.collegeId,
      userEmployeeId: clgData.userEmployeeId,
    };
    await addLogData(courseLogData, transaction);

    const departmentLogData = {
      userId: clgData.userId,
      userName: clgData.userName,
      userType: clgData.userType,
      actionType: "delete",
      tableName: "college_has_department",
      recordId: clgData.collegeId,
      userEmployeeId: clgData.userEmployeeId,
    };
    await addLogData(departmentLogData, transaction);
    // throw new Error("Error");
    const deleteClgResponse = await deleteClg(clgData, transaction);
    const actionType = "delete";
    const tableName = "clg_master";
    const recordId = collegeId;
    const logData = {
      userId,
      userName,
      userType,
      actionType,
      tableName,
      recordId,
      userEmployeeId,
    };
    const logDataResponse = await addLogData(logData, transaction);
    await transaction.commit();
    return deleteClgResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
