import db from "../../config/dbConfig.js";

const University = db.universityMaster;

export const fetchUniById = async (universityId) => {
  const data = await University.findAll({
    where: {
      universityId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchUniData = async () => {
  const data = await University.findAll({
    include: [
      {
        model: db.city,
        attributes: ["cityName"],
      },
      {
        model: db.state,
        attributes: ["stateName"],
      },
      {
        model: db.country,
        attributes: ["countryName"],
      },
      {
        model: db.universityType,
        attributes: ["typeName"],
      },
      {
        model: db.universityNirf,
        attributes: ["nirfRank"],
      },
      {
        model: db.universityNaac,
        attributes: ["naacGrade"],
      },
    ],

    order: [["updatedAt", "DESC"]],
    raw: true,
    nest: false,
  });

  const formattedData = data.map((uni) => ({
    universityId: uni.universityId,
    "University Name": uni.universityName,
    "Primary Email": uni.universityEmail1,
    "Secondary Email": uni.universityEmail2,
    "Primary Phone": uni.universityPhone1,
    "Secondary Phone": uni.universityPhone2,
    Pincode: uni.universityPincode,
    Address: uni.universityAddress,
    Town: uni.universityTown,
    Village: uni.universityVillage,
    "University Remark": uni.universityRemarks,
    City: uni["city.cityName"],
    State: uni["state.stateName"],
    Country: uni["country.countryName"],
    Type: uni["university_type.typeName"],
    nirfRank: uni["university_nirf.nirfRank"],
    naacGrade: uni["university_naac.naacGrade"],
  }));

  return formattedData;
};

export const fetchUniByName = async (universityName) => {
  const data = await University.findAll({
    where: {
      universityName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllUni = async () => {
  const data = await University.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchUniByLimit = async ({ limit, offset }) => {
  const data = await University.findAll({
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addUni = async (uniData) => {
  const {
    universityName,
    universityEmail1,
    universityEmail2,
    universityPhone1,
    universityPhone2,
    universityPincode,
    universityAddress,
    universityTown,
    universityVillage,
    universityRemarks,
    universityCity,
    universityState,
    universityCountry,
    universityType,
    universityNIRF,
    universityNAAC,
    userId,
  } = uniData;

  const data = await University.create({
    universityName,
    universityEmail1,
    universityEmail2,
    universityPhone1,
    universityPhone2,
    universityPincode,
    universityAddress,
    universityTown,
    universityVillage,
    universityRemarks,
    cityId: universityCity,
    stateId: universityState,
    countryId: universityCountry,
    typeId: universityType,
    nirfId: universityNIRF,
    naacId: universityNAAC,
    createdBy: userId,
  });
  return data;
};

export const updateUni = async (uniData) => {
  const {
    universityId,
    universityName,
    universityEmail1,
    universityEmail2,
    universityPhone1,
    universityPhone2,
    universityPincode,
    universityAddress,
    universityTown,
    universityVillage,
    universityRemarks,
    universityCity,
    universityState,
    universityCountry,
    universityType,
    universityNIRF,
    universityNAAC,
    userId,
  } = uniData;

  const data = await University.update(
    {
      universityName,
      universityEmail1,
      universityEmail2,
      universityPhone1,
      universityPhone2,
      universityPincode,
      universityAddress,
      universityTown,
      universityVillage,
      universityRemarks,
      cityId: universityCity,
      stateId: universityState,
      countryId: universityCountry,
      typeId: universityType,
      nirfId: universityNIRF,
      naacId: universityNAAC,
      updatedBy: userId,
    },
    {
      where: {
        universityId,
      },
    }
  );
  return data;
};

export const deleteUni = async (uniData, transaction) => {
  const { universityId, userId } = uniData;
  const deleteUniData = await University.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        universityId,
      },
      transaction,
    }
  );
  const university = await University.destroy({
    where: { universityId },
    transaction,
  });
  return university;
};
