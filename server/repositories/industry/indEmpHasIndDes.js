import db from "../../config/dbConfig.js";
import { Op } from "sequelize";

export const fetchAllIndEmpHasIndDes = async () => {
  const data = await db.industryEmployeeHasIndustryDesignation.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchIndEmpHasIndDesById = async (indEmpHasIndDesData) => {
  const { employeeId, designationId } = indEmpHasIndDesData;
  const whereCondition = {};
  if (employeeId) {
    whereCondition.employeeId = employeeId;
  }
  if (designationId) {
    whereCondition.designationId = designationId;
  }
  const data = await db.industryEmployeeHasIndustryDesignation.findAll({
    where: whereCondition,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndEmpHasIndDes = async (indEmpHasIndDesData) => {
  const { employeeId, designationId, userId } = indEmpHasIndDesData;

  const [newRecord, created] =
    await db.industryEmployeeHasIndustryDesignation.findOrCreate({
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
    return { error: "Industry Employee Designation Already Exists" };
  }

  return newRecord;
};

export const addIndEmpHasIndDesBatch = async (
  indEmpHasIndDesData,
  transaction
) => {
  const { employeeId, designationId, userId } = indEmpHasIndDesData;

  const [newRecord, created] =
    await db.industryEmployeeHasIndustryDesignation.findOrCreate({
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
    return { error: "Industry Employee Designation Already Exists" };
  }

  return newRecord;
};

export const updateIndEmpHasIndDes = async (indEmpHasIndDesData) => {
  const { employeeId, designationId, oldDesignationId, userId } =
    indEmpHasIndDesData;

  const existingRecord =
    await db.industryEmployeeHasIndustryDesignation.findOne({
      where: {
        [Op.and]: [{ employeeId }, { designationId: oldDesignationId }],
      },
    });

  if (!existingRecord) {
    const error = {};
    error.error = "Record not found";
    return error;
  }
  const data = await db.industryEmployeeHasIndustryDesignation.update(
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

export const deleteIndEmpHasIndDes = async (indEmpHasIndDesData) => {
  const { employeeId, designationId, userId } = indEmpHasIndDesData;
  const existingRecord =
    await db.industryEmployeeHasIndustryDesignation.findOne({
      where: {
        [Op.and]: [{ employeeId }, { designationId }],
      },
    });

  if (!existingRecord) {
    const error = "Record not found";
    return error;
  }
  await existingRecord.update({
    deletedBy: userId,
  });

  await existingRecord.destroy();

  return existingRecord;
};

//delete api with transaction
export const deleteIndEmpHasDes = async (indEmpHasIndDesData, transaction) => {
  const { employeeId, designationId, userId } = indEmpHasIndDesData;
  const deleteIndEmpHasDesignationData =
    await db.industryEmployeeHasIndustryDesignation.update(
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

  const data = await db.industryEmployeeHasIndustryDesignation.destroy({
    where: {
      employeeId,
      designationId,
    },
    transaction,
  });
  return data;
};
