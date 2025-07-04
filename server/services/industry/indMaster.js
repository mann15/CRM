import db from "../../config/dbConfig.js";
import { IndBeforeDestroy } from "../../config/hooks.js";
import {
  addIndCmp,
  addIndCmpBatch,
} from "../../repositories/industry/indCmp.js";
import {
  addIndCmpHasIndCmpLoc,
  addIndCmpHasIndCmpLocBatch,
} from "../../repositories/industry/indCmpHasIndCmpLoc.js";
import {
  addIndCmpHeadQt,
  addIndCmpHeadQtBatch,
} from "../../repositories/industry/indCmpHeadQt.js";
import {
  addIndCmpLoc,
  addIndCmpLocBatch,
} from "../../repositories/industry/indCmpLoc.js";
import {
  fetchIndById,
  fetchIndByName,
  addInd,
  updateInd,
  deleteInd,
  fetchAllInd,
  fetchIndByLimit,
  addIndBatch,
} from "../../repositories/industry/indMaster.js";
import {
  addIndName,
  addIndNameBatch,
} from "../../repositories/industry/indName.js";
import { addLog, addLogData } from "../../repositories/other/logTable.js";

export const fetchIndByIdService = async (indId) => {
  return await fetchIndById(indId);
};

export const fetchIndByNameService = async (indNameId) => {
  return await fetchIndByName(indNameId);
};

export const fetchAllIndService = async () => {
  return await fetchAllInd();
};

export const fetchIndByLimitService = async (indData) => {
  return await fetchIndByLimit(indData);
};

export const addIndCmpService = async (indData) => {
  const transaction = await db.sequelize.transaction();

  try {
    // Add industry name and log
    // const nameResponse = await addIndNameBatch(indData,  transaction );

    // Add industry and log
    const addIndResponse = await addIndBatch(indData, transaction);
    if (!addIndResponse?.dataValues?.industryId) {
      await transaction.rollback();
      return { message: "error in adding industry" };
    }
    indData.industryId = addIndResponse?.dataValues?.industryId;
    const { userId, userName, userType, userEmployeeId } = indData;

    const industryLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "industry",
      recordId: addIndResponse?.dataValues?.industryId,
      userEmployeeId,
    };

    await addLogData(industryLogData, transaction);

    // Add location and log
    const locationResponse = await addIndCmpLocBatch(indData, transaction);
    indData.locationId = locationResponse?.dataValues?.locationId;

    const locationLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "ind_company_location",
      recordId: locationResponse?.dataValues?.locationId,
      userEmployeeId,
    };
    await addLogData(locationLogData, transaction);

    const companyResponse = await addIndCmpBatch(indData, transaction);
    indData.companyId = companyResponse?.dataValues?.companyId;

    const companyLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "ind_company",
      recordId: companyResponse?.dataValues?.companyId,
      userEmployeeId,
    };
    await addLogData(companyLogData, transaction);

    // Add company-location relationship and log
    const cmpHasLocResponse = await addIndCmpHasIndCmpLocBatch(
      indData,
      transaction
    );

    const cmpHasLocLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "ind_company_has_ind_company_location",
      recordId: cmpHasLocResponse?.dataValues?.companyId,
      userEmployeeId,
    };
    await addLogData(cmpHasLocLogData, transaction);

    // Add headquarters and log
    const headQtData = {
      companyId: indData.companyId,
      cityId: indData.headQuarterCityId,
      stateId: indData.headQuarterStateId,
      countryId: indData.headQuarterCountryId,
      village: indData.village,
      town: indData.town,
    };

    const headResponse = await addIndCmpHeadQtBatch(headQtData, transaction);

    const headQtLogData = {
      userId,
      userName,
      userType,
      actionType: "add",
      tableName: "ind_company_headquarters",
      recordId: headResponse?.dataValues?.companyId,
      userEmployeeId,
    };
    await addLogData(headQtLogData, transaction);

    await transaction.commit();

    return addIndResponse;
  } catch (error) {
    await transaction.rollback();
    return {
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const addIndService = async (indData) => {
  const addIndResponse = await addInd(indData);
  const { userId, userName, userType, userEmployeeId } = indData;
  const actionType = "add";
  const tableName = "industry_master";
  const recordId = addIndResponse.dataValues.industryId;
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
  return addIndResponse;
};

export const updateIndService = async (indData) => {
  const updateIndResponse = await updateInd(indData);
  const { userId, userName, userType, industryId, userEmployeeId } = indData;
  const actionType = "update";
  const tableName = "industry_master";
  const recordId = industryId;
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
  return updateIndResponse;
};

export const deleteIndService = async (indData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId, userName, userType, userEmployeeId, industryId } = indData;
    await IndBeforeDestroy(indData, transaction);

    const designationLogData = {
      userId: indData.userId,
      userName: indData.userName,
      userType: indData.userType,
      actionType: "delete",
      tableName: "industry_employee_has_industry_designation",
      recordId: indData.industryId,
      userEmployeeId: indData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const employeeLogData = {
      userId: indData.userId,
      userName: indData.userName,
      userType: indData.userType,
      actionType: "delete",
      tableName: "industry_employee",
      recordId: indData.industryId,
      userEmployeeId: indData.userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    const departmentLogData = {
      userId: indData.userId,
      userName: indData.userName,
      userType: indData.userType,
      actionType: "delete",
      tableName: "industry_company_has_industry_company_department",
      recordId: indData.industryId,
      userEmployeeId: indData.userEmployeeId,
    };
    await addLogData(departmentLogData, transaction);

    const companyLocationLogData = {
      userId: indData.userId,
      userName: indData.userName,
      userType: indData.userType,
      actionType: "delete",
      tableName: "industry_company_has_industry_company_location",
      recordId: indData.industryId,
      userEmployeeId: indData.userEmployeeId,
    };
    await addLogData(companyLocationLogData, transaction);

    const companyHeadQtLogData = {
      userId: indData.userId,
      userName: indData.userName,
      userType: indData.userType,
      actionType: "delete",
      tableName: "industry_company_head_quarter",
      recordId: indData.industryId,
      userEmployeeId: indData.userEmployeeId,
    };
    await addLogData(companyHeadQtLogData, transaction);

    const companyLogData = {
      userId: indData.userId,
      userName: indData.userName,
      userType: indData.userType,
      actionType: "delete",
      tableName: "industry_company",
      recordId: indData.industryId,
      userEmployeeId: indData.userEmployeeId,
    };
    await addLogData(companyLogData, transaction);

    const deleteIndResposne = await deleteInd(indData);
    const actionType = "delete";
    const tableName = "industry_master";
    const recordId = industryId;
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
    await transaction.commit();
    return deleteIndResposne;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
