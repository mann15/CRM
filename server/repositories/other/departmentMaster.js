import db from "../../config/dbConfig.js";

const Department = db.departmentMaster;

export const fetchDepartmentById = async (departmentId) => {
  const data = await Department.findAll({
    where: {
      departmentId: departmentId,
    },
    order: [["departmentName", "ASC"]],
  });
  return data;
};

export const fetchDepartmentByName = async (departmentName) => {
  const data = await Department.findAll({
    where: {
      departmentName: departmentName,
    },
    order: [["departmentName", "ASC"]],
  });
  return data;
};

export const fetchAllDepartment = async () => {
  const data = await Department.findAll({
    order: [["departmentName", "ASC"]],
  });
  return data;
};

export const addDepartment = async (departmentData) => {
  const { departmentName, userId } = departmentData;


  const [newRecord, created] = await Department.findOrCreate({
    where: { departmentName },
    paranoid: false,
    defaults: {
      departmentName,
      createdBy: userId,
    },
  });

  if (!created) {

    if (newRecord.deletedAt) {
      await newRecord.restore();
      await newRecord.update({
        createdBy: userId,
        updatedBy: null,
        deletedBy: null,
      });
      return newRecord;
    }

  }

  return newRecord;
};

export const updateDepartment = async ({
  departmentId,
  departmentName,
  userId,
}) => {
  const data = await Department.update(
    {
      departmentName: departmentName,
      updatedBy: userId,
    },
    {
      where: {
        departmentId: departmentId,
      },
    }
  );
  return data;
};

export const deleteDepartment = async (departmentData) => {
  const { departmentId, userId } = departmentData;
  const deleteDepartmentData = await Department.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        departmentId: departmentId,
      },
    }
  );
  const data = await Department.destroy({
    where: {
      departmentId: departmentId,
    },
  });
  return data;
};
