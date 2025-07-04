export const industryEmployeeSchema = (
  sequelize,
  DataTypes,
  industryCompanyHasIndustryDepartment,
  User
) => {
  const industryEmployee = sequelize.define(
    "industry_employee",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      employeeName: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("employeeName", value?.trim().toLowerCase());
        },
       },
      employeeEmail1: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("employeeEmail1", value?.trim().toLowerCase());
        },
       },
      employeeEmail2: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("employeeEmail2", value ? value?.trim().toLowerCase() : null);
        },
       },
      employeePhone1: { type: DataTypes.STRING },
      employeePhone2: { type: DataTypes.STRING },
      companyDepartmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: industryCompanyHasIndustryDepartment,
          key: "companyDepartmentId",
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
  return industryEmployee;
};
