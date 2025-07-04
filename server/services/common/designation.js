import {
  fetchDesignationById,
  fetchDesignationByName,
  addDesignation,
  updateDesignation,
  deleteDesignation,
  fetchAllDesignation,
} from "../../repositories/common/designation.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchDesignationByIdService = async (designationData) => {
  return await fetchDesignationById(designationData);
};

export const fetchDesignationByNameService = async (designationData) => {
  return await fetchDesignationByName(designationData);
};

export const fetchAllDesignationService = async (designationData) => {
  return await fetchAllDesignation(designationData);
};

export const addDesignationService = async (designationData) => {
  const addDesignationResponse = await addDesignation(designationData);
  const { userId, userName, userType, designationType,userEmployeeId } = designationData;
  const actionType = "add";
  let tableName = "";
  if (designationType === "college") {
    tableName = "college_designation";
  } else if (designationType === "university") {
    tableName = "university_designation";
  } else if (designationType === "industry") {
    tableName = "industry_designation";
  }
  if (addDesignationResponse.message) {
    return addDesignationResponse;
  }
  if(Array.isArray(addDesignationResponse)){
    return addDesignationResponse;
  }
  const recordId = addDesignationResponse.dataValues.designationId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
    userEmployeeId
  };
  const logDataResponse = await addLog(logData);
  return addDesignationResponse;
};

export const updateDesignationService = async (designationData) => {
  const updateDesignationResponse = await updateDesignation(designationData);
  const { userId, userName, userType, designationId,userEmployeeId,designationType } = designationData;
  const actionType = "update";
  let tableName = "";
  if (designationType === "college") {
    tableName = "college_designation";
  } else if (designationType === "university") {
    tableName = "university_designation";
  } else if (designationType === "industry") {
    tableName = "industry_designation";
  }
  const recordId = designationId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
    userEmployeeId
  };
  const logDataResponse = await addLog(logData);
  return updateDesignationResponse;
};

export const deleteDesignationService = async (designationData) => {
  const deleteDesignationResponse = await deleteDesignation(designationData);
  const { userId, userName, userType, designationId,userEmployeeId,designationType } = designationData;
  const actionType = "delete";
  let tableName = "";
  if (designationType === "college") {
    tableName = "college_designation";
  } else if (designationType === "university") {
    tableName = "university_designation";
  } else if (designationType === "industry") {
    tableName = "industry_designation";
  }
  const recordId = designationId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
    userEmployeeId
  };
  const logDataResponse = await addLog(logData);
  return deleteDesignationResponse;
};
