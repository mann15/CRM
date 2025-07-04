export const collegeDepartmentEmployeeHasDesignationSchema = (
  sequelize,
  DataTypes,
  CollegeDepartmentEmployee,
  CollegeDesignation,
  User
) => {
  const collegeDepartmentEmployeeHasDesignation = sequelize.define(
    "college_department_employee_has_designation",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: CollegeDepartmentEmployee,
          key: "employeeId",
        },
      },
      designationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: CollegeDesignation,
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
  return collegeDepartmentEmployeeHasDesignation;
};
