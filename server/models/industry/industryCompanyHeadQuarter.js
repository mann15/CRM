export const industryCompanyHeadQuarterSchema = (
  sequelize,
  DataTypes,
  IndustryCompany,
  City,
  State,
  Country,
  User
) => {
  const industryCompanyHeadQuarter = sequelize.define(
    "industry_company_head_quarter",
    {
      headQuarterId: {
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
      stateId: {
        type: DataTypes.INTEGER,
        references: {
          model: State,
          key: "stateId",
        },
      },
      cityId: {
        type: DataTypes.INTEGER,
        references: {
          model: City,
          key: "cityId",
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
        references: {
          model: Country,
          key: "countryId",
        },
      },
      village: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("village", value?.trim().toLowerCase());
        },
       },
      town: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("town", value?.trim().toLowerCase());
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
  return industryCompanyHeadQuarter;
};
