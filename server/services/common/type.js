import {
  fetchTypeById,
  fetchTypeByName,
  addType,
  updateType,
  deleteType,
  fetchAllType,
} from "../../repositories/common/type.js";
import { addLog } from "../../repositories/other/logTable.js";

export const fetchTypeByIdService = async (typeData) => {
  return await fetchTypeById(typeData);
};

export const fetchTypeByNameService = async (typeData) => {
  return await fetchTypeByName(typeData);
};

export const fetchAllTypeService = async (typeData) => {
  return await fetchAllType(typeData);
};

export const addTypeService = async (typeData) => {
  const addTypeResponse = await addType(typeData);
  const { userId, userName, userType, typesType ,userEmployeeId } = typeData;
  const actionType = "add";
  let tableName = "";
  if (typesType === "college") {
    tableName = "college_Role";
  } else if (typesType === "university") {
    tableName = "university_Role";
  } else if (typesType === "industry") {
    tableName = "industry_Role";
  }
  if(addTypeResponse.message){
    return addTypeResponse;
  }
  if(Array.isArray(addTypeResponse)){
    return addTypeResponse;
  }
  const recordId = addTypeResponse.dataValues.typeId;
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
  return addTypeResponse;
};

export const updateTypeService = async (typeData) => {
  const updateTypeResponse = await updateType(typeData);
  const { userId, userName, userType, typeId, typesType,userEmployeeId } = typeData;
  const actionType = "update";
  let tableName = "";
  if (typesType === "college") {
    tableName = "college_Role";
  } else if (typesType === "university") {
    tableName = "university_Role";
  } else if (typesType === "industry") {
    tableName = "industry_Role";
  }
  const recordId = typeId;
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
  return updateTypeResponse;
};

export const deleteTypeService = async (typeData) => {
  const deleteTypeResponse = await deleteType(typeData);
  const { userId, userName, userType, typeId, typesType,userEmployeeId } = typeData;
  const actionType = "delete";
  let tableName = "";
  if (typesType === "college") {
    tableName = "college_Role";
  } else if (typesType === "university") {
    tableName = "university_Role";
  } else if (typesType === "industry") {
    tableName = "industry_Role";
  }
  const recordId = typeId;
  const logData = {
    userId,
    userName,
    userEmployeeId,
    userType,
    actionType,
    tableName,
    recordId,
  };
  const logDataResponse = await addLog(logData);
  return deleteTypeResponse;
};
