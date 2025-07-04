import db from "../../config/dbConfig.js";

const getTypeModel = (typesType) => {
  switch (typesType) {
    case "college":
      return db.collegeType;
    case "university":
      return db.universityType;
    case "industry":
      return db.industryType;
    default:
      throw new Error("Invalid role type.");
  }
};

export const fetchTypeById = async (typeData) => {
  const { typeId, typesType } = typeData;
  const Type = getTypeModel(typesType);
  const data = await Type.findAll({
    where: {
      typeId: typeId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchTypeByName = async (typeData) => {
  const { typeName, typesType } = typeData;
  const Type = getTypeModel(typesType);
  const data = await Type.findAll({
    where: {
      typeName: typeName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllType = async (typeData) => {
  const { typesType } = typeData;
  const Type = getTypeModel(typesType);
  const data = await Type.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addType = async (typeData) => {
  const { typeName, typesType, userId } = typeData;
  const Type = getTypeModel(typesType);
 

  const [newRecord, created] = await Type.findOrCreate({
    where: { typeName },
    paranoid: false,
    defaults: {
      typeName,
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
    return { message: "Type Name Already Exists" };
  }

  return newRecord;
};

export const updateType = async (typeData) => {
  const { typeId, typeName, typesType, userId } = typeData;
  const Type = getTypeModel(typesType);
  const data = await Type.update(
    {
      typeName: typeName,
      updatedBy: userId,
    },
    {
      where: {
        typeId
      },
    }
  );
  return data;
};

export const deleteType = async (typeData) => {
  const { typeId, typesType, userId } = typeData;
  const Type = getTypeModel(typesType);
  const deleteTypeData = await Type.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        typeId
      },
    }
  );
  const data = await Type.destroy({
    where: {
      typeId
    },
  });
  return data;
};