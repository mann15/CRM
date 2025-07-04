import db from "../../config/dbConfig.js";

const Naac = db.universityNaac;

export const fetchNaacById = async (naacId) => {
  const data = await Naac.findAll({
    where: {
      naacId,
    },
    order: [["naacGrade", "ASC"]],
  });
  return data;
};

export const fetchNaacByName = async (naacGrade) => {
  const data = await Naac.findAll({
    where: {
      naacGrade,
    },
    order: [["naacGrade", "ASC"]],
  });
  return data;
};

export const fetchAllNaac = async () => {
  const data = await Naac.findAll({
    order: [["naacGrade", "ASC"]],
  });
  return data;
};

export const addNaac = async (naacData) => {
  const { naacGrade, userId } = naacData;

  const [newRecord, created] = await Naac.findOrCreate({
    where: { naacGrade },
    paranoid: false,
    defaults: {
      naacGrade,
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
    return { message: "Naac Already Exists" };
  }

  return newRecord;
};

export const updateNaac = async (naacData) => {
  const { naacId, naacGrade, userId } = naacData;
  const data = await Naac.update(
    {
      naacGrade,
      updatedBy: userId,
    },
    {
      where: {
        naacId,
      },
    }
  );
  return data;
};

export const deleteNaac = async (naacData) => {
  const { naacId, userId } = naacData;
  const deleteNaacDetails = await Naac.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        naacId,
      },
    }
  );

  const data = await Naac.destroy({
    where: {
      naacId,
    },
  });
  return data;
};
