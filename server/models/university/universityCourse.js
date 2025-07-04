export const universityCourseSchema = (
    sequelize,
    DataTypes,
    universityHasDepartment,
    User
) => {
    const universityCourse = sequelize.define(
      "university_course",
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
          }
        },
        universityDepartmentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: universityHasDepartment,
            key: "universityDepartmentId",
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
    return universityCourse;
}