export const stateSchema = (sequelize, DataTypes, User) => {
  const state = sequelize.define(
    "state",
    {
      stateId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      stateName: { type: DataTypes.STRING, unique: true, allowNull: false ,
        set(value) {
          this.setDataValue("stateName", value?.toLowerCase());
        }
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "userId",
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "userId",
        },
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "userId",
        },
      },
    },
    { freezeTableName: true, paranoid: true }
  );
  return state;
};
