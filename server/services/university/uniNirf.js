import {
    fetchNirfById,
    fetchNirfByName,
    addNirf,
    updateNirf,
    deleteNirf,
    fetchAllNirf
} from "../../repositories/university/uniNirf.js";
import { addLog } from "../../repositories/other/logTable.js";

export const fetchNirfByIdService = async (nirfId) => {
    return await fetchNirfById(nirfId);
};

export const fetchNirfByNameService = async (nirfName) => {
    return await fetchNirfByName(nirfName);
};

export const fetchAllNirfService = async () => {
    return await fetchAllNirf();
};

export const addNirfService = async (nirfData) => {
    const addNirfResponse = await addNirf(nirfData);
    const { userId, userName, userType,userEmployeeId} = nirfData;
    const actionType = "add";
    const tableName = "university_nirf";
    if (addNirfResponse.message) {
        return addNirfResponse;
    }
    if (Array.isArray(addNirfResponse)) {
        return addNirfResponse;
    }
    const recordId = addNirfResponse.dataValues.nirfId;
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
    return addNirfResponse;
};

export const updateNirfService = async (nirfData) => {
    const updateNirfResponse = await updateNirf(nirfData);
    const { userId, userName, userType, nirfId,userEmployeeId } = nirfData;
    const actionType = "update";
    const tableName = "university_nirf";
    const recordId = nirfId;
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
    return updateNirfResponse;
};

export const deleteNirfService = async (nirfData) => {
    const deleteNirfResponse = await deleteNirf(nirfData);
    const { userId, userName, userType, nirfId,userEmployeeId } = nirfData;
    const actionType = "delete";
    const tableName = "university_nirf";
    const recordId = nirfId;
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
    return deleteNirfResponse;
};
