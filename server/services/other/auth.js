import {
  fetchUserByNameService,
  updateUserService,
} from "../../services/other/user.js";
import bcrypt from "bcrypt";

export const loginService = async ({ userName, userPassword }) => {
  const user = await fetchUserByNameService(userName);
  if (!user[0]?.dataValues) {
    return null;
  }
  
  const isMatch = await bcrypt.compare(userPassword, user[0].dataValues.userPassword);
  if (!isMatch) {
    return null;
  }
  return user[0].dataValues;
};

export const changePasswordService = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(userData.userPassword, salt);
  userData.userPassword = hashedPwd;
  const responseUserData = await updateUserService(userData);
  return responseUserData;
};
