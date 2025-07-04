export const logSchema = (sequelize, DataTypes, User) => {
  const log = sequelize.define(
    "log",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "userId",
        },
      },
      userEmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("userName", value?.trim().toLowerCase());
        },
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tableName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("tableName", value?.toLowerCase());
        },
      },
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return log;
};
