export const industryCompanyHasIndustryDepartmentSchema = (
  sequelize,
  DataTypes,
  departmentMaster,
  IndustryCompany,
  User
) => {
  const industryCompanyHasIndustryDepartment = sequelize.define(
    "industry_company_has_industry_department",
    {
      companyDepartmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: {
          model: IndustryCompany,
          key: "companyId",
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: departmentMaster,
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
  return industryCompanyHasIndustryDepartment;
};
