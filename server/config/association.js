// import {
//   ClgEmployeeBeforeDestroy,
//   ClgHasDeptBeforeDestroy,
//   collegeMasterBeforeDestroy,
//   IndCmpBeforeDestroy,
//   IndCmpHasCmpDeptBeforeDestroy,
//   IndEmployeeBeforeDestroy,
//   UniEmployeeBeforeDestroy,
//   UniHasDeptBeforeDestroy,
//   universityMasterBeforeDestroy,
// } from "./hooks.js";

export const setupAssociations = (db) => {
  // College Associations
  db.collegeType.hasMany(db.collegeMaster, {
    foreignKey: "typeId",
  });
  db.collegeMaster.belongsTo(db.collegeType, {
    foreignKey: "typeId",
  });

  db.city.hasMany(db.collegeMaster, {
    foreignKey: "cityId",
  });
  db.collegeMaster.belongsTo(db.city, {
    foreignKey: "cityId",
  });

  db.state.hasMany(db.collegeMaster, {
    foreignKey: "stateId",
  });
  db.collegeMaster.belongsTo(db.state, {
    foreignKey: "stateId",
  });

  db.country.hasMany(db.collegeMaster, {
    foreignKey: "countryId",
  });
  db.collegeMaster.belongsTo(db.country, {
    foreignKey: "countryId",
  });

  db.universityMaster.hasMany(db.collegeMaster, {
    foreignKey: "universityId",
  });
  db.collegeMaster.belongsTo(db.universityMaster, {
    foreignKey: "universityId",
  });

  db.collegeMaster.belongsToMany(db.departmentMaster, {
    through: db.collegeHasDepartment,
    foreignKey: "collegeId",
    otherKey: "departmentId",
  });

  db.departmentMaster.belongsToMany(db.collegeMaster, {
    through: db.collegeHasDepartment,
    foreignKey: "departmentId",
    otherKey: "collegeId",
  });
  db.collegeHasDepartment.belongsTo(db.collegeMaster, {
    foreignKey: "collegeId",
  });
  db.collegeHasDepartment.belongsTo(db.departmentMaster, {
    foreignKey: "departmentId",
  });
  db.collegeMaster.hasMany(db.collegeHasDepartment, {
    foreignKey: "collegeId",
  });
  db.departmentMaster.hasMany(db.collegeHasDepartment, {
    foreignKey: "departmentId",
  });

  db.collegeHasDepartment.hasMany(db.collegeEmployee, {
    foreignKey: "collegeDepartmentId",
  });
  db.collegeEmployee.belongsTo(db.collegeHasDepartment, {
    foreignKey: "collegeDepartmentId",
  });

  db.collegeEmployee.belongsToMany(db.collegeDesignation, {
    through: db.collegeEmployeeHasDesignation,
    foreignKey: "employeeId",
    otherKey: "designationId",
  });
  db.collegeDesignation.belongsToMany(db.collegeEmployee, {
    through: db.collegeEmployeeHasDesignation,
    foreignKey: "designationId",
    otherKey: "employeeId",
  });
  db.collegeEmployeeHasDesignation.belongsTo(db.collegeEmployee, {
    foreignKey: "employeeId",
  });
  db.collegeEmployeeHasDesignation.belongsTo(db.collegeDesignation, {
    foreignKey: "designationId",
  });
  db.collegeEmployee.hasMany(db.collegeEmployeeHasDesignation, {
    foreignKey: "employeeId",
  });
  db.collegeDesignation.hasMany(db.collegeEmployeeHasDesignation, {
    foreignKey: "designationId",
  });

  db.collegeHasDepartment.hasMany(db.collegeCourse, {
    foreignKey: "collegeDepartmentId",
  });
  db.collegeCourse.belongsTo(db.collegeHasDepartment, {
    foreignKey: "collegeDepartmentId",
  });

  // University Associations
  db.universityType.hasMany(db.universityMaster, {
    foreignKey: "typeId",
  });
  db.universityMaster.belongsTo(db.universityType, {
    foreignKey: "typeId",
  });

  db.city.hasMany(db.universityMaster, {
    foreignKey: "cityId",
  });
  db.universityMaster.belongsTo(db.city, {
    foreignKey: "cityId",
  });

  db.state.hasMany(db.universityMaster, {
    foreignKey: "stateId",
  });
  db.universityMaster.belongsTo(db.state, {
    foreignKey: "stateId",
  });

  db.country.hasMany(db.universityMaster, {
    foreignKey: "countryId",
  });
  db.universityMaster.belongsTo(db.country, {
    foreignKey: "countryId",
  });

  db.universityNaac.hasMany(db.universityMaster, {
    foreignKey: "naacId",
  });
  db.universityMaster.belongsTo(db.universityNaac, {
    foreignKey: "naacId",
  });

  db.universityNirf.hasMany(db.universityMaster, {
    foreignKey: "nirfId",
  });
  db.universityMaster.belongsTo(db.universityNirf, {
    foreignKey: "nirfId",
  });

  db.universityMaster.belongsToMany(db.departmentMaster, {
    through: db.universityHasDepartment,
    foreignKey: "universityId",
    otherKey: "departmentId",
  });
  db.departmentMaster.belongsToMany(db.universityMaster, {
    through: db.universityHasDepartment,
    foreignKey: "departmentId",
    otherKey: "universityId",
  });
  db.universityHasDepartment.belongsTo(db.universityMaster, {
    foreignKey: "universityId",
  });
  db.universityHasDepartment.belongsTo(db.departmentMaster, {
    foreignKey: "departmentId",
  });
  db.universityMaster.hasMany(db.universityHasDepartment, {
    foreignKey: "universityId",
  });
  db.departmentMaster.hasMany(db.universityHasDepartment, {
    foreignKey: "departmentId",
  });

  db.universityHasDepartment.hasMany(db.universityEmployee, {
    foreignKey: "universityDepartmentId",
  });
  db.universityEmployee.belongsTo(db.universityHasDepartment, {
    foreignKey: "universityDepartmentId",
  });

  db.universityEmployee.belongsToMany(db.universityDesignation, {
    through: db.universityEmployeeHasDesignation,
    foreignKey: "employeeId",
    otherKey: "designationId",
  });
  db.universityDesignation.belongsToMany(db.universityEmployee, {
    through: db.universityEmployeeHasDesignation,
    foreignKey: "designationId",
    otherKey: "employeeId",
  });
  db.universityEmployeeHasDesignation.belongsTo(db.universityEmployee, {
    foreignKey: "employeeId",
  });
  db.universityEmployeeHasDesignation.belongsTo(db.universityDesignation, {
    foreignKey: "designationId",
  });
  db.universityEmployee.hasMany(db.universityEmployeeHasDesignation, {
    foreignKey: "employeeId",
  });
  db.universityDesignation.hasMany(db.universityEmployeeHasDesignation, {
    foreignKey: "designationId",
  });

  db.universityHasDepartment.hasMany(db.universityCourse, {
    foreignKey: "universityDepartmentId",
  });
  db.universityCourse.belongsTo(db.universityHasDepartment, {
    foreignKey: "universityDepartmentId",
  });

  // Industry Associations
  db.industryType.hasMany(db.industryMaster, {
    foreignKey: "typeId",
  });
  db.industryMaster.belongsTo(db.industryType, {
    foreignKey: "typeId",
  });

  db.industryName.hasMany(db.industryMaster, {
    foreignKey: "industryNameId",
  });
  db.industryMaster.belongsTo(db.industryName, {
    foreignKey: "industryNameId",
  });

  db.industryMaster.hasMany(db.industryCompany, {
    foreignKey: "industryId",
  });
  db.industryCompany.belongsTo(db.industryMaster, {
    foreignKey: "industryId",
  });

  db.industryCompany.belongsToMany(db.departmentMaster, {
    through: db.industryCompanyHasIndustryDepartment,
    foreignKey: "companyId",
    otherKey: "departmentId",
  });
  db.departmentMaster.belongsToMany(db.industryCompany, {
    through: db.industryCompanyHasIndustryDepartment,
    foreignKey: "departmentId",
    otherKey: "companyId",
  });
  db.industryCompanyHasIndustryDepartment.belongsTo(db.industryCompany, {
    foreignKey: "companyId",
  });
  db.industryCompanyHasIndustryDepartment.belongsTo(db.departmentMaster, {
    foreignKey: "departmentId",
  });
  db.industryCompany.hasMany(db.industryCompanyHasIndustryDepartment, {
    foreignKey: "companyId",
  });
  db.departmentMaster.hasMany(db.industryCompanyHasIndustryDepartment, {
    foreignKey: "departmentId",
  });

  db.industryCompany.belongsToMany(db.industryCompanyLocation, {
    through: db.industryCompanyHasIndustryCompanyLocation,
    foreignKey: "companyId",
    otherKey: "locationId",
  });
  db.industryCompanyLocation.belongsToMany(db.industryCompany, {
    through: db.industryCompanyHasIndustryCompanyLocation,
    foreignKey: "locationId",
    otherKey: "companyId",
  });
  db.industryCompanyHasIndustryCompanyLocation.belongsTo(db.industryCompany, {
    foreignKey: "companyId",
  });
  db.industryCompanyHasIndustryCompanyLocation.belongsTo(
    db.industryCompanyLocation,
    { foreignKey: "locationId" }
  );
  db.industryCompany.hasMany(db.industryCompanyHasIndustryCompanyLocation, {
    foreignKey: "companyId",
  });
  db.industryCompanyLocation.hasMany(
    db.industryCompanyHasIndustryCompanyLocation,
    { foreignKey: "locationId" }
  );

  db.state.hasMany(db.industryCompanyLocation, {
    foreignKey: "stateId",
  });
  db.industryCompanyLocation.belongsTo(db.state, {
    foreignKey: "stateId",
  });

  db.city.hasMany(db.industryCompanyLocation, {
    foreignKey: "cityId",
  });
  db.industryCompanyLocation.belongsTo(db.city, {
    foreignKey: "cityId",
  });

  db.country.hasMany(db.industryCompanyLocation, {
    foreignKey: "countryId",
  });
  db.industryCompanyLocation.belongsTo(db.country, {
    foreignKey: "countryId",
  });

  db.industryCompany.hasOne(db.industryCompanyHeadQuarter, {
    foreignKey: "companyId",
  });
  db.industryCompanyHeadQuarter.belongsTo(db.industryCompany, {
    foreignKey: "companyId",
  });

  db.state.hasMany(db.industryCompanyHeadQuarter, {
    foreignKey: "stateId",
  });
  db.industryCompanyHeadQuarter.belongsTo(db.state, {
    foreignKey: "stateId",
  });

  db.city.hasMany(db.industryCompanyHeadQuarter, {
    foreignKey: "cityId",
  });
  db.industryCompanyHeadQuarter.belongsTo(db.city, {
    foreignKey: "cityId",
  });

  db.country.hasMany(db.industryCompanyHeadQuarter, {
    foreignKey: "countryId",
  });
  db.industryCompanyHeadQuarter.belongsTo(db.country, {
    foreignKey: "countryId",
  });

  db.industryCompanyHasIndustryDepartment.hasMany(db.industryEmployee, {
    foreignKey: "companyDepartmentId",
  });
  db.industryEmployee.belongsTo(db.industryCompanyHasIndustryDepartment, {
    foreignKey: "companyDepartmentId",
  });

  db.industryEmployee.belongsToMany(db.industryDesignation, {
    through: db.industryEmployeeHasIndustryDesignation,
    foreignKey: "employeeId",
    otherKey: "designationId",
  });
  db.industryDesignation.belongsToMany(db.industryEmployee, {
    through: db.industryEmployeeHasIndustryDesignation,
    foreignKey: "designationId",
    otherKey: "employeeId",
  });
  db.industryEmployeeHasIndustryDesignation.belongsTo(db.industryEmployee, {
    foreignKey: "employeeId",
  });
  db.industryEmployeeHasIndustryDesignation.belongsTo(db.industryDesignation, {
    foreignKey: "designationId",
  });
  db.industryEmployee.hasMany(db.industryEmployeeHasIndustryDesignation, {
    foreignKey: "employeeId",
  });
  db.industryDesignation.hasMany(db.industryEmployeeHasIndustryDesignation, {
    foreignKey: "designationId",
  });

  // db.universityMaster.addHook("beforeDestroy", universityMasterBeforeDestroy);
  // db.collegeMaster.addHook("beforeDestroy", collegeMasterBeforeDestroy);
  // db.collegeHasDepartment.addHook("beforeDestroy", ClgHasDeptBeforeDestroy);
  // db.universityHasDepartment.addHook("beforeDestroy", UniHasDeptBeforeDestroy);
  // db.universityEmployee.addHook("beforeDestroy", UniEmployeeBeforeDestroy);
  // db.collegeEmployee.addHook("beforeDestroy", ClgEmployeeBeforeDestroy);
  // db.industryCompany.addHook("beforeDestroy", IndCmpBeforeDestroy);
  // db.industryCompanyHasIndustryDepartment.addHook(
  //   "beforeDestroy",
  //   IndCmpHasCmpDeptBeforeDestroy
  // );
  // db.industryEmployee.addHook("beforeDestroy", IndEmployeeBeforeDestroy);
};
