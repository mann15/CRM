import db from "../../config/dbConfig.js";
import { ClgHasDeptBeforeDestroy } from "../../config/hooks.js";
import {
  fetchClgHasDeptById,
  fetchAllClgHasDept,
  addClgHasDept,
  updateClgHasDept,
  deleteClgHasDept,
} from "../../repositories/college/clgHasDept.js";

import { addLog, addLogData } from "../../repositories/other/logTable.js";

export const fetchClgDeptByIdService = async (clgDeptData) => {
  return await fetchClgHasDeptById(clgDeptData);
};

export const fetchAllClgDeptService = async () => {
  return await fetchAllClgHasDept();
};

export const addClgDeptService = async (clgDeptData) => {
  const addClgDeptResponse = await addClgHasDept(clgDeptData);
  const { userId, userName, userType, userEmployeeId } = clgDeptData;
  const actionType = "add";
  const tableName = "college_has_department";
  if (addClgDeptResponse.message) {
    return addClgDeptResponse;
  }
  if (Array.isArray(addClgDeptResponse)) {
    return addClgDeptResponse;
  }
  const recordId = addClgDeptResponse.dataValues?.collegeId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
    userEmployeeId,
  };
  if (recordId) {
    const logDataResponse = await addLog(logData);
  }
  return addClgDeptResponse;
};

export const updateClgDeptService = async (clgDeptData) => {
  const updateClgDeptResponse = await updateClgHasDept(clgDeptData);
  const { userId, userName, userType, collegeId, userEmployeeId } = clgDeptData;
  const actionType = "update";
  const tableName = "college_has_department";
  if (updateClgDeptResponse.error) {
    return updateClgDeptResponse;
  }
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
  return updateClgDeptResponse;
};

export const deleteClgDeptService = async (clgDeptData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {
      userId,
      userName,
      userType,
      collegeId,
      collegeDepartmentId,
      userEmployeeId,
    } = clgDeptData;
    await ClgHasDeptBeforeDestroy(clgDeptData, transaction);

    const designationLogData = {
      userId: clgDeptData.userId,
      userName: clgDeptData.userName,
      userType: clgDeptData.userType,
      actionType: "delete",
      tableName: "clg_employee_has_designation",
      recordId: clgDeptData.collegeId || clgDeptData.collegeDepartmentId,
      userEmployeeId: clgDeptData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const employeeLogData = {
      userId: clgDeptData.userId,
      userName: clgDeptData.userName,
      userType: clgDeptData.userType,
      actionType: "delete",
      tableName: "clg_employee",
      recordId: clgDeptData.collegeId || clgDeptData.collegeDepartmentId,
      userEmployeeId: clgDeptData.userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    const courseLogData = {
      userId: clgDeptData.userId,
      userName: clgDeptData.userName,
      userType: clgDeptData.userType,
      actionType: "delete",
      tableName: "college_employee",
      recordId: clgDeptData.collegeId || clgDeptData.collegeDepartmentId,
      userEmployeeId: clgDeptData.userEmployeeId,
    };
    await addLogData(courseLogData, transaction);

    const deleteClgDeptResponse = await deleteClgHasDept(
      clgDeptData,
      transaction
    );
    const actionType = "delete";
    const tableName = "college_has_department";
    let recordId;
    if (collegeId) {
      recordId = collegeId;
    } else {
      recordId = collegeDepartmentId;
    }
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
    return deleteClgDeptResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
