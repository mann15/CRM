export const universityNirfSchema = (sequelize, DataTypes, User) => {
  const universityNirf = sequelize.define(
    "university_nirf",
    {
      nirfId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      nirfRank: {
        type: DataTypes.STRING,
        unique: true
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
  return universityNirf;
};
