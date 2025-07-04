export const industryEmployeeHasIndustryDesignationSchema = (
  sequelize,
  DataTypes,
  IndustryEmployee,
  IndustryDesignation,
  User
) => {
  const industryEmployeeHasIndustryDesignation = sequelize.define(
    "industry_employee_has_industry_designation",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: IndustryEmployee,
          key: "employeeId",
        },
      },
      designationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: IndustryDesignation,
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
  return industryEmployeeHasIndustryDesignation;
};
