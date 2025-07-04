import {
  fetchClgEmployeeHasDesignationById,
  fetchAllClgEmployeeHasDesignation,
  addClgEmployeeHasDesignation,
  updateClgEmployeeHasDesignation,
  deleteClgEmployeeHasDesignation,
} from "../../repositories/college/clgEmployeeHasDesignation.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchClgEmployeeHasDesignationByIdService = async (
  clgEmpDesignationData
) => {
  return await fetchClgEmployeeHasDesignationById(clgEmpDesignationData);
};

export const fetchAllClgEmployeeHasDesignationService = async () => {
  return await fetchAllClgEmployeeHasDesignation();
};

export const addClgEmployeeHasDesignationService = async (
  clgEmpDesignationData
) => {
  const addClgEmpDesignationResponse = await addClgEmployeeHasDesignation(
    clgEmpDesignationData
  );
  const { userId, userName, userType, userEmployeeId } = clgEmpDesignationData;
  const actionType = "add";
  const tableName = "college_employee_has_designation";
  if (Array.isArray(addClgEmpDesignationResponse)) {
    return addClgEmpDesignationResponse;
  }
  const recordId = addClgEmpDesignationResponse.dataValues?.employeeId;
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
  return addClgEmpDesignationResponse;
};

export const updateClgEmployeeHasDesignationService = async (
  clgEmpDesignationData
) => {
  const updateClgEmpDesignationResponse = await updateClgEmployeeHasDesignation(
    clgEmpDesignationData
  );
  const { userId, userName, userType, employeeId, userEmployeeId } =
    clgEmpDesignationData;
  const actionType = "update";
  const tableName = "college_employee_has_designation";
  if (updateClgEmpDesignationResponse.error) {
    return updateClgEmpDesignationResponse;
  }
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
  return updateClgEmpDesignationResponse;
};

export const deleteClgEmployeeHasDesignationService = async (
  clgEmpDesignationData
) => {
  const deleteClgEmpDesignationResponse = await deleteClgEmployeeHasDesignation(
    clgEmpDesignationData
  );
  const { userId, userName, userType, employeeId, userEmployeeId } =
    clgEmpDesignationData;
  const actionType = "delete";
  const tableName = "college_employee_has_designation";
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
  return deleteClgEmpDesignationResponse;
};
