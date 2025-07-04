export const universityDesignationSchema = (
  sequelize,
  DataTypes, 
  User
) => {
  const universityDesignation = sequelize.define(
    "university_designation",
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
          this.setDataValue("designationName", value?.toLowerCase());
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
  return universityDesignation;
};
