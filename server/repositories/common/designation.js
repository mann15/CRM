import db from "../../config/dbConfig.js";

const getDesignationModel = (designationType) => {
  switch (designationType) {
    case "college":
      return db.collegeDesignation;
    case "university":
      return db.universityDesignation;
    case "industry":
      return db.industryDesignation;
    default:
      throw new Error("Invalid designation type.");
  }
};

export const fetchDesignationById = async (designationData) => {
  const { designationId, designationType } = designationData;
  const Designation = getDesignationModel(designationType);
  const data = await Designation.findAll({
    where: {
      designationId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchDesignationByName = async (designationData) => {
  const { designationName, designationType } = designationData;
  const Designation = getDesignationModel(designationType);
  const data = await Designation.findAll({
    where: {
      designationName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllDesignation = async (designationData) => {
  const { designationType } = designationData;
  const Designation = getDesignationModel(designationType);
  const data = await Designation.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addDesignation = async (designationData) => {
  const { designationName, designationType, userId } = designationData;
  const Designation = getDesignationModel(designationType);
 

  const [newRecord, created] = await Designation.findOrCreate({
    where: { designationName },
    paranoid: false,
    defaults: {
      designationName,
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
    return { message: "Designation Name Already Exists" };
  }

  return newRecord;
};

export const updateDesignation = async (designationData) => {
  const { designationId, designationName, designationType, userId } =
    designationData;
  const Designation = getDesignationModel(designationType);
  const data = await Designation.update(
    {
      designationName,
      updatedBy: userId,
    },
    {
      where: {
        designationId,
      },
    }
  );
  return data;
};

export const deleteDesignation = async (designationData) => {
  const { designationId, designationType, userId } = designationData;
  const Designation = getDesignationModel(designationType);
  const deleteDesignationData = await Designation.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        designationId,
      },
    }
  );
  const data = await Designation.destroy({
    where: {
      designationId,
    },
  });
  return data;
};
