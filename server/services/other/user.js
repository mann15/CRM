import {
  fetchUserById,
  fetchUserByName,
  fetchAllUser,
  addUser,
  updateUser,
  deleteUser,
} from "../../repositories/other/user.js";
import { addLog } from "../../repositories/other/logTable.js";
import bcrypt from "bcrypt";

export const fetchUserByIdService = async (userId) => {
  return await fetchUserById(userId);
};

export const fetchUserByNameService = async (userName) => {
  return await fetchUserByName(userName);
};

export const fetchAllUserService = async () => {
  return await fetchAllUser();
};

export const addUserService = async (userData) => {
  const pwd = userData.userPassword;
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(pwd, salt);
  userData.userPassword = hashedPwd;
  const addUserResponse = await addUser(userData);
  return addUserResponse;
};

export const updateUserService = async (userData) => {
  const updateUserServiceResponse = await updateUser(userData);
  return updateUserServiceResponse;
};

export const deleteUserService = async (userData) => {
  const deleteUserServiceResponse = await deleteUser(userData);
  return deleteUserServiceResponse;
};
