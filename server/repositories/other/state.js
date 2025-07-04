import db from "../../config/dbConfig.js";

const State = db.state;

export const fetchStateById = async (stateId) => {
  const data = await State.findAll({
    where: {
      stateId: stateId,
    },
    order: [["stateName", "ASC"]],
  });
  return data;
};

export const fetchStateByName = async (stateName) => {
  const data = await State.findAll({
    where: {
      stateName: stateName,
    },
    order: [["stateName", "ASC"]],
  });
  return data;
};

export const fetchAllState = async () => {
  const data = await State.findAll({
    order: [["stateName", "ASC"]],
  });
  return data;
};

export const addState = async (stateData) => {
  const { stateName, userId } = stateData;
 

  const [newRecord, created] = await State.findOrCreate({
    where: { stateName },
    paranoid: false,
    defaults: {
      stateName,
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
    return { message: "State Name Already Exists" };
  }

  return newRecord;
};

export const updateState = async (stateData) => {
  const { stateId, stateName, userId } = stateData;
  const data = await State.update(
    {
      stateName,
      updatedBy: userId,
    },
    {
      where: {
        stateId,
      },
    }
  );
  return data;
};

export const deleteState = async (stateData) => {
  const { stateId, userId } = stateData;
  const deletestateData = await State.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        stateId,
      },
    }
  );
  const data = await State.destroy({
    where: {
      stateId,
    },
  });
  return deletestateData;
};
