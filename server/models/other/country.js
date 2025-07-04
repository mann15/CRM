export const countrySchema = (sequelize, DataTypes, User) => {
  const country = sequelize.define(
    "country",
    {
      countryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      countryName: { type: DataTypes.STRING, unique: true, allowNull: false,
        set(value) {
          this.setDataValue("countryName", value?.toLowerCase());
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
  return country;
};
