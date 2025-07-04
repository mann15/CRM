import {
  fetchCountryById,
  fetchCountryByName,
  addCountry,
  updateCountry,
  deleteCountry,
  fetchAllCountry,
} from "../../repositories/other/country.js";

import { addLog } from "../../repositories/other/logTable.js";

export const fetchCountryByIdService = async (countryId) => {
  return await fetchCountryById(countryId);
};

export const fetchCountryByNameService = async (countryName) => {
  return await fetchCountryByName(countryName);
};

export const fetchAllCountryService = async () => {
  return await fetchAllCountry();
};

export const addCountryService = async (countryData) => {
  const addCountryResponse = await addCountry(countryData);
  const { userId, userName, userType,userEmployeeId } = countryData;
  const actionType = "add";
  const tableName = "country";
  if (addCountryResponse.message) {
    return addCountryResponse;
  }
  if (Array.isArray(addCountryResponse)) {
    return addCountryResponse;
  }
  const recordId = addCountryResponse.dataValues.countryId;
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
  return addCountryResponse;
};

export const updateCountryService = async (countryData) => {
  const updateCountryResponse = await updateCountry(countryData);
  const { userId, userName, userType, countryId,userEmployeeId } = countryData;
  const actionType = "update";
  const tableName = "country";
  const recordId = countryId;
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
  return updateCountryResponse;
};

export const deleteCountryService = async (countryData) => {
  const deleteCountryResponse = await deleteCountry(countryData);
  const { userId, userName, userType, countryId,userEmployeeId } = countryData;
  const actionType = "delete";
  const tableName = "country";
  const recordId = countryId;
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
  return deleteCountryResponse;
};
