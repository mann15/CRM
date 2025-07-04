import {
  addIndCmpHasIndCmpLoc,
  fetchAllIndCmpHasIndCmpLoc,
  fetchIndCmpHasIndCmpLoc,
  updateIndCmpHasIndCmpLoc,
  deleteIndCmpHasIndCmpLoc,
} from "../../repositories/industry/indCmpHasIndCmpLoc.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchIndCmpHasIndCmpLocService = async (cmpData) => {
  return await fetchIndCmpHasIndCmpLoc(cmpData);
};

export const fetchAllIndCmpHasIndCmpLocService = async () => {
  return await fetchAllIndCmpHasIndCmpLoc();
};

export const addIndCmpHasIndCmpLocService = async (cmpData) => {
  const responseIndCmpHasIndCmpLocData = await addIndCmpHasIndCmpLoc(cmpData);
  const { userId, userName, userType, userEmployeeId } = cmpData;
  const actionType = "add";
  const tableName = "industry_company_has_industry_company_location";
if (responseIndCmpHasIndCmpLocData.message) {
    return responseIndCmpHasIndCmpLocData;
  }
  if (Array.isArray(responseIndCmpHasIndCmpLocData)) {
    return responseIndCmpHasIndCmpLocData;
  }
  

  const recordId = responseIndCmpHasIndCmpLocData.dataValues?.companyId;

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
  return responseIndCmpHasIndCmpLocData;
};

export const updateIndCmpHasIndCmpLocService = async (cmpData) => {
  const responseIndCmpHasIndCmpLocData = await updateIndCmpHasIndCmpLoc(
    cmpData
  );
  const { userId, userName, userType, companyId, userEmployeeId } = cmpData;
  const actionType = "update";
  const tableName = "industry_company_has_industry_company_location";
  if (responseIndCmpHasIndCmpLocData.error) {
    return responseIndCmpHasIndCmpLocData;
  }
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
  return responseIndCmpHasIndCmpLocData;
};

export const deleteIndCmpHasIndCmpLocService = async (cmpData) => {
  const responseIndCmpHasIndCmpLocData = await deleteIndCmpHasIndCmpLoc(
    cmpData
  );
  const { userId, userName, userType, companyId, userEmployeeId } = cmpData;
  const actionType = "delete";
  const tableName = "industry_company_has_industry_company_location";
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
  return responseIndCmpHasIndCmpLocData;
};
