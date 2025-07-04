import db from "../../config/dbConfig.js";
import { Op } from "sequelize";

// const ClgEmpHasDesignation = db.collegeEmployeeHasDesignation;

export const fetchClgEmployeeHasDesignationById = async (
  clgEmpDesignationData
) => {
  const { employeeId, designationId } = clgEmpDesignationData;
  const whereCondition = {};
  if (employeeId) {
    whereCondition.employeeId = employeeId;
  }
  if (designationId) {
    whereCondition.designationId = designationId;
  }
  const data = await db.collegeEmployeeHasDesignation.findAll({
    where: whereCondition,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllClgEmployeeHasDesignation = async () => {
  const data = await db.collegeEmployeeHasDesignation.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addClgEmployeeHasDesignation = async (clgEmpDesignationData) => {
  const { employeeId, designationId, userId } = clgEmpDesignationData;

  const [newRecord, created] =
    await db.collegeEmployeeHasDesignation.findOrCreate({
      where: { employeeId, designationId },
      paranoid: false,
      defaults: {
        employeeId,
        designationId,
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
    const error = "Record already exists";
    return error;
  }

  return newRecord;
};

export const addClgEmployeeHasDesignationBatch = async (
  clgEmpDesignationData,
  transaction
) => {
  const { employeeId, designationId, userId } = clgEmpDesignationData;

  const [newRecord, created] =
    await db.collegeEmployeeHasDesignation.findOrCreate({
      where: { employeeId, designationId },
      paranoid: false,
      defaults: {
        employeeId,
        designationId,
        createdBy: userId,
      },
      transaction,
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
    const error = "Record already exists";
    return error;
  }

  return newRecord;
};

export const updateClgEmployeeHasDesignation = async (
  clgEmpDesignationData
) => {
  const { employeeId, designationId, oldDesignationId, userId } =
    clgEmpDesignationData;

  const existingRecord = await db.collegeEmployeeHasDesignation.findOne({
    where: {
      [Op.and]: [{ employeeId }, { designationId: oldDesignationId }],
    },
  });
  if (!existingRecord) {
    const error = {};
    error.error = "Record not found";
    return error;
  }
  const data = await db.collegeEmployeeHasDesignation.update(
    {
      employeeId,
      designationId,
      updatedBy: userId,
    },
    {
      where: {
        employeeId,
        designationId: oldDesignationId,
      },
    }
  );
  return data;
};

export const deleteClgEmployeeHasDesignation = async (
  clgEmpDesignationData
) => {
  const { employeeId, designationId, userId } = clgEmpDesignationData;
  const deleteClgEmpHasDesignationData =
    await db.collegeEmployeeHasDesignation.update(
      {
        deletedBy: userId,
      },
      {
        where: {
          employeeId,
          designationId,
        },
      }
    );

  const data = await db.collegeEmployeeHasDesignation.destroy({
    where: {
      employeeId,
      designationId,
    },
  });
  return data;
};

//delete api with transaction
export const deleteClgEmpHasDesignation = async (
  clgEmpDesignationData,
  transaction
) => {
  const { employeeId, designationId, userId } = clgEmpDesignationData;
  const deleteClgEmpHasDesignationData =
    await db.collegeEmployeeHasDesignation.update(
      {
        deletedBy: userId,
      },
      {
        where: {
          employeeId,
          designationId,
        },
        transaction,
      }
    );

  const data = await db.collegeEmployeeHasDesignation.destroy({
    where: {
      employeeId,
      designationId,
    },
    transaction,
  });
  return data;
};
