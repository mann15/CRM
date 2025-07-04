import {
    fetchAllIndEmpHasIndDes,
    fetchIndEmpHasIndDesById,
    addIndEmpHasIndDes,
    updateIndEmpHasIndDes,
    deleteIndEmpHasIndDes,
} from '../../repositories/industry/indEmpHasIndDes.js';
import { addLog } from '../../repositories/other/logTable.js';

export const fetchEmpDesByIdService = async (empDesData) => {
    return await fetchIndEmpHasIndDesById(empDesData);
}

export const fetchAllEmpDesService = async () => {
    return await fetchAllIndEmpHasIndDes();
}

export const addEmpDesService = async (empDesData) => {
    const addEmpDesResponse = await addIndEmpHasIndDes(empDesData);
    const { userId, userName, userType,userEmployeeId } = empDesData;
    const actionType = 'add';
    const tableName = 'industry_employee_has_industry_designation';
    if(addEmpDesResponse.message){
        return addEmpDesResponse;
    }
    if(Array.isArray(addEmpDesResponse)){
        return addEmpDesResponse;
    }
    const recordId = addEmpDesResponse.dataValues?.employeeId;
    const logData = {
        userId,
        userName,
        userType,
        actionType,
        tableName,
        recordId,
        userEmployeeId
    };
    if(recordId){
    const logDataResponse = await addLog(logData);
    }
    return addEmpDesResponse;
}

export const updateEmpDesService = async (empDesData) => {
    const updateEmpDesResponse = await updateIndEmpHasIndDes(empDesData);
    const { userId, userName, userType, employeeId ,userEmployeeId } = empDesData;
    const actionType = 'update';
    const tableName = "industry_employee_has_industry_designation";
    if (updateEmpDesResponse.error) {
        return updateEmpDesResponse;
    }
    const recordId = employeeId;
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
    return updateEmpDesResponse;
}

export const deleteEmpDesService = async (empDesData) => {
    const deleteEmpDesResponse = await deleteIndEmpHasIndDes(empDesData);
    const { userId, userName, userType, employeeId ,userEmployeeId } = empDesData;
    const actionType = 'delete';
    const tableName = "industry_employee_has_industry_designation";
    const recordId = employeeId;
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
    return deleteEmpDesResponse;
}

