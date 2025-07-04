export const industryCompanyHasIndustryCompanyLocationSchema = (
  sequelize,
  DataTypes,
  IndustryCompany,
  IndustryCompanyLocation,
  user
) => {
  const industryCompanyHasIndustryCompanyLocation = sequelize.define(
    "industry_company_has_industry_company_location",
    {
      companyId: {
        type: DataTypes.INTEGER,
        references: {
          model: IndustryCompany,
          key: "companyId",
        },
        primaryKey: true,
      },
      locationId: {
        type: DataTypes.INTEGER,
        references: {
          model: IndustryCompanyLocation,
          key: "locationId",
        },
        primaryKey: true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: user,
          key: "userId",
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: user,
          key: "userId",
        },
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: user,
          key: "userId",
        },
      },
    },
    { freezeTableName: true, paranoid: true }
  );
  return industryCompanyHasIndustryCompanyLocation;
};
