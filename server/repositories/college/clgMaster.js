import db from "../../config/dbConfig.js";

const College = db.collegeMaster;
// const City = db.city;
// const State = db.state;
// const Country = db.country;
// const University = db.universityMaster;
// const type = db.collegeType;

export const fetchClgById = async (collegeId) => {
  const data = await College.findAll({
    where: {
      collegeId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchClgByName = async (collegeName) => {
  const data = await College.findAll({
    where: {
      collegeName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllClg = async () => {
  const data = await College.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchClgByLimit = async ({ limit, offset }) => {
  const data = await College.findAll({
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllCollege = async () => {
  const data = await College.findAll({
    include: [
      {
        model: db.city,
        attributes: [["cityName", "cityName"]],
      },
      {
        model: db.state,
        attributes: [["stateName", "stateName"]],
      },
      {
        model: db.country,
        attributes: [["countryName", "countryName"]],
      },
      {
        model: db.universityMaster,
        attributes: [["universityName", "universityName"]],
      },
      {
        model: db.collegeType,
        attributes: [["typeName", "typeName"]],
      },
    ],
    order: [["updatedAt", "DESC"]],
    raw: true,
    nest: false,
  });

  const formattedData = data.map((item) => ({
    collegeId: item["collegeId"],
    "College Name": item["collegeName"],
    "Primary Email": item["collegeEmail1"],
    "Secondary Email": item["collegeEmail2"],
    "Primary Number": item["collegePhone1"],
    "Secondary Number": item["collegePhone2"],
    Pincode: item["collegePincode"],
    Address: item["collegeAddress"],
    Town: item["collegeTown"],
    Village: item["collegeVillage"],
    "College Remark": item["collegeRemarks"],
    City: item["cityName"] || item["city.cityName"],
    State: item["stateName"] || item["state.stateName"],
    Country: item["countryName"] || item["country.countryName"],
    University:
      item["universityName"] || item["university_master.universityName"],
    Type: item["typeName"] || item["college_type.typeName"],
  }));

  return formattedData;
};

export const addClg = async (clgData) => {
  const {
    collegeName,
    collegeEmail1,
    collegeEmail2,
    collegePhone1,
    collegePhone2,
    collegePincode,
    collegeAddress,
    collegeTown,
    collegeVillage,
    collegeRemarks,
    collegeCity,
    collegeState,
    collegeCountry,
    typeId,
    universityId,
    userId,
  } = clgData;

  const data = await College.create({
    collegeName,
    collegeEmail1,
    collegeEmail2,
    collegePhone1,
    collegePhone2,
    collegePincode,
    collegeAddress,
    collegeTown,
    collegeVillage,
    collegeRemarks,
    cityId: collegeCity,
    stateId: collegeState,
    countryId: collegeCountry,
    typeId,
    universityId: universityId,
    createdBy: userId,
  });
  return data;
};

export const updateClg = async (clgData) => {
  const {
    collegeId,
    collegeName,
    collegeEmail1,
    collegeEmail2,
    collegePhone1,
    collegePhone2,
    collegePincode,
    collegeAddress,
    collegeTown,
    collegeVillage,
    collegeRemarks,
    collegeCity,
    collegeState,
    collegeCountry,
    typeId,
    universityId,
    userId,
  } = clgData;

  const data = await College.update(
    {
      collegeName,
      collegeEmail1,
      collegeEmail2,
      collegePhone1,
      collegePhone2,
      collegePincode,
      collegeAddress,
      collegeTown,
      collegeVillage,
      collegeRemarks,
      cityId: collegeCity,
      stateId: collegeState,
      countryId: collegeCountry,
      typeId,
      universityId,
      updatedBy: userId,
    },
    {
      where: {
        collegeId,
      },
    }
  );
  return data;
};

export const deleteClg = async (clgData, transaction) => {
  const { collegeId, userId } = clgData;
  const deleteClgData = await College.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        collegeId: collegeId,
      },
      transaction,
    }
  );
  const college = await College.destroy({ where: { collegeId }, transaction });
  return college;
};
