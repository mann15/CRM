export const universityEmployeeHasDesignationSchema = (
  sequelize,
  DataTypes,
  UniversityEmployee,
  DesignationMaster,
  User
) => {
  const universityEmployeeHasDesignation = sequelize.define(
    "university_employee_has_designation",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: UniversityEmployee,
          key: "employeeId",
        },
      },
      designationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: DesignationMaster,
          key: "designationId",
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
  return universityEmployeeHasDesignation;
};