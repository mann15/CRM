import {
  fetchStateById,
  fetchStateByName,
  addState,
  updateState,
  deleteState,
  fetchAllState,
} from "../../repositories/other/state.js";
import { addLog } from "../../repositories/other/logTable.js";

export const fetchStateByIdService = async (stateId) => {
  return await fetchStateById(stateId);
};

export const fetchStateByNameService = async (stateName) => {
  return await fetchStateByName(stateName);
};

export const fetchAllStateService = async () => {
  return await fetchAllState();
};

export const addStateService = async (stateData) => {
  const addStateResponse = await addState(stateData);
  const { userId, userName, userType,userEmployeeId } = stateData;
  const actionType = "add";
  const tableName = "state";
  if (addStateResponse.message) {
    return addStateResponse;
  }
  if (Array.isArray(addStateResponse)) {
    return addStateResponse;
  }
  const recordId = addStateResponse.dataValues.stateId;
  const logData = {
    userId,
    userName,
    userType,
    actionType,
    userEmployeeId,
    tableName,
    recordId,
  };
  const logDataResponse = await addLog(logData);
  return addStateResponse;
};

export const updateStateService = async (stateData) => {
  const addStateResponse = await updateState(stateData);
  const { userId, userName, userType, stateId,userEmployeeId } = stateData;
  const actionType = "update";
  const tableName = "state";
  const recordId = stateId;
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
  return addStateResponse;
};

export const deleteStateService = async (stateData) => {
  const addStateResponse = await deleteState(stateData);
  const { userId, userName, userType, stateId,userEmployeeId } = stateData;
  const actionType = "delete";
  const tableName = "state";
  const recordId = stateId;
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
  return addStateResponse;
};
