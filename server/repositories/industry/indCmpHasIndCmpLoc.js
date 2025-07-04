import db from "../../config/dbConfig.js";
import { Op } from "sequelize";

const indCmpHasIndCmpLoc = db.industryCompanyHasIndustryCompanyLocation;

export const fetchIndCmpHasIndCmpLoc = async (cmpData) => {
  const { companyId, locationId } = cmpData;

  const whereCondition = {};

  if (companyId) {
    whereCondition.companyId = companyId;
  }

  if (locationId) {
    whereCondition.locationId = locationId;
  }
  const data = await indCmpHasIndCmpLoc.findAll({
    where: whereCondition,
    order: [["updatedAt", "DESC"]],
  });

  return data;
};

export const fetchAllIndCmpHasIndCmpLoc = async () => {
  const data = await indCmpHasIndCmpLoc.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndCmpHasIndCmpLoc = async (cmpData) => {
  const { companyId, locationId, userId } = cmpData;

  const [newRecord, created] = await indCmpHasIndCmpLoc.findOrCreate({
    where: { companyId, locationId },
    paranoid: false,
    defaults: {
      companyId,
      locationId,
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
    return { message: "Industry Company Location Already Exists" };
  }

  return newRecord;
};

export const addIndCmpHasIndCmpLocBatch = async (cmpData, transaction) => {
  const { companyId, locationId, userId } = cmpData;

  const [newRecord, created] = await indCmpHasIndCmpLoc.findOrCreate({
    where: { companyId, locationId },
    paranoid: false,
    defaults: {
      companyId,
      locationId,
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
    return { message: "Industry Company Location Already Exists" };
  }

  return newRecord;
};

export const updateIndCmpHasIndCmpLoc = async (cmpData) => {
  const { companyId, locationId, oldLocationId, userId } = cmpData;
  const existingRecord = await indCmpHasIndCmpLoc.findOne({
    where: {
      [Op.and]: [{ companyId }, { locationId: oldLocationId }],
    },
  });
  if (!existingRecord) {
    const error = {};
    error.error = "Record not found";
    return error;
  }
  const data = await indCmpHasIndCmpLoc.update(
    {
      companyId,
      locationId,
      updatedBy: userId,
    },
    {
      where: {
        companyId: companyId,
        locationId: oldLocationId,
      },
    }
  );
  return data;
};

export const deleteIndCmpHasIndCmpLoc = async (cmpData) => {
  const { companyId, locationId, userId } = cmpData;
  const response = await indCmpHasIndCmpLoc.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        companyId: companyId,
      },
    }
  );
  const data = await indCmpHasIndCmpLoc.destroy({
    where: {
      companyId,
      locationId,
    },
  });
  return data;
};

//delete api with transaction
export const deleteIndCmpHasCmpLoc = async (cmpData, transaction) => {
  const { companyId, locationId, userId } = cmpData;
  const response = await indCmpHasIndCmpLoc.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        companyId: companyId,
      },
      transaction,
    }
  );
  const data = await indCmpHasIndCmpLoc.destroy({
    where: {
      companyId,
      locationId,
    },
    transaction,
  });
  return data;
};
