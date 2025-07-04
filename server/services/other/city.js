import {
  fetchCityById,
  fetchCityByName,
  addCity,
  updateCity,
  deleteCity,
  fetchAllCity,
} from "../../repositories/other/city.js";
import { addLog } from "../../repositories/other/logTable.js";

export const fetchCityByIdService = async (cityId) => {
  return await fetchCityById(cityId);
};

export const fetchCityByNameService = async (cityName) => {
  return await fetchCityByName(cityName);
};

export const fetchAllCityService = async () => {
  return await fetchAllCity();
};

export const addCityService = async (cityData) => {
  const addCityResponse = await addCity(cityData);
  const { userId, userName, userType, userEmployeeId } = cityData;
  const actionType = "add";
  const tableName = "city";
  if (addCityResponse.message) {
    return addCityResponse;
  }
  let recordId;
  if (Array.isArray(addCityResponse)) {
    return addCityResponse;
  }
   recordId = addCityResponse.dataValues.cityId;
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
  
  
  return addCityResponse;
};

export const updateCityService = async (cityData) => {
  const updateCityResponse = await updateCity(cityData);
  const { userId, userName, userType, userEmployeeId, cityId } = cityData;
  const actionType = "update";
  const tableName = "city";
  const recordId = cityId;
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
  return updateCityResponse;
};

export const deleteCityService = async (cityData) => {
  const deleteCityResponse = await deleteCity(cityData);
  const { userId, userName, userType, userEmployeeId, cityId } = cityData;
  const actionType = "delete";
  const tableName = "city";
  const recordId = cityId;
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
  return deleteCityResponse;
};
