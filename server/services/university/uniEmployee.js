import {
  fetchUniEmployeeById,
  fetchUniEmployeeByName,
  addUniEmployee,
  updateUniEmployee,
  deleteUniEmployee,
  fetchAllUniEmployee,
  fetchUniEmployeeByLimit,
  fetchUniEmployeeByUniversityId,
  addUniEmployeeBatch,
  updateUniEmployeeBatch,
} from "../../repositories/university/uniEmployee.js";

import { addLog, addLogData } from "../../repositories/other/logTable.js";
import {
  addUniEmployeeHasDesignation,
  addUniEmployeeHasDesignationBatch,
  deleteUniEmpHasDesignation,
} from "../../repositories/university/uniEmployeeHasDesignation.js";
import db from "../../config/dbConfig.js";
import { UniEmployeeBeforeDestroy } from "../../config/hooks.js";

export const fetchUniEmployeeByIdService = async (employeeId) => {
  return await fetchUniEmployeeById(employeeId);
};

export const fetchUniEmployeeByNameService = async (employeeName) => {
  return await fetchUniEmployeeByName(employeeName);
};

export const fetchUniEmployeeByUniversityIdService = async (universityId) => {
  return await fetchUniEmployeeByUniversityId(universityId);
};

export const fetchAllUniEmployeeService = async () => {
  return await fetchAllUniEmployee();
};

export const fetchUniEmployeeByLimitService = async (uniEmployeeData) => {
  return await fetchUniEmployeeByLimit(uniEmployeeData);
};

export const addUniEmployeeService = async (uniEmployeeData) => {
  const addUniEmployeeResponse = await addUniEmployee(uniEmployeeData);
  const { userId, userName, userType, userEmployeeId } = uniEmployeeData;
  const actionType = "add";
  const tableName = "uni_employee";
  const recordId = addUniEmployeeResponse.dataValues.employeeId;
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
  return addUniEmployeeResponse;
};

export const addUniEmployeeDesignationService = async (uniEmployeeData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const addUniEmployeeResponse = await addUniEmployeeBatch(
      uniEmployeeData,
      transaction
    );

    if (!addUniEmployeeResponse.dataValues.employeeId) {
      await transaction.rollback();
      return { message: "error in adding employee" };
    }

    // First log entry for employee addition
    const { userId, userName, userType, userEmployeeId } = uniEmployeeData;
    const employeeLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "uni_employee_designation",
      recordId: addUniEmployeeResponse.dataValues.employeeId,
      userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    if (
      Array.isArray(uniEmployeeData.designationId) &&
      uniEmployeeData.designationId.length > 0
    ) {
      // Map through all designation IDs and create promises for each with transaction
      await Promise.all(
        uniEmployeeData.designationId.map(async (designationId) => {
          const designationResponse = await addUniEmployeeHasDesignationBatch(
            {
              employeeId: addUniEmployeeResponse.dataValues.employeeId,
              designationId: designationId,
              userId: uniEmployeeData.userId,
            },
            transaction
          );

          const designationLogData = {
            userId,
            userName,
            userType,
            actionType: "add",
            tableName: "uni_employee_has_designation",
            recordId: designationResponse.dataValues?.employeeId,
            userEmployeeId,
          };
          return await addLogData(designationLogData, transaction);
        })
      );
    }

    await transaction.commit();

    return addUniEmployeeResponse;
  } catch (error) {
    await transaction.rollback();
    return {
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const updateUniEmployeeService = async (uniEmployeeData) => {
  const updateUniEmployeeResponse = await updateUniEmployee(uniEmployeeData);
  const { userId, userName, userType, employeeId, userEmployeeId } =
    uniEmployeeData;
  const actionType = "update";
  const tableName = "uni_employee";
  const recordId = employeeId;
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
  return updateUniEmployeeResponse;
};

export const updateUniEmployeeDesignationService = async (uniEmployeeData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const updateUniEmployeeResponse = await updateUniEmployeeBatch(
      uniEmployeeData,

      transaction
    );

    if (!updateUniEmployeeResponse[0]) {
      await transaction.rollback();
      return { message: "error in updating employee" };
    }

    if (
      Array.isArray(uniEmployeeData.designationId) &&
      uniEmployeeData.designationId.length > 0
    ) {
      await Promise.all(
        uniEmployeeData.designationId.map(async (designationId) => {
          const designationResponse = await addUniEmployeeHasDesignationBatch(
            {
              employeeId: uniEmployeeData.employeeId,
              designationId: designationId,
              userId: uniEmployeeData.userId,
            },
            transaction
          );

          const designationLogData = {
            userId: uniEmployeeData.userId,
            userName: uniEmployeeData.userName,
            userType: uniEmployeeData.userType,
            actionType: "add",
            tableName: "uni_employee_has_designation",
            recordId: designationResponse?.dataValues?.id || designationId,
            userEmployeeId: uniEmployeeData.userEmployeeId,
          };
          return await addLogData(designationLogData, transaction);
        })
      );
    }

    const { userId, userName, userType, userEmployeeId } = uniEmployeeData;
    const actionType = "update";
    const tableName = "uni_employee_designation";
    const recordId = uniEmployeeData.employeeId;

    const logData = {
      userId,
      userName,
      userType,
      actionType,
      tableName,
      recordId,
      userEmployeeId,
    };

    await addLogData(logData, transaction);

    await transaction.commit();

    return updateUniEmployeeResponse;
  } catch (error) {
    await transaction.rollback();
    return {
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const deleteUniEmployeeService = async (uniEmployeeData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { employeeId, userId, userName, userType, userEmployeeId } =
      uniEmployeeData;
    await UniEmployeeBeforeDestroy(uniEmployeeData, transaction);

    const designationLogData = {
      userId: uniEmployeeData.userId,
      userName: uniEmployeeData.userName,
      userType: uniEmployeeData.userType,
      actionType: "delete",
      tableName: "uni_employee_has_designation",
      recordId: uniEmployeeData.employeeId,
      userEmployeeId: uniEmployeeData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);
    const deleteUniEmployeeResponse = await deleteUniEmployee(
      uniEmployeeData,
      transaction
    );

    const logData = {
      userId: userId,
      userName: userName,
      userType: userType,
      actionType: "delete",
      tableName: "uni_employee",
      recordId: employeeId,
      userEmployeeId: userEmployeeId,
    };
    await addLogData(logData, transaction);
    await transaction.commit();
    return deleteUniEmployeeResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
