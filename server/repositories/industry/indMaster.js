import db from "../../config/dbConfig.js";

const Industry = db.industryMaster;

export const fetchIndById = async (indId) => {
  const data = await Industry.findAll({
    where: {
      industryId: indId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchIndByName = async (indNameId) => {
  const data = await Industry.findAll({
    where: {
      industryNameId: indNameId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllInd = async () => {
  const data = await Industry.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchIndByLimit = async ({ limit, offset }) => {
  const data = await Industry.findAll({
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addInd = async (indData) => {
  const { industryNameId, industryRemarks, typeId, userId } = indData;

  const data = await Industry.create({
    industryNameId,
    industryRemarks,
    typeId,
    createdBy: userId,
  });
  return data;
};

export const addIndBatch = async (indData, transaction) => {
  const { industryNameId, industryRemarks, typeId, userId } = indData;

  const data = await Industry.create(
    {
      industryNameId,
      industryRemarks,
      typeId,
      createdBy: userId,
    },
    { transaction }
  );
  return data;
};

export const updateInd = async (indData) => {
  const { industryId, industryNameId, industryRemarks, typeId, userId } =
    indData;
  const data = await Industry.update(
    {
      industryNameId,
      industryRemarks,
      typeId,
      updatedBy: userId,
    },
    {
      where: {
        industryId: industryId,
      },
    }
  );
  return data;
};

export const updateIndBatch = async (indData, transaction) => {
  const { industryId, industryNameId, industryRemarks, typeId, userId } =
    indData;
  const data = await Industry.update(
    {
      industryNameId,
      industryRemarks,
      typeId,
      updatedBy: userId,
    },
    {
      where: {
        industryId: industryId,
      },
      transaction,
    }
  );
  return data;
};

export const deleteInd = async (indData, transaction) => {
  const { userId, industryId } = indData;
  const industryresponse = await Industry.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        industryId,
      },
      transaction,
    }
  );
  const data = await Industry.destroy({
    where: {
      industryId,
    },
    transaction,
  });
  return data;
};
