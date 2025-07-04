export const universityTypeSchema = (sequelize, DataTypes, User) => {
  const universityType = sequelize.define(
    "university_type",
    {
      typeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      typeName: { type: DataTypes.STRING, unique: true, allowNull: false,
        set(value) {
          this.setDataValue("typeName", value?.toLowerCase());
        }
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
  return universityType;
};
