import {
  addIndCmpHeadQt,
  updateIndCmpHeadQt,
  deleteIndCmpHeadQt,
  fetchIndCmpHeadQt,
} from "../../repositories/industry/indCmpHeadQt.js";
import { addLog } from "../../repositories/other/logTable.js";

export const fetchIndCmpHeadQtService = async (indCmpId) => {
  return await fetchIndCmpHeadQt(indCmpId);
};

export const addIndCmpHeadQtService = async (indCmpHeadQtData) => {
  const addIndCmpHeadQtResponse = await addIndCmpHeadQt(indCmpHeadQtData);
  const { userId, userName, userType ,userEmployeeId} = indCmpHeadQtData;
  const actionType = "add";
  const tableName = "industry_company_head_quarter";
  const recordId = addIndCmpHeadQtResponse.dataValues.headQuarterId;
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
  return addIndCmpHeadQtResponse;
};

export const updateIndCmpHeadQtService = async (indCmpHeadQtData) => {
  const updateIndCmpHeadQtResponse = await updateIndCmpHeadQt(indCmpHeadQtData);
  const { userId, userName, userType, headQuarterId,userEmployeeId } = indCmpHeadQtData;
  const actionType = "update";
  const tableName = "industry_company_head_quarter";
  const recordId = headQuarterId;
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
  return updateIndCmpHeadQtResponse;
};

export const deleteIndCmpHeadQtService = async (indCmpHeadQtData) => {
  const deleteIndCmpHeadQtResponse = await deleteIndCmpHeadQt(indCmpHeadQtData);
  const { userId, userName, userType, headQuarterId,userEmployeeId } = indCmpHeadQtData;
  const actionType = "delete";
  const tableName = "industry_company_head_quarter";
  const recordId = headQuarterId;
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
  return deleteIndCmpHeadQtResponse;
};
