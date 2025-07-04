import db from "../../config/dbConfig.js";

const IndustryCmp = db.industryCompany;

export const fetchIndCmpById = async (companyId) => {
  const data = await IndustryCmp.findAll({
    where: {
      companyId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchIndData = async () => {
  const data = await db.industryCompanyHasIndustryCompanyLocation.findAll({
    include: [
      {
        model: IndustryCmp,
        attributes: [
          "companyId",
          "companyName",
          "companyRemarks",
          "companyPhone",
          "companyEmail",
        ],
        include: [
          {
            model: db.industryMaster,
            attributes: ["industryId"],
            include: [
              {
                model: db.industryType,
                attributes: ["typeName"],
              },
              {
                model: db.industryName,
                attributes: ["industryName"],
              },
            ],
          },
          {
            model: db.industryCompanyLocation,
            attributes: ["town", "village", "locationId"],
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
            ],
          },
          {
            model: db.industryCompanyHeadQuarter,
            attributes: ["headQuarterId"],
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
            ],
          },
        ],
      },
    ],
    order: [["updatedAt", "DESC"]],
    raw: true,
    nest: true,
  });

  const formattedData = data.map((item) => ({
    companyId: item?.industry_company?.companyId,
    "Company Name": item?.industry_company?.companyName,
    Phone: item?.industry_company?.companyPhone || null,
    Email: item?.industry_company?.companyEmail || null,
    "Company Remark": item?.industry_company?.companyRemarks || null,
    Type:
      item?.industry_company?.industry_master?.industry_type?.typeName || null,
    IndustryId: item?.industry_company?.industry_master?.industryId || null,
    "Industry Name":
      item?.industry_company?.industry_master?.industry_name?.industryName ||
      null,
    locationId:
      item?.industry_company?.industry_company_locations?.locationId || null,
    Town: item?.industry_company?.industry_company_locations?.town || null,
    Village:
      item?.industry_company?.industry_company_locations?.village || null,
    City:
      item?.industry_company?.industry_company_locations?.city?.cityName ||
      null,
    State:
      item?.industry_company?.industry_company_locations?.state?.stateName ||
      null,
    Country:
      item?.industry_company?.industry_company_locations?.country
        ?.countryName || null,
    headQuarterId:
      item?.industry_company?.industry_company_head_quarter?.headQuarterId ||
      null,
    "Headquarter City":
      item?.industry_company?.industry_company_head_quarter?.city?.cityName ||
      null,
    "Headquarter State":
      item?.industry_company?.industry_company_head_quarter?.state?.stateName ||
      null,
    "Headquarter Country":
      item?.industry_company?.industry_company_head_quarter?.country
        ?.countryName || null,
  }));

  return formattedData;
};

export const fetchIndCmpByName = async (companyName) => {
  const data = await IndustryCmp.findAll({
    where: {
      companyName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllIndCmp = async () => {
  const data = await IndustryCmp.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchIndCmpByLimit = async ({ limit, offset }) => {
  const data = await IndustryCmp.findAll({
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndCmp = async (cmpData) => {
  const {
    companyName,
    companyRemarks,
    industryId,
    userId,
    companyPhone,
    companyEmail,
  } = cmpData;
  const data = await IndustryCmp.create({
    companyName,
    companyRemarks,
    industryId,
    companyPhone,
    companyEmail,
    createdBy: userId,
  });
  return data;
};

export const addIndCmpBatch = async (cmpData, transaction) => {
  const {
    companyName,
    companyRemarks,
    industryId,
    userId,
    companyPhone,
    companyEmail,
  } = cmpData;
  const data = await IndustryCmp.create(
    {
      companyName,
      companyRemarks,
      industryId,
      companyPhone,
      companyEmail,
      createdBy: userId,
    },
    { transaction }
  );
  return data;
};

export const updateIndCmp = async (cmpData) => {
  const {
    companyId,
    companyName,
    companyRemarks,
    companyEmail,
    companyPhone,
    industryId,
    userId,
  } = cmpData;
  const data = await IndustryCmp.update(
    {
      companyName,
      companyRemarks,
      industryId,
      companyPhone,
      companyEmail,
      updatedBy: userId,
    },
    {
      where: {
        companyId,
      },
    }
  );
  return data;
};

export const updateIndCmpBatch = async (cmpData, transaction) => {
  const {
    companyId,
    companyName,
    companyRemarks,
    companyEmail,
    companyPhone,
    industryId,
    userId,
  } = cmpData;
  const data = await IndustryCmp.update(
    {
      companyName,
      companyRemarks,
      industryId,
      companyPhone,
      companyEmail,
      updatedBy: userId,
    },
    {
      where: {
        companyId,
      },
      transaction,
    }
  );
  return data;
};

export const deleteIndCmp = async (cmpData, transaction) => {
  const { companyId, userId } = cmpData;
  const deleteIndCmpData = await IndustryCmp.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        companyId,
      },
      transaction,
    }
  );
  const company = await IndustryCmp.destroy({
    where: { companyId },
    transaction,
  });
  return company;
};
