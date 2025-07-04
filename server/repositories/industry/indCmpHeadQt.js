import db from "../../config/dbConfig.js";

export const fetchIndCmpHeadQt = async (indCmpId) => {
  const data = await db.industryCompanyHeadQuarter.findAll({
    where: {
      companyId: indCmpId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndCmpHeadQt = async (indCmpHeadQtData) => {
  const { companyId, cityId, stateId, countryId, village, town, userId } =
    indCmpHeadQtData;

  const data = await db.industryCompanyHeadQuarter.create({
    companyId,
    cityId,
    stateId,
    countryId,
    village,
    town,
    createdBy: userId,
  });
  return data;
};

export const addIndCmpHeadQtBatch = async (indCmpHeadQtData, transaction) => {
  const { companyId, cityId, stateId, countryId, village, town, userId } =
    indCmpHeadQtData;

  const data = await db.industryCompanyHeadQuarter.create(
    {
      companyId,
      cityId,
      stateId,
      countryId,
      village,
      town,
      createdBy: userId,
    },
    { transaction }
  );
  return data;
};

export const updateIndCmpHeadQt = async (indCmpHeadQtData) => {
  const {
    headQuarterId,
    companyId,
    cityId,
    stateId,
    countryId,
    village,
    town,
    userId,
  } = indCmpHeadQtData;

  const data = await db.industryCompanyHeadQuarter.update(
    {
      companyId,
      cityId,
      stateId,
      countryId,
      village,
      town,
      updatedBy: userId,
    },
    {
      where: {
        headQuarterId: headQuarterId,
      },
    }
  );
  return data;
};

export const updateIndCmpHeadQtBatch = async (
  indCmpHeadQtData,
  transaction
) => {
  const {
    headQuarterId,
    companyId,
    cityId,
    stateId,
    countryId,
    village,
    town,
    userId,
  } = indCmpHeadQtData;

  const data = await db.industryCompanyHeadQuarter.update(
    {
      companyId,
      cityId,
      stateId,
      countryId,
      village,
      town,
      updatedBy: userId,
    },
    {
      where: {
        headQuarterId: headQuarterId,
      },
      transaction,
    }
  );
  return data;
};

export const deleteIndCmpHeadQt = async (indCmpHeadQtData) => {
  const { headQuarterId, userId } = indCmpHeadQtData;
  const deleteIndCmpHeadQtResponse = await db.industryCompanyHeadQuarter.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        headQuarterId,
      },
    }
  );
  const data = await db.industryCompanyHeadQuarter.destroy({
    where: {
      headQuarterId,
    },
  });
  return data;
};

//delete api with transaction
export const deleteCmpHeadQt = async (indCmpHeadQtData, transaction) => {
  const { headQuarterId, userId } = indCmpHeadQtData;
  const deleteIndCmpHeadQtResponse = await db.industryCompanyHeadQuarter.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        headQuarterId,
      },
      transaction,
    }
  );
  const data = await db.industryCompanyHeadQuarter.destroy({
    where: {
      headQuarterId,
    },
    transaction,
  });
  return data;
};
