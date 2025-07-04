export const departmentMasterSchema = (sequelize, DataTypes, User) => {
  const department = sequelize.define(
    "department_master",
    {
      departmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      departmentName: { type: DataTypes.STRING, unique: true,
        set(value) {
          this.setDataValue("departmentName", value?.toLowerCase());
        },
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
  return department;
};
