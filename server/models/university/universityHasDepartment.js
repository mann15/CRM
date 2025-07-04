export const universityHasDepartmentSchema = (
  sequelize,
  DataTypes,
  DepartmentMaster,
  University,
  User
) => {
  const universityHasDepartment = sequelize.define(
    "university_has_department",
    {
      universityDepartmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      universityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: University,
          key: "universityId",
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: DepartmentMaster,
          key: "departmentId",
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
  return universityHasDepartment;
};
