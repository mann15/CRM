import db from "../../config/dbConfig.js";
import { Op } from "sequelize";

export const fetchClgHasDeptById = async (clgHasDeptData) => {
  const { collegeId, departmentId } = clgHasDeptData;
  const whereCondition = {};
  if (collegeId) {
    whereCondition.collegeId = collegeId;
  }
  if (departmentId) {
    whereCondition.departmentId = departmentId;
  }
  const data = await db.collegeHasDepartment.findAll({
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
    collegeDepartmentId: item.collegeDepartmentId,
    departmentId: item.departmentId,
    "Department Name": item["department_master.departmentName"],
  }));

  return formattedData;
};

export const fetchAllClgHasDept = async () => {
  const data = await db.collegeHasDepartment.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addClgHasDept = async (clgHasDeptData) => {
  const { collegeId, departmentId, userId } = clgHasDeptData;

  const [newRecord, created] = await db.collegeHasDepartment.findOrCreate({
    where: { collegeId, departmentId },
    paranoid: false,
    defaults: {
      collegeId,
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
    return { message: "College Department Already Exists" };
  }

  return newRecord;
};

export const updateClgHasDept = async (clgHasDeptData) => {
  const { collegeId, departmentId, oldDepartmentId, userId } = clgHasDeptData;
  const existingRecord = await db.collegeHasDepartment.findOne({
    where: {
      [Op.and]: [{ collegeId }, { departmentId: oldDepartmentId }],
    },
  });
  if (!existingRecord) {
    const error = {};
    error.error = "Record not found";
    return error;
  }
  const data = await db.collegeHasDepartment.update(
    {
      collegeId,
      departmentId,
      updatedBy: userId,
    },
    {
      where: {
        collegeId,
        departmentId: oldDepartmentId,
      },
    }
  );
  return data;
};

export const deleteClgHasDept = async (clgHasDeptData, transaction) => {
  const { collegeDepartmentId, collegeId, departmentId, userId } =
    clgHasDeptData;
  let deleteId = {};

  if (collegeDepartmentId) {
    deleteId.collegeDepartmentId = collegeDepartmentId;
  } else {
    deleteId.collegeId = collegeId;
    deleteId.departmentId = departmentId;
  }

  const deleteClgHasDeptData = await db.collegeHasDepartment.update(
    {
      deletedBy: userId,
    },
    {
      where: deleteId,
      transaction,
    }
  );

  const clgHasDept = await db.collegeHasDepartment.destroy({
    where: deleteId,
    transaction,
  });
  return clgHasDept;
};
