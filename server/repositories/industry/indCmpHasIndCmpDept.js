import db from "../../config/dbConfig.js";
import { Op } from "sequelize";

export const fetchIndCmpHasIndCmpDeptById = async (indCmpHasIndCmpDeptData) => {
  const { companyId, departmentId } = indCmpHasIndCmpDeptData;
  const whereCondition = {};
  if (companyId) {
    whereCondition.companyId = companyId;
  }
  if (departmentId) {
    whereCondition.departmentId = departmentId;
  }
  const data = await db.industryCompanyHasIndustryDepartment.findAll({
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
    companyDepartmentId: item.companyDepartmentId,
    "Department Name": item["department_master.departmentName"],
  }));

  return formattedData;
};

export const fetchAllIndCmpHasIndCmpDept = async () => {
  const data = await db.industryCompanyHasIndustryDepartment.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndCmpHasIndCmpDept = async (indCmpHasIndCmpDeptData) => {
  const { companyId, departmentId, userId } = indCmpHasIndCmpDeptData;

  const [newRecord, created] =
    await db.industryCompanyHasIndustryDepartment.findOrCreate({
      where: { companyId, departmentId },
      paranoid: false,
      defaults: {
        companyId,
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
    return { message: "Industry Company Department Already Exists" };
  }

  return newRecord;
};

export const updateIndCmpHasIndCmpDept = async (indCmpHasIndCmpDeptData) => {
  const { companyId, departmentId, oldDepartmentId, userId } =
    indCmpHasIndCmpDeptData;
  const existingRecord = await db.industryCompanyHasIndustryDepartment.findOne({
    where: {
      [Op.and]: [{ companyId }, { departmentId: oldDepartmentId }],
    },
  });
  if (!existingRecord) {
    const error = {};
    error.error = "Record not found";
    return error;
  }
  const data = await db.industryCompanyHasIndustryDepartment.update(
    {
      companyId,
      departmentId,
      updatedBy: userId,
    },
    {
      where: {
        companyId,
        departmentId: oldDepartmentId,
      },
    }
  );
  return data;
};

export const deleteIndCmpHasIndCmpDept = async (
  indCmpHasIndCmpDeptData,
  transaction
) => {
  const { companyDepartmentId, companyId, departmentId, userId } =
    indCmpHasIndCmpDeptData;
  let deleteId = {};
  if (companyDepartmentId) {
    deleteId.companyDepartmentId = companyDepartmentId;
  } else {
    deleteId.departmentId = departmentId;
    deleteId.companyId = companyId;
  }
  const deleteIndCmpHasIndCmpDeptData =
    await db.industryCompanyHasIndustryDepartment.update(
      {
        deletedBy: userId,
      },
      {
        where: deleteId,
        transaction,
      }
    );
  const record = await db.industryCompanyHasIndustryDepartment.destroy({
    where: deleteId,
    transaction,
  });
  return record;
};
