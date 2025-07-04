export const industryCompanySchema = (sequelize, DataTypes, Industry, User) => {
  const industryCompany = sequelize.define(
    "industry_company",
    {
      companyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("companyName", value?.trim().toLowerCase());
        },
      },
      companyRemarks: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            "companyRemarks",
            value ? value?.trim().toLowerCase() : null
          );
        },
      },
      companyPhone: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("companyPhone", value ? value?.trim() : null);
        },
      },
      companyEmail: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            "companyEmail",
            value ? value?.trim().toLowerCase() : null
          );
        },
      },
      industryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Industry,
          key: "industryId",
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
  return industryCompany;
};
