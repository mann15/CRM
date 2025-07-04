import {
  fetchDepartmentById,
  fetchDepartmentByName,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  fetchAllDepartment,
} from "../../repositories/other/departmentMaster.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchDepartmentByIdService = async (departmentId) => {
  return await fetchDepartmentById(departmentId);
};

export const fetchDepartmentByNameService = async (departmentName) => {
  return await fetchDepartmentByName(departmentName);
};

export const fetchAllDepartmentService = async () => {
  return await fetchAllDepartment();
};

export const addDepartmentService = async (departmentData) => {
  const addDepartmentResponse = await addDepartment(departmentData);
  const { userId, userName, userType, userEmployeeId } = departmentData;
  const actionType = "add";
  const tableName = "department_master";
  if (addDepartmentResponse.message) {
    return addDepartmentResponse;
  }
  if (Array.isArray(addDepartmentResponse)) {
    return addDepartmentResponse;
  }
  const recordId = addDepartmentResponse.dataValues.departmentId;
  const logData = {
    userId,
    userName,
    userType,
    userEmployeeId,
    actionType,
    tableName,
    recordId,
  };
  const logDataResponse = await addLog(logData);
  return addDepartmentResponse;
};

export const updateDepartmentService = async (departmentData) => {
  const updateDepartmentResponse = await updateDepartment(departmentData);
  const { userId, userName, userType, userEmployeeId, departmentId } =
    departmentData;
  const actionType = "update";
  const tableName = "department_master";
  const recordId = departmentId;
  const logData = {
    userId,
    userName,
    userType,
    userEmployeeId,
    actionType,
    tableName,
    recordId,
  };
  const logDataResponse = await addLog(logData);
  return updateDepartmentResponse;
};

export const deleteDepartmentService = async (departmentData) => {
  const deleteDepartmentResponse = await deleteDepartment(departmentData);
  const { userId, userName, userType, userEmployeeId, departmentId } =
    departmentData;
  const actionType = "delete";
  const tableName = "department_master";
  const recordId = departmentId;
  const logData = {
    userId,
    userName,
    userType,
    userEmployeeId,
    actionType,
    tableName,
    recordId,
  };
  const logDataResponse = await addLog(logData);
  return deleteDepartmentResponse;
};
