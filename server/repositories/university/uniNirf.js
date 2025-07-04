import db from "../../config/dbConfig.js";

const Nirf = db.universityNirf;

export const fetchNirfById = async (nirfId) => {
  const data = await Nirf.findAll({
    where: {
      nirfId,
    },
    order: [["nidfRank", "ASC"]],
  });
  return data;
};

export const fetchNirfByName = async (nirfRank) => {
  const data = await Nirf.findAll({
    where: {
      nirfRank,
    },
    order: [["nirfRank", "ASC"]],
  });
  return data;
};

export const fetchAllNirf = async () => {
  const data = await Nirf.findAll({
    order: [["nirfRank", "ASC"]],
  });
  return data;
};

export const addNirf = async (nirfData) => {
  const { userId, nirfRank } = nirfData;
 
  const [newRecord, created] = await Nirf.findOrCreate({
    where: { nirfRank },
    paranoid: false,
    defaults: {
      nirfRank,
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
    return { message: "Nirf Already Exists" };
  }

  return newRecord;
};

export const updateNirf = async (nirfData) => {
  const { nirfId, nirfRank, userId } = nirfData;
  const data = await Nirf.update(
    {
      nirfRank,
      updatedBy: userId,
    },
    {
      where: {
        nirfId,
      },
    }
  );
  return data;
};

export const deleteNirf = async (nirfData) => {
  const { nirfId, userId } = nirfData;
  const deleteNirfDetails = await Nirf.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        nirfId,
      },
    }
  );

  const data = await Nirf.destroy({
    where: {
      nirfId,
    },
  });
  return data;
};
