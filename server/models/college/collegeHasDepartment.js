export const collegeHasDepartmentSchema = (
  sequelize,
  DataTypes,
  DepartmentMaster,
  College,
  User
) => {
  const collegeHasDepartment = sequelize.define(
    "college_has_department",
    {
      collegeDepartmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      collegeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: College,
          key: "collegeId",
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
  return collegeHasDepartment;
};
