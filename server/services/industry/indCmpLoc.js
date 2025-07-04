import {
  fetchAllIndCmpLoc,
  addIndCmpLoc,
  updateIndCmpLoc,
  deleteIndCmpLoc,
} from "../../repositories/industry/indCmpLoc.js";
import { addLog } from "../../repositories/other/logTable.js";

export const fetchAllIndCmpLocService = async (loactionId) => {
  return await fetchAllIndCmpLoc(loactionId);
};

export const addIndCmpLocService = async (indCmpLocData) => {
  const addIndCmpLocResponse = await addIndCmpLoc(indCmpLocData);
  const { userId, userName, userType,userEmployeeId } = indCmpLocData;
  const actionType = "add";
  const tableName = "industry_company_location";
  const recordId = addIndCmpLocResponse.dataValues.locationId;
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
  return addIndCmpLocResponse;
};

export const updateIndCmpLocService = async (indCmpLocData) => {
  const updateIndCmpLocResponse = await updateIndCmpLoc(indCmpLocData);
  const { userId, userName, userType, locationId,userEmployeeId } = indCmpLocData;
  const actionType = "update";
  const tableName = "industry_company_location";
  const recordId = locationId;
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
  return updateIndCmpLocResponse;
};

export const deleteIndCmpLocService = async (indCmpLocData) => {
  const deleteIndCmpLocResponse = await deleteIndCmpLoc(indCmpLocData);
  const { userId, userName, userType, locationId,userEmployeeId } = indCmpLocData;
  const actionType = "delete";
  const tableName = "industry_company_location";
  const recordId = locationId;
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
  return deleteIndCmpLocResponse;
};
