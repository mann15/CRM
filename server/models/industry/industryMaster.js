export const industryMasterSchema = (
  sequelize,
  DataTypes,
  IndustryName,
  IndustryType,
  User
) => {
  const industry = sequelize.define(
    "industry_master",
    {
      industryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      industryNameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: IndustryName,
          key: "industryNameId",
        },
      },
      industryRemarks: { type: DataTypes.STRING ,
        set(value) {
          this.setDataValue("industryRemarks", value ? value?.trim().toLowerCase() : null);
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: IndustryType,
          key: "typeId",
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
  return industry;
};
