import {
  fetchClgEmployeeById,
  fetchClgEmployeeByName,
  addClgEmployee,
  updateClgEmployee,
  deleteClgEmployee,
  fetchAllClgEmployee,
  fetchClgEmployeeByLimit,
  fetchEmpData,
  updateClgEmployeeBatch,
  addClgEmployeeBatch,
} from "../../repositories/college/clgEmployee.js";
import {
  addClgEmployeeHasDesignationBatch,
  deleteClgEmpHasDesignation,
} from "../../repositories/college/clgEmployeeHasDesignation.js";
import { addLog, addLogData } from "../../repositories/other/logTable.js";
import db from "../../config/dbConfig.js";
import { ClgEmployeeBeforeDestroy } from "../../config/hooks.js";

export const fetchClgEmployeeByIdService = async (employeeId) => {
  return await fetchClgEmployeeById(employeeId);
};

export const fetchEmpDataService = async (collegeId) => {
  return await fetchEmpData(collegeId);
};

export const fetchClgEmployeeByNameService = async (employeeName) => {
  return await fetchClgEmployeeByName(employeeName);
};

export const fetchAllClgEmployeeService = async () => {
  return await fetchAllClgEmployee();
};

export const fetchClgEmployeeByLimitService = async (clgEmployeeData) => {
  return await fetchClgEmployeeByLimit(clgEmployeeData);
};

export const addClgEmployeeService = async (clgEmployeeData) => {
  const addClgEmployeeResponse = await addClgEmployee(clgEmployeeData);
  const { userId, userName, userType, userEmployeeId } = clgEmployeeData;
  const actionType = "add";
  const tableName = "clg_department_employee";
  const recordId = addClgEmployeeResponse.dataValues.collegeDepartmentId;
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
  return addClgEmployeeResponse;
};
export const addClgEmployeeDesignationService = async (clgEmployeeData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const addClgEmployeeResponse = await addClgEmployeeBatch(
      clgEmployeeData,
      transaction
    );

    const { userId, userName, userType, userEmployeeId } = clgEmployeeData;
    const employeeLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "clg_department_employee",
      recordId: addClgEmployeeResponse?.dataValues?.employeeId,
      userEmployeeId,
    };

    await addLogData(employeeLogData, transaction);
    if (
      Array.isArray(clgEmployeeData.designationId) &&
      clgEmployeeData.designationId.length > 0
    ) {
      await Promise.all(
        clgEmployeeData.designationId.map(async (designationId) => {
          const designationResponse = await addClgEmployeeHasDesignationBatch(
            {
              employeeId: addClgEmployeeResponse.dataValues.employeeId,
              designationId: designationId,
              userId: clgEmployeeData.userId,
            },
            transaction
          );

          const designationLogData = {
            userId,
            userName,
            userType,
            actionType: "add",
            tableName: "clg_employee_has_designation",
            recordId: designationResponse.dataValues?.employeeId,
            userEmployeeId,
          };

          return await addLogData(designationLogData, transaction);
        })
      );
    }

    await transaction.commit();

    return addClgEmployeeResponse;
  } catch (error) {
    await transaction.rollback();
    return {
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const updateClgEmployeeService = async (clgEmployeeData) => {
  const updatClgEmployeeResponse = await updateClgEmployee(clgEmployeeData);
  const { userId, userName, userType, employeeId, userEmployeeId } =
    clgEmployeeData;
  const actionType = "update";
  const tableName = "clg_department_employee";
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
  return updatClgEmployeeResponse;
};

export const updateClgEmployeeDesignationService = async (clgEmployeeData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const updateClgEmployeeResponse = await updateClgEmployeeBatch(
      clgEmployeeData,

      transaction
    );

    // if (!updateClgEmployeeResponse[0]) {
    //   await transaction.rollback();
    //   return { message: "error in updating employee" };
    // }

    if (
      Array.isArray(clgEmployeeData.designationId) &&
      clgEmployeeData.designationId.length > 0
    ) {
      await Promise.all(
        clgEmployeeData.designationId.map(async (designationId) => {
          const designationResponse = await addClgEmployeeHasDesignationBatch(
            {
              employeeId: clgEmployeeData.employeeId,
              designationId: designationId,
              userId: clgEmployeeData.userId,
            },
            transaction
          );

          const designationLogData = {
            userId: clgEmployeeData.userId,
            userName: clgEmployeeData.userName,
            userType: clgEmployeeData.userType,
            actionType: "add",
            tableName: "clg_employee_has_designation",
            recordId: designationResponse?.dataValues?.id || designationId,
            userEmployeeId: clgEmployeeData.userEmployeeId,
          };
          return await addLogData(designationLogData, transaction);
        })
      );
    }

    const { userId, userName, userType, userEmployeeId } = clgEmployeeData;
    const actionType = "update";
    const tableName = "clg_employee_designation";
    const recordId = clgEmployeeData.employeeId;

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

    return updateClgEmployeeResponse;
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    return {
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const deleteClgEmployeeService = async (clgEmployeeData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { employeeId, userId, userName, userType, userEmployeeId } =
      clgEmployeeData;

    await ClgEmployeeBeforeDestroy(clgEmployeeData, transaction);

    // Log the designation deletion
    const designationLogData = {
      userId: clgEmployeeData.userId,
      userName: clgEmployeeData.userName,
      userType: clgEmployeeData.userType,
      actionType: "delete",
      tableName: "clg_employee_has_designation",
      recordId: clgEmployeeData.employeeId,
      userEmployeeId: clgEmployeeData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const deleteClgEmployeeResponse = await deleteClgEmployee(
      clgEmployeeData,
      transaction
    );

    const logData = {
      userId,
      userName,
      userType,
      actionType: "delete",
      tableName: "clg_employee",
      recordId: employeeId,
      userEmployeeId,
    };

    await addLogData(logData, transaction);

    await transaction.commit();
    return deleteClgEmployeeResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
