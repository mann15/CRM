import {
  fetchUniEmployeeHasDesignationById,
  fetchAllUniEmployeeHasDesignation,
  addUniEmployeeHasDesignation,
  updateUniEmployeeHasDesignation,
  deleteUniEmployeeHasDesignation,
} from "../../repositories/university/uniEmployeeHasDesignation.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchUniEmployeeHasDesignationByIdService = async (
  uniEmpDesignationData
) => {
  return await fetchUniEmployeeHasDesignationById(uniEmpDesignationData);
};

export const fetchAllUniEmployeeHasDesignationService = async () => {
  return await fetchAllUniEmployeeHasDesignation();
};

export const addUniEmployeeHasDesignationService = async (
  uniEmpDesignationData
) => {
  const addUniEmpDesignationResponse = await addUniEmployeeHasDesignation(
    uniEmpDesignationData
  );
  const { userId, userName, userType, userEmployeeId } = uniEmpDesignationData;
  const actionType = "add";
  const tableName = "university_employee_has_designation";
  if (addUniEmpDesignationResponse.message) {
    return addUniEmpDesignationResponse;
  }
  if (Array.isArray(addUniEmpDesignationResponse)) {
    return addUniEmpDesignationResponse;
  }
  const recordId = addUniEmpDesignationResponse.dataValues?.employeeId;
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
  return addUniEmpDesignationResponse;
};

export const updateUniEmployeeHasDesignationService = async (
  uniEmpDesignationData
) => {
  const updateUniEmpDesignationResponse = await updateUniEmployeeHasDesignation(
    uniEmpDesignationData
  );
  const { userId, userName, userType, employeeId, userEmployeeId } =
    uniEmpDesignationData;
  const actionType = "update";
  const tableName = "university_employee_has_designation";
  if (updateUniEmpDesignationResponse.error) {
    return updateUniEmpDesignationResponse;
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
  return updateUniEmpDesignationResponse;
};

export const deleteUniEmployeeHasDesignationService = async (
  uniEmpDesignationData
) => {
  const deleteUniEmpDesignationResponse = await deleteUniEmployeeHasDesignation(
    uniEmpDesignationData
  );
  const { userId, userName, userType, employeeId, userEmployeeId } =
    uniEmpDesignationData;
  const actionType = "delete";
  const tableName = "university_employee_has_designation";
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
  return deleteUniEmpDesignationResponse;
};
