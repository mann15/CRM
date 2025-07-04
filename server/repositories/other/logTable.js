import db from "../../config/dbConfig.js";

const Log = db.log;

export const addLog = async (logData) => {
  const {
    userId,
    userEmployeeId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
  } = logData;
  const data = await Log.create({
    userId,
    userEmployeeId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
  });
  return data;
};

export const addLogData = async (logData, transaction) => {
  const {
    userId,
    userEmployeeId,
    userName,
    userType,
    actionType,
    tableName,
    recordId,
  } = logData;
  const data = await Log.create(
    {
      userId,
      userEmployeeId,
      userName,
      userType,
      actionType,
      tableName,
      recordId,
    },
    { transaction }
  );
  return data;
};
