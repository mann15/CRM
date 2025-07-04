import db from "../../config/dbConfig.js";
import { Op } from "sequelize";

// const UniEmpHasDesignation = db.universityEmployeeHasDesignation;

export const fetchUniEmployeeHasDesignationById = async (
  uniEmpDesignationData
) => {
  const { employeeId, designationId } = uniEmpDesignationData;
  const whereCondition = {};
  if (employeeId) {
    whereCondition.employeeId = employeeId;
  }
  if (designationId) {
    whereCondition.designationId = designationId;
  }
  const data = await db.universityEmployeeHasDesignation.findAll({
    where: whereCondition,
    order: [["updatedAt", "DESC"]],
  });

  return data;
};

export const fetchAllUniEmployeeHasDesignation = async () => {
  const data = await db.universityEmployeeHasDesignation.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addUniEmployeeHasDesignation = async (uniEmpDesignationData) => {
  const { employeeId, designationId, userId } = uniEmpDesignationData;

  const [newRecord, created] =
    await db.universityEmployeeHasDesignation.findOrCreate({
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
    return { message: "Record Already Exists" };
  }

  return newRecord;
};

export const addUniEmployeeHasDesignationBatch = async (
  uniEmpDesignationData,
  transaction
) => {
  const { employeeId, designationId, userId } = uniEmpDesignationData;

  const [newRecord, created] =
    await db.universityEmployeeHasDesignation.findOrCreate({
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
    return { message: "Record Already Exists" };
  }

  return newRecord;
};

export const updateUniEmployeeHasDesignation = async (
  uniEmpDesignationData
) => {
  const { employeeId, designationId, oldDesignationId, userId } =
    uniEmpDesignationData;
  const existingRecord = await db.universityEmployeeHasDesignation.findOne({
    where: {
      [Op.and]: [{ employeeId }, { designationId: oldDesignationId }],
    },
  });
  if (!existingRecord) {
    const error = {};
    error.error = "Record not found";
    return error;
  }
  const data = await db.universityEmployeeHasDesignation.update(
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

export const deleteUniEmployeeHasDesignation = async (
  uniEmpDesignationData
) => {
  const { employeeId, designationId, userId } = uniEmpDesignationData;
  const deleteUniEmpHasDesignationData =
    await db.universityEmployeeHasDesignation.update(
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

  const data = await db.universityEmployeeHasDesignation.destroy({
    where: {
      employeeId,
      designationId,
    },
  });
  return data;
};

//delete with only employee Id (batch)
export const deleteUniEmpHasDesignation = async (
  uniEmpDesignationData,
  transaction
) => {
  const { employeeId, designationId, userId } = uniEmpDesignationData;
  const deleteUniEmpHasDesignationData =
    await db.universityEmployeeHasDesignation.update(
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

  const data = await db.universityEmployeeHasDesignation.destroy({
    where: {
      employeeId,
      designationId,
    },
    transaction,
  });
  return data;
};
