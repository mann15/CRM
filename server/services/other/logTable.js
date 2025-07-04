import {
  addLog,
} from "../../repositories/other/logTable.js";

export const addLogService = async (userData) => {
  return await addLog(userData);
};
