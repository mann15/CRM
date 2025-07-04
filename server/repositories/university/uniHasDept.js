import db from "../../config/dbConfig.js";
import { Op } from "sequelize";

// const UniHasDept = db.universityHasDepartment;

export const fetchUniHasDeptById = async (uniHasDeptData) => {
  const { universityId, departmentId } = uniHasDeptData;
  const whereCondition = {};
  if (universityId) {
    whereCondition.universityId = universityId;
  }
  if (departmentId) {
    whereCondition.departmentId = departmentId;
  }
  const data = await db.universityHasDepartment.findAll({
    where: whereCondition,
    include: [
      {
        model: db.departmentMaster,
        attributes: [["departmentName", "departmentName"]],
      },
    ],
    order: [["updatedAt", "DESC"]],
    raw: true,
    nest: false,
  });
  const formattedData = data.map((item) => ({
    departmentId: item.departmentId,
    universityDepartmentId: item.universityDepartmentId,
    "Department Name": item["department_master.departmentName"],
  }));

  return formattedData;
};

export const fetchAllUniHasDept = async () => {
  const data = await db.universityHasDepartment.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addUniHasDept = async (uniHasDeptData) => {
  const { universityId, departmentId, userId } = uniHasDeptData;

  const [newRecord, created] = await db.universityHasDepartment.findOrCreate({
    where: { universityId, departmentId },
    paranoid: false,
    defaults: {
      universityId,
      departmentId,
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
    return { message: "Record Already Exists" };
  }
  return newRecord;
};

export const updateUniHasDept = async (uniHasDeptData) => {
  const { universityId, departmentId, oldDepartmentId, userId } =
    uniHasDeptData;
  const existingRecord = await db.universityHasDepartment.findOne({
    where: {
      [Op.and]: [{ universityId }, { departmentId: oldDepartmentId }],
    },
  });
  if (!existingRecord) {
    const error = {};
    error.error = "Record not found";
    return error;
  }
  const data = await db.universityHasDepartment.update(
    {
      universityId,
      departmentId,
      updatedBy: userId,
    },
    {
      where: {
        universityId,
        departmentId: oldDepartmentId,
      },
    }
  );
  return data;
};

export const deleteUniHasDept = async (uniHasDeptData, transaction) => {
  const { universityDepartmentId, universityId, departmentId, userId } =
    uniHasDeptData;
  let deleteId = {};

  if (universityDepartmentId) {
    deleteId.universityDepartmentId = universityDepartmentId;
  } else {
    deleteId.departmentId = departmentId;
    deleteId.universityId = universityId;
  }
  const deleteUniHasDeptData = await db.universityHasDepartment.update(
    {
      deletedBy: userId,
    },
    {
      where: deleteId,
    },
    transaction
  );
  const uniHasDept = await db.universityHasDepartment.destroy({
    where: deleteId,
    transaction,
  });
  return uniHasDept;
};
