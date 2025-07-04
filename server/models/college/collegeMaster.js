export const collegeMasterSchema = (
  sequelize,
  DataTypes,
  City,
  State,
  Country,
  CollegeType,
  University,
  User
) => {
  const college = sequelize.define(
    "college_master",
    {
      collegeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      collegeName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("collegeName", value?.trim().toLowerCase());
        },
      },
      collegeEmail1: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("collegeEmail1", value?.trim().toLowerCase());
        },
      },
      collegeEmail2: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            "collegeEmail2",
            value ? value?.trim().toLowerCase() : null
          );
        },
      },
      collegePhone1: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("collegePhone1", value?.trim());
        },
      },
      collegePhone2: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("collegePhone2", value ? value?.trim() : null);
        },
      },
      collegePincode: { type: DataTypes.INTEGER },
      collegeAddress: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("collegeAddress", value?.trim().toLowerCase());
        },
      },
      collegeTown: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            "collegeTown",
            value ? value?.trim().toLowerCase() : null
          );
        },
      },
      collegeVillage: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            "collegeVillage",
            value ? value?.trim().toLowerCase() : null
          );
        },
      },
      collegeRemarks: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            "collegeRemarks",
            value ? value?.trim().toLowerCase() : null
          );
        },
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: City, key: "cityId" },
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: State, key: "stateId" },
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Country, key: "countryId" },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: CollegeType, key: "typeId" },
      },
      universityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: University, key: "universityId" },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: { model: User, key: "userId" },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: { model: User, key: "userId" },
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        references: { model: User, key: "userId" },
      },
    },
    { freezeTableName: true, paranoid: true }
  );

  return college;
};
