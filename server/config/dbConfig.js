import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// other imports
import { citySchema } from "../models/other/city.js";
import { countrySchema } from "../models/other/country.js";
import { departmentMasterSchema } from "../models/other/departmentMaster.js";
import { logSchema } from "../models/other/logTable.js";
import { stateSchema } from "../models/other/state.js";
import { userSchema } from "../models/other/user.js";

// university imports
import { universityTypeSchema } from "../models/university/universityType.js";
import { universityNirfSchema } from "../models/university/universityNIRF.js";
import { universityNaacSchema } from "../models/university/universityNAAC.js";
import { universityMasterSchema } from "../models/university/universityMaster.js";
import { universityEmployeeSchema } from "../models/university/universityEmployee.js";
import { universityDesignationSchema } from "../models/university/universityDesignation.js";
import { universityHasDepartmentSchema } from "../models/university/universityHasDepartment.js";
import { universityEmployeeHasDesignationSchema } from "../models/university/universityEmployeeHasDesignation.js";
import { universityCourseSchema } from "../models/university/universityCourse.js";

// college imports
import { collegeTypeSchema } from "../models/college/collegeType.js";
import { collegeMasterSchema } from "../models/college/collegeMaster.js";
import { collegeDepartmentEmployeeSchema } from "../models/college/collegeDepartmentEmployee.js";
import { collegeDesignationSchema } from "../models/college/collegeDesignation.js";
import { collegeHasDepartmentSchema } from "../models/college/collegeHasDepartment.js";
import { collegeCourseSchema } from "../models/college/collegeCourse.js";
import { collegeDepartmentEmployeeHasDesignationSchema } from "../models/college/collegeDepartmentEmployeeHasDesignation.js";

// industry imports
import { industryTypeSchema } from "../models/industry/industryType.js";
import { industryNameSchema } from "../models/industry/industryName.js";
import { industryMasterSchema } from "../models/industry/industryMaster.js";
import { industryCompanySchema } from "../models/industry/industryCompany.js";
import { industryCompanyLocationSchema } from "../models/industry/industryCompanyLocation.js";
import { industryEmployeeSchema } from "../models/industry/industryEmployee.js";
import { industryDesignationSchema } from "../models/industry/industryDesignation.js";
import { industryCompanyHeadQuarterSchema } from "../models/industry/industryCompanyHeadQuarter.js";
import { industryCompanyHasIndustryCompanyLocationSchema } from "../models/industry/industryCompanyHasIndustryCompanyLocation.js";
import { industryCompanyHasIndustryDepartmentSchema } from "../models/industry/industryCompanyHasIndustryDepartment.js";
import { industryEmployeeHasIndustryDesignationSchema } from "../models/industry/industryEmployeeHasIndustryDesignation.js";

// Associations import
import { setupAssociations } from "./association.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // serverName: process.env.DB_SERVER,
    logging: false,
    pool: {
      max: process.env.DB_POOL.max,
      min: process.env.DB_POOL.min,
      acquire: process.env.DB_POOL.acquire,
      idle: process.env.DB_POOL.idle,
    },
  }
);

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

// Models mapping
// other models
db.user = userSchema(sequelize, DataTypes);
db.log = logSchema(sequelize, DataTypes, db.user);
db.city = citySchema(sequelize, DataTypes, db.user);
db.country = countrySchema(sequelize, DataTypes, db.user);
db.departmentMaster = departmentMasterSchema(sequelize, DataTypes, db.user);
db.state = stateSchema(sequelize, DataTypes, db.user);

// university models
db.universityNirf = universityNirfSchema(sequelize, DataTypes, db.user);
db.universityType = universityTypeSchema(sequelize, DataTypes, db.user);
db.universityNaac = universityNaacSchema(sequelize, DataTypes, db.user);
db.universityMaster = universityMasterSchema(
  sequelize,
  DataTypes,
  db.state,
  db.country,
  db.city,
  db.universityType,
  db.universityNirf,
  db.universityNaac,
  db.user
);
db.universityHasDepartment = universityHasDepartmentSchema(
  sequelize,
  DataTypes,
  db.departmentMaster,
  db.universityMaster,
  db.user
);
db.universityEmployee = universityEmployeeSchema(
  sequelize,
  DataTypes,
  db.universityHasDepartment,
  db.user
);
db.universityDesignation = universityDesignationSchema(
  sequelize,
  DataTypes,
  db.user
);

db.universityEmployeeHasDesignation = universityEmployeeHasDesignationSchema(
  sequelize,
  DataTypes,
  db.universityEmployee,
  db.universityDesignation,
  db.user
);
db.universityCourse = universityCourseSchema(
  sequelize,
  DataTypes,
  db.universityHasDepartment,
  db.user
);

// college models
db.collegeType = collegeTypeSchema(sequelize, DataTypes, db.user);
db.collegeMaster = collegeMasterSchema(
  sequelize,
  DataTypes,
  db.city,
  db.state,
  db.country,
  db.collegeType,
  db.universityMaster,
  db.user
);
db.collegeHasDepartment = collegeHasDepartmentSchema(
  sequelize,
  DataTypes,
  db.departmentMaster,
  db.collegeMaster,
  db.user
);
db.collegeEmployee = collegeDepartmentEmployeeSchema(
  sequelize,
  DataTypes,
  db.collegeHasDepartment,
  db.user
);
db.collegeDesignation = collegeDesignationSchema(sequelize, DataTypes, db.user);
db.collegeCourse = collegeCourseSchema(
  sequelize,
  DataTypes,
  db.collegeHasDepartment,
  db.user
);
db.collegeEmployeeHasDesignation =
  collegeDepartmentEmployeeHasDesignationSchema(
    sequelize,
    DataTypes,
    db.collegeEmployee,
    db.collegeDesignation,
    db.user
  );

// industry models
db.industryType = industryTypeSchema(sequelize, DataTypes, db.user);
db.industryName = industryNameSchema(sequelize, DataTypes, db.user);
db.industryMaster = industryMasterSchema(
  sequelize,
  DataTypes,
  db.industryName,
  db.industryType,
  db.user
);
db.industryCompany = industryCompanySchema(
  sequelize,
  DataTypes,
  db.industryMaster,
  db.user
);
db.industryCompanyLocation = industryCompanyLocationSchema(
  sequelize,
  DataTypes,
  db.city,
  db.state,
  db.country,
  db.user
);
db.industryCompanyHasIndustryDepartment =
  industryCompanyHasIndustryDepartmentSchema(
    sequelize,
    DataTypes,
    db.departmentMaster,
    db.industryCompany,
    db.user
  );
db.industryEmployee = industryEmployeeSchema(
  sequelize,
  DataTypes,
  db.industryCompanyHasIndustryDepartment,
  db.user
);
db.industryDesignation = industryDesignationSchema(
  sequelize,
  DataTypes,
  db.user
);
db.industryEmployeeHasIndustryDesignation =
  industryEmployeeHasIndustryDesignationSchema(
    sequelize,
    DataTypes,
    db.industryEmployee,
    db.industryDesignation,
    db.user
  );
db.industryCompanyHasIndustryCompanyLocation =
  industryCompanyHasIndustryCompanyLocationSchema(
    sequelize,
    DataTypes,
    db.industryCompany,
    db.industryCompanyLocation,
    db.user
  );
db.industryCompanyHeadQuarter = industryCompanyHeadQuarterSchema(
  sequelize,
  DataTypes,
  db.industryCompany,
  db.city,
  db.state,
  db.country,
  db.user
);

// First sync all tables that don't have foreign key dependencies
db.user.sync()
  .then(() => db.log.sync())
  .then(() => db.country.sync())
  .then(() => db.state.sync())
  .then(() => db.city.sync())
  .then(() => db.departmentMaster.sync())
  .then(() => db.universityType.sync())
  .then(() => db.universityNirf.sync())
  .then(() => db.universityNaac.sync())
  .then(() => db.universityMaster.sync())
  .then(() => db.collegeType.sync())
  // Now sync the college_master table
  .then(() => db.collegeMaster.sync())
  // Continue with other tables
  .then(() => db.universityHasDepartment.sync())
  .then(() => db.universityEmployee.sync())
  .then(() => db.universityDesignation.sync())
  .then(() => db.universityEmployeeHasDesignation.sync())
  .then(() => db.universityCourse.sync())
  .then(() => db.collegeHasDepartment.sync())
  .then(() => db.collegeEmployee.sync())
  .then(() => db.collegeDesignation.sync())
  .then(() => db.collegeEmployeeHasDesignation.sync())
  .then(() => db.collegeCourse.sync())
  .then(() => db.industryType.sync())
  .then(() => db.industryName.sync())
  .then(() => db.industryMaster.sync())
  .then(() => db.industryCompany.sync())
  .then(() => db.industryCompanyLocation.sync())
  .then(() => db.industryCompanyHasIndustryDepartment.sync())
  .then(() => db.industryEmployee.sync())
  .then(() => db.industryDesignation.sync())
  .then(() => db.industryEmployeeHasIndustryDesignation.sync())
  .then(() => db.industryCompanyHasIndustryCompanyLocation.sync())
  .then(() => db.industryCompanyHeadQuarter.sync())
  .then(() => {
    setupAssociations(db);
    console.log("Database sync completed successfully");
    return db.sequelize.sync({ force: false });
  })
  .catch((err) => {
    console.error("Error during database sync:", err);
  });

export default db;
