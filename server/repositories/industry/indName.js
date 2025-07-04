import db from "../../config/dbConfig.js";

const Name = db.industryName;

export const fetchIndNameById = async (industryNameId) => {
  const data = await Name.findAll({
    where: {
      industryNameId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchIndNameByName = async (industryName) => {
  const data = await Name.findAll({
    where: {
      industryName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllIndName = async () => {
  const data = await Name.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndName = async (indNameData) => {
  const { industryName, userId } = indNameData;

  const [newRecord, created] = await Name.findOrCreate({
    where: { industryName },
    paranoid: false,
    defaults: {
      industryName,
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
  }
  return newRecord;
};

export const addIndNameBatch = async (indNameData, transaction) => {
  const { industryName, userId } = indNameData;

  const [newRecord, created] = await Name.findOrCreate({
    where: { industryName },
    paranoid: false,
    defaults: {
      industryName,
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
  }
  return newRecord;
};

export const updateIndName = async ({
  industryNameId,
  industryName,
  userId,
}) => {
  const data = await Name.update(
    {
      industryName,
      updatedBy: userId,
    },
    {
      where: {
        industryNameId,
      },
    }
  );
  return data;
};

export const deleteIndName = async (indNameData) => {
  const { industryNameId, userId } = indNameData;
  const deleteIndustryNameData = await Name.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        industryNameId,
      },
    }
  );
  const data = await Name.destroy({
    where: {
      industryNameId,
    },
  });
  return data;
};
