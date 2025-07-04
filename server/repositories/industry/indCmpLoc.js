import db from "../../config/dbConfig.js";

const IndustryCompanyLocation = db.industryCompanyLocation;

export const fetchAllIndCmpLoc = async (locId) => {
  const data = await IndustryCompanyLocation.findAll({
    where: {
      locationId: locId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndCmpLoc = async (indCmpLocData) => {
  const { stateId, cityId, countryId, village, town, userId } = indCmpLocData;

  const data = await IndustryCompanyLocation.create({
    stateId,
    cityId,
    countryId,
    village: village,
    town: town,
    createdBy: userId,
  });
  return data;
};

export const addIndCmpLocBatch = async (indCmpLocData, transaction) => {
  const { stateId, cityId, countryId, village, town, userId } = indCmpLocData;

  const data = await IndustryCompanyLocation.create(
    {
      stateId,
      cityId,
      countryId,
      village: village,
      town: town,
      createdBy: userId,
    },
    { transaction }
  );
  return data;
};

export const updateIndCmpLoc = async (indCmpLocData) => {
  const { locationId, stateId, cityId, countryId, village, town, userId } =
    indCmpLocData;

  const data = await IndustryCompanyLocation.update(
    {
      stateId,
      cityId,
      countryId,
      village,
      town,
      updatedBy: userId,
    },
    {
      where: {
        locationId,
      },
    }
  );
  return data;
};

export const updateIndCmpLocBatch = async (indCmpLocData, transaction) => {
  const { locationId, stateId, cityId, countryId, village, town, userId } =
    indCmpLocData;

  const data = await IndustryCompanyLocation.update(
    {
      stateId,
      cityId,
      countryId,
      village,
      town,
      updatedBy: userId,
    },
    {
      where: {
        locationId,
      },
      transaction,
    }
  );
  return data;
};

export const deleteIndCmpLoc = async (indCmpLocData) => {
  const { locationId, userId } = indCmpLocData;
  const industryCompanyLocationResponse = await IndustryCompanyLocation.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        locationId,
      },
    }
  );
  const data = await IndustryCompanyLocation.destroy({
    where: {
      locationId,
    },
  });
  return data;
};
