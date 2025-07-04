import {
  fetchUniHasDeptById,
  fetchAllUniHasDept,
  addUniHasDept,
  updateUniHasDept,
  deleteUniHasDept,
} from "../../repositories/university/uniHasDept.js";

import { addLog, addLogData } from "../../repositories/other/logTable.js";
import db from "../../config/dbConfig.js";
import { UniHasDeptBeforeDestroy } from "../../config/hooks.js";

export const fetchUniDeptByIdService = async (uniDeptData) => {
  return await fetchUniHasDeptById(uniDeptData);
};

export const fetchAllUniDeptService = async () => {
  return await fetchAllUniHasDept();
};

export const addUniDeptService = async (uniDeptData) => {
  const addUniDeptResponse = await addUniHasDept(uniDeptData);
  const { userId, userName, userType, userEmployeeId } = uniDeptData;
  const actionType = "add";
  const tableName = "university_has_department";
  if (addUniDeptResponse.message) {
    return addUniDeptResponse;
  }
  if (Array.isArray(addUniDeptResponse)) {
    return addUniDeptResponse;
  }

  const recordId = addUniDeptResponse.dataValues?.universityId;
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
  return addUniDeptResponse;
};

export const updateUniDeptService = async (uniDeptData) => {
  const updateUniDeptResponse = await updateUniHasDept(uniDeptData);
  const { userId, userName, userType, universityId, userEmployeeId } =
    uniDeptData;
  const actionType = "update";
  const tableName = "university_has_department";
  if (updateUniDeptResponse.error) {
    return updateUniDeptResponse;
  }
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
  return updateUniDeptResponse;
};

export const deleteUniDeptService = async (uniDeptData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {
      userId,
      userName,
      userType,
      universityId,
      universityDepartmentId,
      userEmployeeId,
    } = uniDeptData;
    await UniHasDeptBeforeDestroy(uniDeptData, transaction);

    const designationLogData = {
      userId: uniDeptData.userId,
      userName: uniDeptData.userName,
      userType: uniDeptData.userType,
      actionType: "delete",
      tableName: "uni_employee_has_designation",
      recordId: uniDeptData.universityId || uniDeptData.universityDepartmentId,
      userEmployeeId: uniDeptData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const employeeLogData = {
      userId: uniDeptData.userId,
      userName: uniDeptData.userName,
      userType: uniDeptData.userType,
      actionType: "delete",
      tableName: "uni_employee",
      recordId: uniDeptData.universityId || uniDeptData.universityDepartmentId,
      userEmployeeId: uniDeptData.userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    const courseLogData = {
      userId: uniDeptData.userId,
      userName: uniDeptData.userName,
      userType: uniDeptData.userType,
      actionType: "delete",
      tableName: "university_course",
      recordId: uniDeptData.universityId || uniDeptData.universityDepartmentId,
      userEmployeeId: uniDeptData.userEmployeeId,
    };
    await addLogData(courseLogData, transaction);

    const deleteUniDeptResponse = await deleteUniHasDept(
      uniDeptData,
      transaction
    );
    const actionType = "delete";
    const tableName = "university_has_department";
    let recordId;
    if (universityDepartmentId) {
      recordId = universityDepartmentId; 
    } else {
      recordId = universityId;
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
    return deleteUniDeptResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
