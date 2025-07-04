import {
  fetchIndNameById,
  fetchIndNameByName,
  addIndName,
  updateIndName,
  deleteIndName,
  fetchAllIndName,
} from "../../repositories/industry/indName.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchIndNameByIdService = async (indNameId) => {
  return await fetchIndNameById(indNameId);
};

export const fetchIndNameByNameService = async (indName) => {
  return await fetchIndNameByName(indName);
};

export const fetchAllIndNameService = async () => {
  return await fetchAllIndName();
};

export const addIndNameService = async (indNameData) => {
  const addIndNameResponse = await addIndName(indNameData);
  const { userId, userName, userType ,userEmployeeId } = indNameData;
  const actionType = "add";
  const tableName = "industry_name";
  if (addIndNameResponse.message) {
    return addIndNameResponse;
  }
  const recordId = addIndNameResponse.dataValues.industryNameId;
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
  return addIndNameResponse;
};

export const updateIndNameService = async (indNameData) => {
  const updateIndNameResponse = await updateIndName(indNameData);
  const { userId, userName, userType, industryNameId } = indNameData;
  const actionType = "update";
  const tableName = "industry_name";
  const recordId = industryNameId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
  };
  const logDataResponse = await addLog(logData);
  return updateIndNameResponse;
};

export const deleteIndNameService = async (indNameData) => {
  const deleteIndNameResponse = await deleteIndName(indNameData);
  const { userId, userName, userType, industryNameId } = indNameData;
  const actionType = "delete";
  const tableName = "industry_name";
  const recordId = industryNameId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
  };
  const logDataResponse = await addLog(logData);
  return deleteIndNameResponse;
};
