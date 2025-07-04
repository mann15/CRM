import db from "../../config/dbConfig.js";

const City = db.city;

export const fetchCityById = async (cityId) => {
  const data = await City.findAll({
    where: {
      cityId: cityId,
    },
    order: [["cityName", "ASC"]],
  });
  return data;
};

export const fetchCityByName = async (cityName) => {
  const data = await City.findAll({
    where: {
      cityName: cityName,
    },
    order: [["cityName", "ASC"]],
  });
  return data;
};

export const fetchAllCity = async () => {
  const data = await City.findAll({
    order: [["cityName", "ASC"]],
  });
  return data;
};

export const addCity = async (cityData) => {
  const { cityName, userId } = cityData;

  const [city, created] = await City.findOrCreate({
    where: {
      cityName: cityName,
    },
    paranoid: false,
    defaults: {
      cityName: cityName,
      createdBy: userId,
    },
  });
  if (created) {
    return city;
  }
  if (city.deletedAt) {
    await city.restore();
    await City.update(
      {
        createdBy: userId,
        deletedBy: null,
      },
      {
        where: {
          cityId: city.cityId,
        },
      }
    );
    return city;
  }
  return city;
};

export const updateCity = async (cityData) => {
  const { cityId, cityName, userId } = cityData;
  const data = await City.update(
    {
      cityName: cityName,
      updatedBy: userId,
    },
    {
      where: {
        cityId: cityId,
      },
    }
  );
  return data;
};

export const deleteCity = async (cityData) => {
  const { cityId, userId } = cityData;
  const deleteUserDetails = await City.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        cityId: cityId,
      },
    }
  );
  const data = await City.destroy({
    where: {
      cityId: cityId,
      deletedBy: userId,
    },
  });
  return data;
};
