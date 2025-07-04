import {
  fetchUniById,
  fetchUniByName,
  addUni,
  updateUni,
  deleteUni,
  fetchAllUni,
  fetchUniByLimit,
  fetchUniData,
} from "../../repositories/university/uniMaster.js";

import { addLog, addLogData } from "../../repositories/other/logTable.js";
import db from "../../config/dbConfig.js";
import { universityMasterBeforeDestroy } from "../../config/hooks.js";

export const fetchUniByIdService = async (uniId) => {
  return await fetchUniById(uniId);
};

export const fetchUniByNameService = async (uniName) => {
  return await fetchUniByName(uniName);
};

export const fetchUniDataService = async () => {
  return await fetchUniData();
};

export const fetchAllUniService = async () => {
  return await fetchAllUni();
};

export const fetchUniByLimitService = async (uniData) => {
  return await fetchUniByLimit(uniData);
};

export const addUniService = async (uniData) => {
  const addUniDataResponse = await addUni(uniData);
  const { userId, userName, userType, userEmployeeId } = uniData;
  const actionType = "add";
  const tableName = "university_master";
  const recordId = addUniDataResponse.dataValues.universityId;
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
  return addUniDataResponse;
};

export const updateUniService = async (uniData) => {
  const updateUniDataResponse = await updateUni(uniData);
  const { userId, userName, userType, universityId, userEmployeeId } = uniData;
  const actionType = "update";
  const tableName = "university_master";
  const recordId = universityId;
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
  return updateUniDataResponse;
};

export const deleteUniService = async (uniData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId, userName, userType, universityId, userEmployeeId } =
      uniData;
    await universityMasterBeforeDestroy(uniData, transaction);

    const clgEmpDesignationLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "clg_employee_has_designation",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(clgEmpDesignationLogData, transaction);

    const designationLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "uni_employee_has_designation",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const clgEmployeeLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "clg_employee",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(clgEmployeeLogData, transaction);

    const employeeLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "uni_employee",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    const clgCourseLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "college_course",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(clgCourseLogData, transaction);

    const courseLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "university_course",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(courseLogData, transaction);

    const clgdepartmentLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "college_has_department",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(clgdepartmentLogData, transaction);

    const departmentLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "university_has_department",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(departmentLogData, transaction);

    const collegeLogData = {
      userId: uniData.userId,
      userName: uniData.userName,
      userType: uniData.userType,
      actionType: "delete",
      tableName: "clg_master",
      recordId: uniData.universityId,
      userEmployeeId: uniData.userEmployeeId,
    };
    await addLogData(collegeLogData, transaction);

    const deleteUniDataResponse = await deleteUni(uniData, transaction);
    const actionType = "delete";
    const tableName = "university_master";
    const recordId = universityId;
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
    return deleteUniDataResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
