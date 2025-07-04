import db from "../../config/dbConfig.js";
import { IndEmployeeBeforeDestroy } from "../../config/hooks.js";
import {
  fetchAllIndEmp,
  fetchIndEmpById,
  fetchIndEmpByName,
  addIndEmp,
  updateIndEmp,
  deleteIndEmp,
  fetchEmpByCompanyId,
  addIndEmpBatch,
  updateIndEmpBatch,
} from "../../repositories/industry/indEmp.js";
import { addIndEmpHasIndDesBatch } from "../../repositories/industry/indEmpHasIndDes.js";

import { addLog, addLogData } from "../../repositories/other/logTable.js";

export const fetchAllIndEmpService = async () => {
  return await fetchAllIndEmp();
};

export const fetchIndEmpByIdService = async (employeeId) => {
  return await fetchIndEmpById(employeeId);
};

export const fetchEmpByCompanyIdService = async (companyId) => {
  return await fetchEmpByCompanyId(companyId);
};

export const fetchIndEmpByNameService = async (employeeName) => {
  return await fetchIndEmpByName(employeeName);
};

export const addIndEmpService = async (indEmpData) => {
  const addIndEmpResponse = await addIndEmp(indEmpData);
  const { userId, userName, userType, userEmployeeId } = indEmpData;
  const actionType = "add";
  const tableName = "industry_employee";
  const recordId = addIndEmpResponse.dataValues.employeeId;
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
  return addIndEmpResponse;
};

export const addIndEmployeeDesignationService = async (indEmployeeData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const addIndEmployeeResponse = await addIndEmpBatch(
      indEmployeeData,
      transaction
    );

    if (!addIndEmployeeResponse.dataValues.employeeId) {
      await transaction.rollback();
      return { message: "error in adding employee" };
    }

    if (
      Array.isArray(indEmployeeData.designationId) &&
      indEmployeeData.designationId.length > 0
    ) {
      await Promise.all(
        indEmployeeData.designationId.map(async (designationId) => {
          const designationResponse = await addIndEmpHasIndDesBatch(
            {
              employeeId: addIndEmployeeResponse.dataValues.employeeId,
              designationId: designationId,
              userId: indEmployeeData.userId,
            },
            transaction
          );

          const { userId, userName, userType, userEmployeeId } =
            indEmployeeData;
          const designationLogData = {
            userId,
            userName,
            userType,
            actionType: "add",
            tableName: "ind_employee_has_designation",
            recordId: designationResponse.dataValues?.employeeId,
            userEmployeeId,
          };
          return await addLogData(designationLogData, transaction);
        })
      );
    }

    const { userId, userName, userType, userEmployeeId } = indEmployeeData;
    const employeeLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "clg_employee_designation",
      recordId: addIndEmployeeResponse.dataValues.employeeId,
      userEmployeeId,
    };

    await addLogData(employeeLogData, transaction);

    await transaction.commit();

    return addIndEmployeeResponse;
  } catch (error) {
    await transaction.rollback();
    return {
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const updateIndEmpService = async (indEmpData) => {
  const updateIndEmpResponse = await updateIndEmp(indEmpData);
  const { userId, userName, userType, userEmployeeId } = indEmpData;
  const actionType = "update";
  const tableName = "industry_employee";
  const recordId = indEmpData.employeeId;
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
  return updateIndEmpResponse;
};

export const updateIndEmployeeDesignationService = async (indEmployeeData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const updateIndEmployeeResponse = await updateIndEmpBatch(
      indEmployeeData,
      transaction
    );

    if (!updateIndEmployeeResponse[0]) {
      await transaction.rollback();
      return { message: "error in updating employee" };
    }

    if (
      Array.isArray(indEmployeeData.designationId) &&
      indEmployeeData.designationId.length > 0
    ) {
      await Promise.all(
        indEmployeeData.designationId.map(async (designationId) => {
          const designationResponse = await addIndEmpHasIndDesBatch(
            {
              employeeId: indEmployeeData.employeeId,
              designationId: designationId,
            },
            transaction
          );

          const designationLogData = {
            userId: indEmployeeData.userId,
            userName: indEmployeeData.userName,
            userType: indEmployeeData.userType,
            actionType: "add",
            tableName: "Ind_employee_has_designation",
            recordId: designationResponse?.dataValues?.id || designationId,
            userEmployeeId: indEmployeeData.userEmployeeId,
          };
          return await addLog(designationLogData, transaction);
        })
      );
    }

    const { userId, userName, userType, userEmployeeId } = indEmployeeData;
    const actionType = "update";
    const tableName = "Ind_employee_designation";
    const recordId = indEmployeeData.employeeId;

    const logData = {
      userId,
      userName,
      userType,
      actionType,
      tableName,
      recordId,
      userEmployeeId,
    };

    await addLog(logData, transaction);

    await transaction.commit();

    return updateIndEmployeeResponse;
  } catch (error) {
    await transaction.rollback();
    return {
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const deleteIndEmpService = async (indEmpData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { employeeId, userId, userName, userType, userEmployeeId } =
      indEmpData;

    await IndEmployeeBeforeDestroy(indEmpData, transaction);
    const designationLogData = {
      userId: indEmpData.userId,
      userName: indEmpData.userName,
      userType: indEmpData.userType,
      actionType: "delete",
      tableName: "industry_employee_has_industry_designation",
      recordId: indEmpData.employeeId,
      userEmployeeId: indEmpData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    // throw new Error("Hello");
    const deleteIndEmpResponse = await deleteIndEmp(indEmpData, transaction);

    const logData = {
      userId,
      userName,
      userType,
      actionType: "delete",
      tableName: "industry_employee",
      recordId: employeeId,
      userEmployeeId,
    };

    await addLogData(logData, transaction);

    await transaction.commit(); // Only commit here
    return deleteIndEmpResponse;
  } catch (error) {
    // Remove the condition and always roll back on error
    await transaction.rollback();
    throw error;
  }
};
