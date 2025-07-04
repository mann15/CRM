export const industryDesignationSchema = (
  sequelize,
  DataTypes,
  User
) => {
  const industryDesignation = sequelize.define(
    "industry_designation",
    {
      designationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      designationName: {
        type: DataTypes.STRING, unique: true, allowNull: false,
        set(value) {
          this.setDataValue("designationName", value?.toLowerCase()); // Store in lowercase
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
  return industryDesignation;
};
