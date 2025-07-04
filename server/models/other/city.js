export const citySchema = (sequelize, DataTypes, User) => {
  const city = sequelize.define(
    "city",
    {
      cityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      cityName: { type: DataTypes.STRING, unique: true, allowNull: false,
        set(value) {
          this.setDataValue("cityName", value?.toLowerCase());
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
  return city;
};
