export const universityEmployeeSchema = (
  sequelize,
  DataTypes,
  UniversityHasDepartment,
  User
) => {
  const universityEmployee = sequelize.define(
    "university_employee",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      employeeName: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("employeeName", value?.toLowerCase());
        },
       },
      employeeEmail1: { type: DataTypes.STRING ,
        set(value) {
          this.setDataValue("employeeEmail1", value?.toLowerCase());
        },
      },
      employeeEmail2: { type: DataTypes.STRING ,
        set(value) {
          this.setDataValue("employeeEmail2", value?.toLowerCase());
        },
      },
      employeePhone1: { type: DataTypes.STRING },
      employeePhone2: { type: DataTypes.STRING },
      universityDepartmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: UniversityHasDepartment,
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
  return universityEmployee;
};
