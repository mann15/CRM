import db from "../../config/dbConfig.js";

const User = db.user;

export const fetchUserById = async (userId) => {
  const data = await User.findAll({
    where: {
      userId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchUserByName = async (userName) => {
  const data = await User.findAll({
    where: {
      userName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllUser = async () => {
  const data = await User.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addUser = async (userData) => {
  const {
    userEmployeeId,
    userName,
    userType,
    userAccess,
    userStatus,
    userEmail,
    userPassword,
  } = userData;

  const data = await User.create({
    userEmployeeId,
    userName,
    userType,
    userAccess,
    userStatus,
    userEmail,
    userPassword,
  });
  return data;
};

export const updateUser = async (userData) => {
  const userId = userData?.userId;
  const userEmployeeId = userData?.userEmployeeId;
  const userName = userData?.userName;
  const userType = userData?.userType;
  const userAccess = userData?.userAccess;
  const userStatus = userData?.userStatus;
  const userEmail = userData?.userEmail;
  const userPassword = userData?.userPassword;

  const data = await User.update(
    {
      userEmployeeId,
      userName,
      userType,
      userAccess,
      userStatus,
      userEmail,
      userPassword,
    },
    {
      where: {
        userId,
      },
    }
  );

  return data;
};

export const deleteUser = async (userData) => {
  const { userId } = userData;
  const data = await User.destroy({
    where: {
      userId,
    },
  });
  return data;
};
