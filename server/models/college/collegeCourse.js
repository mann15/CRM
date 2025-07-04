
export const collegeCourseSchema = (
  sequelize,
  DataTypes,
  collegeHasDepartment,
  User
) => {
  const collegeCourse = sequelize.define(
    "college_course",
    {
      courseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      courseName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        set(value) {
          this.setDataValue("courseName", value?.toLowerCase());
        },
      },
      collegeDepartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: collegeHasDepartment,
          key: "collegeDepartmentId",
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

  return collegeCourse;
};
