import {
  fetchNaacById,
  fetchNaacByName,
  addNaac,
  updateNaac,
  deleteNaac,
  fetchAllNaac,
} from "../../repositories/university/uniNaac.js";
import { addLog } from "../../repositories/other/logTable.js";

export const fetchNaacByIdService = async (naacId) => {
  return await fetchNaacById(naacId);
};

export const fetchNaacByNameService = async (naacGrade) => {
  return await fetchNaacByName(naacGrade);
};

export const fetchAllNaacService = async () => {
  return await fetchAllNaac();
};

export const addNaacService = async (naacData) => {
  const addNaacResponse = await addNaac(naacData);
  const { userId, userName, userType,userEmployeeId } = naacData;
  const actionType = "add";
  const tableName = "university_naac";
  if (addNaacResponse.message) {
    return addNaacResponse;
  }
  if (Array.isArray(addNaacResponse)) {
    return addNaacResponse;
  }
  const recordId = addNaacResponse.dataValues.naacId;
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
  return addNaacResponse;
};

export const updateNaacService = async (naacData) => {
  const updateNaacResponse = await updateNaac(naacData);
    const { userId, userName, userType, naacId,userEmployeeId } = naacData;
  const actionType = "update";
  const tableName = "university_naac";
  const recordId = naacId;
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
  return updateNaacResponse;
};

export const deleteNaacService = async (naacData) => {
  const deleteNaacResponse = await deleteNaac(naacData);
  const { userId, userName, userType, naacId,userEmployeeId } = naacData;
  const actionType = "delete";
  const tableName = "university_naac";
  const recordId = naacId;
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
  return deleteNaacResponse;
};
