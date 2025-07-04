
export const collegeDepartmentEmployeeSchema = (
  sequelize,
  DataTypes,
  CollegeHasDepartment,
  User
) => {
  const collegeDepartmentEmployee = sequelize.define(
    "college_department_employee",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      employeeName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("employeeName", value?.toLowerCase()); // Store as lowercase
        },
      },
      employeeEmail1: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("employeeEmail1", value?.toLowerCase()); // Store in lowercase
        },
      },
      employeeEmail2: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("employeeEmail2", value?.toLowerCase()); // Store in lowercase
        },
      },
      employeePhone1: { type: DataTypes.STRING },
      employeePhone2: { type: DataTypes.STRING },
      collegeDepartmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: CollegeHasDepartment,
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

  return collegeDepartmentEmployee;
};
