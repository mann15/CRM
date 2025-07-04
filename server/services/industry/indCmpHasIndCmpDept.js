import db from "../../config/dbConfig.js";
import {
  IndCmpHasCmpDeptBeforeDestroy,
  IndEmployeeBeforeDestroy,
} from "../../config/hooks.js";
import {
  fetchIndCmpHasIndCmpDeptById,
  fetchAllIndCmpHasIndCmpDept,
  addIndCmpHasIndCmpDept,
  updateIndCmpHasIndCmpDept,
  deleteIndCmpHasIndCmpDept,
} from "../../repositories/industry/indCmpHasIndCmpDept.js";
import { deleteIndEmp } from "../../repositories/industry/indEmp.js";

import { addLog, addLogData } from "../../repositories/other/logTable.js";

export const fetchCmpDeptByIdService = async (cmpDeptData) => {
  return await fetchIndCmpHasIndCmpDeptById(cmpDeptData);
};

export const fetchAllCmpDeptService = async () => {
  return await fetchAllIndCmpHasIndCmpDept();
};

export const addCmpDeptService = async (cmpDeptData) => {
  const addCmpDeptResponse = await addIndCmpHasIndCmpDept(cmpDeptData);
  const { userId, userName, userType, userEmployeeId } = cmpDeptData;
  const actionType = "add";
  const tableName = "industry_company_has_industry_company_department";
  if (addCmpDeptResponse.message) {
    return addCmpDeptResponse;
  }
  if (Array.isArray(addCmpDeptResponse)) {
    return addCmpDeptResponse;
  }

  const recordId = addCmpDeptResponse.dataValues?.companyId;
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
  return addCmpDeptResponse;
};

export const updateCmpDeptService = async (cmpDeptData) => {
  const updateCmpDeptResponse = await updateIndCmpHasIndCmpDept(cmpDeptData);
  const { userId, userName, userType, companyId, userEmployeeId } = cmpDeptData;
  const actionType = "update";
  const tableName = "industry_company_has_industry_company_department";
  const recordId = companyId;
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
  return updateCmpDeptResponse;
};

export const deleteCmpDeptService = async (cmpDeptData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {
      userId,
      userName,
      userType,
      departmentId,
      companyDepartmentId,
      userEmployeeId,
    } = cmpDeptData;

    await IndCmpHasCmpDeptBeforeDestroy(cmpDeptData, transaction);

    const designationLogData = {
      userId: cmpDeptData.userId,
      userName: cmpDeptData.userName,
      userType: cmpDeptData.userType,
      actionType: "delete",
      tableName: "industry_employee_has_industry_designation",
      recordId: cmpDeptData.companyDepartmentId || cmpDeptData.companyId,
      userEmployeeId: cmpDeptData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const employeeLogData = {
      userId: cmpDeptData.userId,
      userName: cmpDeptData.userName,
      userType: cmpDeptData.userType,
      actionType: "delete",
      tableName: "industry_employee",
      recordId: cmpDeptData.companyDepartmentId || cmpDeptData.companyId,
      userEmployeeId: cmpDeptData.userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    const deleteCmpDeptResponse = await deleteIndCmpHasIndCmpDept(
      cmpDeptData,
      transaction
    );

    const actionType = "delete";
    const tableName = "industry_company_has_industry_company_department";
    let recordId = companyDepartmentId || companyId;

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
    return deleteCmpDeptResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
