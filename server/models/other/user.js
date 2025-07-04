export const userSchema = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user_table",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userEmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userAccess: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userEmail: { type: DataTypes.STRING, allowNull: false },
      userPassword: { type: DataTypes.STRING, allowNull: false },
    },
    { freezeTableName: true, paranoid: true }
  );
  return user;
};
