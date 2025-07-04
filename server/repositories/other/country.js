import db from "../../config/dbConfig.js";

const Country = db.country;

export const fetchCountryById = async (countryId) => {
  const data = await Country.findAll({
    where: {
      countryId: countryId,
    },
    order: [["countryName", "ASC"]],
  });
  return data;
};

export const fetchCountryByName = async (countryName) => {
  const data = await Country.findAll({
    where: {
      countryName: countryName,
    },
    order: [["countryName", "ASC"]],
  });
  return data;
};

export const fetchAllCountry = async () => {
  const data = await Country.findAll({
    order: [["countryName", "ASC"]],
  });
  return data;
};

export const addCountry = async (countryData) => {
  const { countryName, userId } = countryData;

  const [newRecord, created] = await Country.findOrCreate({
    where: { countryName },
    paranoid: false,
    defaults: {
      countryName,
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
    return { message: "Country Name Already Exists" };
  }

  return newRecord;
};

export const updateCountry = async (countryData) => {
  const { countryId, countryName, userId } = countryData;
  const data = await Country.update(
    {
      countryName: countryName,
      updatedBy: userId,
    },
    {
      where: {
        countryId: countryId,
      },
    }
  );
  return data;
};

export const deleteCountry = async (countryData) => {
  const { countryId, userId } = countryData;
  const deleteCountryData = await Country.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        countryId: countryId,
      },
    }
  );
  const data = await Country.destroy({
    where: {
      countryId: countryId,
    },
  });
  return data;
};
