export const universityMasterSchema = (
  sequelize,
  DataTypes,
  State,
  Country,
  City,
  UniversityType,
  UniversityNirf,
  UniversityNaac,
  User
) => {
  const university = sequelize.define(
    "university_master",
    {
      universityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      universityName: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("universityName", value?.toLowerCase());
        },
       },
      universityEmail1: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("universityEmail1", value?.toLowerCase());
        },
       },
      universityEmail2: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("universityEmail2", value?.toLowerCase());
        },
       },
      universityPhone1: { type: DataTypes.STRING },
      universityPhone2: { type: DataTypes.STRING },
      universityPincode: { type: DataTypes.INTEGER },
      universityAddress: { type: DataTypes.STRING ,
        set(value) {
          this.setDataValue("universityAddress", value?.toLowerCase());
        },
      },
      universityTown: { type: DataTypes.STRING ,
        set(value) {
          this.setDataValue("universityTown", value?.toLowerCase());
        },
      },
      universityVillage: { type: DataTypes.STRING,
        set(value) {
          this.setDataValue("universityVillage", value?.toLowerCase());
        },
       },
      universityRemarks: { type: DataTypes.STRING,
        set(value) {
          if (value !== undefined && value !== null) {
            this.setDataValue("universityRemarks", value?.toLowerCase());
          } else {
            this.setDataValue("universityRemarks", value);
          }
        },
       },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: City,
          key: "cityId",
        },
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: State,
          key: "stateId",
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Country,
          key: "countryId",
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: UniversityType,
          key: "typeId",
        },
      },
      nirfId: {
        type: DataTypes.INTEGER,

        references: {
          model: UniversityNirf,
          key: "nirfId",
        },
      },
      naacId: {
        type: DataTypes.INTEGER,

        references: {
          model: UniversityNaac,
          key: "naacId",
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
    { freezeTableName: true, paranoid: true, }
  );
  return university;
};
