import db from "../../config/dbConfig.js";
import { IndCmpBeforeDestroy } from "../../config/hooks.js";
import {
  fetchIndCmpById,
  fetchIndCmpByName,
  addIndCmp,
  updateIndCmp,
  deleteIndCmp,
  fetchAllIndCmp,
  fetchIndCmpByLimit,
  fetchIndData,
  updateIndCmpBatch,
} from "../../repositories/industry/indCmp.js";
import { updateIndCmpHeadQtBatch } from "../../repositories/industry/indCmpHeadQt.js";
import { updateIndCmpLocBatch } from "../../repositories/industry/indCmpLoc.js";
import { updateIndBatch } from "../../repositories/industry/indMaster.js";
import { addLog, addLogData } from "../../repositories/other/logTable.js";

export const fetchIndCmpByIdService = async (companyId) => {
  return await fetchIndCmpById(companyId);
};

export const fetchIndCmpByNameService = async (companyName) => {
  return await fetchIndCmpByName(companyName);
};

export const fetchIndDataService = async () => {
  return await fetchIndData();
};

export const fetchAllIndCmpService = async () => {
  return await fetchAllIndCmp();
};

export const fetchIndCmpByLimitService = async (cmpData) => {
  return await fetchIndCmpByLimit(cmpData);
};

export const addIndCmpService = async (cmpData) => {
  const addIndCmpResponse = await addIndCmp(cmpData);
  const { userId, userName, userType, userEmployeeId } = cmpData;
  const actionType = "add";
  const tableName = "industry_company";
  const recordId = addIndCmpResponse.dataValues.companyId;
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
  return addIndCmpResponse;
};

export const updateIndCmpService = async (cmpData) => {
  const updateIndCmpResponse = await updateIndCmp(cmpData);
  const { userId, userName, userType, companyId, userEmployeeId } = cmpData;
  const actionType = "update";
  const tableName = "industry_company";
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
  return updateIndCmpResponse;
};

export const updateIndCompanyService = async (cmpData) => {
  const transaction = await db.sequelize.transaction();

  try {
    const HeadquarterData = {
      cityId: cmpData.headQuarterCityId,
      stateId: cmpData.headQuarterStateId,
      countryId: cmpData.headQuarterCountryId,
      headQuarterId: cmpData.headQuarterId,
      companyId: cmpData.companyId,
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      userEmployeeId: cmpData.userEmployee,
    };

    const responseIndCmpData = await updateIndCmpBatch(cmpData, transaction);
    if (!responseIndCmpData || responseIndCmpData.error) {
      await transaction.rollback();
      return {
        success: false,
        message: "Error in updating company data",
        error: responseIndCmpData?.error || "Unknown error",
      };
    }

    const indCmpLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "update",
      tableName: "ind_company",
      recordId: cmpData.companyId,
      userEmployeeId: cmpData.userEmployee,
    };
    await addLogData(indCmpLogData, transaction);

    const responseLocationData = await updateIndCmpLocBatch(cmpData, {
      transaction,
    });
    if (!responseLocationData || responseLocationData.error) {
      await transaction.rollback();
      return {
        success: false,
        message: "Error in updating location data",
        error: responseLocationData?.error || "Unknown error",
      };
    }

    const locationLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "update",
      tableName: "industry_company_location",
      recordId: cmpData.locationId,
      userEmployeeId: cmpData.userEmployee,
    };
    await addLogData(locationLogData, transaction);

    const responseIndMasterData = await updateIndBatch(cmpData, transaction);
    if (!responseIndMasterData || responseIndMasterData.error) {
      await transaction.rollback();
      return {
        success: false,
        message: "Error in updating industry master data",
        error: responseIndMasterData?.error || "Unknown error",
      };
    }
    const indMasterLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "update",
      tableName: "industry_master",
      recordId: cmpData.industryId,
      userEmployeeId: cmpData.userEmployee,
    };
    await addLogData(indMasterLogData, transaction);

    const responseIndCmpHeadQuarterData = await updateIndCmpHeadQtBatch(
      HeadquarterData,
      transaction
    );
    if (!responseIndCmpHeadQuarterData || responseIndCmpHeadQuarterData.error) {
      await transaction.rollback();
      return {
        success: false,
        message: "Error in updating headquarters data",
        error: responseIndCmpHeadQuarterData?.error || "Unknown error",
      };
    }

    const headquarterLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "update",
      tableName: "industry_company_head_quarter",
      recordId: cmpData.headQuarterId,
      userEmployeeId: cmpData.userEmployee,
    };
    await addLogData(headquarterLogData, transaction);

    await transaction.commit();

    return {
      success: true,
      message: "Industry Company Updated Successfully",
      data: {
        company: responseIndCmpData,
        location: responseLocationData,
        industryMaster: responseIndMasterData,
        headquarter: responseIndCmpHeadQuarterData,
      },
    };
  } catch (error) {
    await transaction.rollback();

    return {
      success: false,
      message: "Transaction failed",
      error: error.message,
    };
  }
};

export const deleteIndCmpService = async (cmpData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId, userName, userType, companyId, userEmployeeId } = cmpData;
    await IndCmpBeforeDestroy(cmpData, transaction);

    const designationLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "delete",
      tableName: "industry_employee_has_industry_designation",
      recordId: cmpData.companyId,
      userEmployeeId: cmpData.userEmployeeId,
    };
    await addLogData(designationLogData, transaction);

    const employeeLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "delete",
      tableName: "industry_employee",
      recordId: cmpData.companyId,
      userEmployeeId: cmpData.userEmployeeId,
    };
    await addLogData(employeeLogData, transaction);

    const departmentLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "delete",
      tableName: "industry_company_has_industry_company_department",
      recordId: cmpData.companyId,
      userEmployeeId: cmpData.userEmployeeId,
    };
    await addLogData(departmentLogData, transaction);

    const companyLocationLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "delete",
      tableName: "industry_company_has_industry_company_location",
      recordId: cmpData.companyId,
      userEmployeeId: cmpData.userEmployeeId,
    };
    await addLogData(companyLocationLogData, transaction);

    const companyHeadQtLogData = {
      userId: cmpData.userId,
      userName: cmpData.userName,
      userType: cmpData.userType,
      actionType: "delete",
      tableName: "industry_company_head_quarter",
      recordId: cmpData.companyId,
      userEmployeeId: cmpData.userEmployeeId,
    };
    await addLogData(companyHeadQtLogData, transaction);

    const deleteIndCmpResponse = await deleteIndCmp(cmpData, transaction);
    const actionType = "delete";
    const tableName = "industry_company";
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
    const logDataResponse = await addLogData(logData, transaction);
    await transaction.commit();
    return deleteIndCmpResponse;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
