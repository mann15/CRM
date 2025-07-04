import { deleteClgDeptCourse } from "../repositories/college/clgCourse.js";
import { deleteClgEmployee } from "../repositories/college/clgEmployee.js";
import { deleteClgEmpHasDesignation } from "../repositories/college/clgEmployeeHasDesignation.js";
import { deleteClgHasDept } from "../repositories/college/clgHasDept.js";
import { deleteClg } from "../repositories/college/clgMaster.js";
import { deleteIndCmp } from "../repositories/industry/indCmp.js";
import { deleteIndCmpHasIndCmpDept } from "../repositories/industry/indCmpHasIndCmpDept.js";
import { deleteIndCmpHasCmpLoc } from "../repositories/industry/indCmpHasIndCmpLoc.js";
import { deleteCmpHeadQt } from "../repositories/industry/indCmpHeadQt.js";
import { deleteIndEmp } from "../repositories/industry/indEmp.js";
import { deleteIndEmpHasDes } from "../repositories/industry/indEmpHasIndDes.js";
import { deleteUniDeptCourse } from "../repositories/university/uniCourse.js";
import { deleteUniEmployee } from "../repositories/university/uniEmployee.js";
import { deleteUniEmpHasDesignation } from "../repositories/university/uniEmployeeHasDesignation.js";
import { deleteUniHasDept } from "../repositories/university/uniHasDept.js";
import db from "./dbConfig.js";

export const universityMasterBeforeDestroy = async (
  university,
  transaction
) => {
  try {
    const colleges = await db.collegeMaster.findAll({
      where: { universityId: university.universityId },
      transaction,
    });

    for (const college of colleges) {
      const collegeDepartments = await db.collegeHasDepartment.findAll({
        where: { collegeId: college.collegeId },
        transaction,
      });

      for (const department of collegeDepartments) {
        const employees = await db.collegeEmployee.findAll({
          where: { collegeDepartmentId: department.collegeDepartmentId },
          transaction,
        });

        for (const employee of employees) {
          const designations = await db.collegeEmployeeHasDesignation.findAll({
            where: { employeeId: employee.employeeId },
            transaction,
          });

          for (const designation of designations) {
            await deleteClgEmpHasDesignation(
              {
                employeeId: designation.employeeId,
                designationId: designation.designationId,
                userId: university.userId,
              },
              transaction
            );
          }

          await deleteClgEmployee(
            {
              employeeId: employee.employeeId,
              userId: university.userId,
            },
            transaction
          );
        }

        const courses = await db.collegeCourse.findAll({
          where: { collegeDepartmentId: department.collegeDepartmentId },
          transaction,
        });

        for (const course of courses) {
          await deleteClgDeptCourse(
            {
              courseId: course.courseId,
              userId: university.userId,
            },
            transaction
          );
        }

        await deleteClgHasDept(
          {
            collegeId: college.collegeId,
            departmentId: department.departmentId,
            userId: university.userId,
          },
          transaction
        );
      }

      await deleteClg(
        {
          collegeId: college.collegeId,
          userId: university.userId,
        },
        transaction
      );
    }

    const uniDepartments = await db.universityHasDepartment.findAll({
      where: { universityId: university.universityId },
      transaction,
    });

    for (const department of uniDepartments) {
      const employees = await db.universityEmployee.findAll({
        where: { universityDepartmentId: department.departmentId },
        transaction,
      });

      for (const employee of employees) {
        const designations = await db.universityEmployeeHasDesignation.findAll({
          where: { employeeId: employee.employeeId },
          transaction,
        });

        for (const designation of designations) {
          await deleteUniEmpHasDesignation(
            {
              employeeId: employee.employeeId,
              designationId: designation.designationId,
              userId: university.userId,
            },
            transaction
          );
        }

        await deleteUniEmployee(
          {
            employeeId: employee.employeeId,
            userId: university.userId,
          },
          transaction
        );
      }

      const courses = await db.universityCourse.findAll({
        where: { universityDepartmentId: department.departmentId },
        transaction,
      });

      for (const course of courses) {
        await deleteUniDeptCourse(
          {
            courseId: course.courseId,
            userId: university.userId,
          },
          transaction
        );
      }

      await deleteUniHasDept(
        {
          universityId: university.universityId,
          departmentId: department.departmentId,
          userId: university.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

export const collegeMasterBeforeDestroy = async (college, transaction) => {
  try {
    const departments = await db.collegeHasDepartment.findAll({
      where: { collegeId: college.collegeId },
      transaction,
    });

    for (const department of departments) {
      const employees = await db.collegeEmployee.findAll({
        where: { collegeDepartmentId: department.collegeDepartmentId },
        transaction,
      });

      for (const employee of employees) {
        const designations = await db.collegeEmployeeHasDesignation.findAll({
          where: { employeeId: employee.employeeId },
          transaction,
        });

        for (const designation of designations) {
          await deleteClgEmpHasDesignation(
            {
              employeeId: designation.employeeId,
              designationId: designation.designationId,
              userId: college.userId,
            },
            transaction
          );
        }

        await deleteClgEmployee(
          {
            employeeId: employee.employeeId,
            userId: college.userId,
          },
          transaction
        );
      }

      const courses = await db.collegeCourse.findAll({
        where: { collegeDepartmentId: department.departmentId },
        transaction,
      });

      for (const course of courses) {
        await deleteClgDeptCourse(
          {
            courseId: course.courseId,
            userId: college.userId,
          },
          transaction
        );
      }

      await deleteClgHasDept(
        {
          collegeId: college.collegeId,
          departmentId: department.departmentId,
          userId: college.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

export const ClgHasDeptBeforeDestroy = async (department, transaction) => {
  try {
    const employees = await db.collegeEmployee.findAll({
      where: { collegeDepartmentId: department.collegeDepartmentId },
      transaction,
    });

    for (const employee of employees) {
      const designations = await db.collegeEmployeeHasDesignation.findAll({
        where: { employeeId: employee.employeeId },
        transaction,
      });

      for (const designation of designations) {
        await deleteClgEmpHasDesignation(
          {
            employeeId: designation.employeeId,
            designationId: designation.designationId,
            userId: department.userId,
          },
          transaction
        );
      }

      await deleteClgEmployee(
        {
          employeeId: employee.employeeId,
          userId: department.userId,
        },
        transaction
      );
    }

    const courses = await db.collegeCourse.findAll({
      where: { collegeDepartmentId: department.collegeDepartmentId },
      transaction,
    });

    for (const course of courses) {
      await deleteClgDeptCourse(
        {
          courseId: course.courseId,
          userId: department.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

export const UniHasDeptBeforeDestroy = async (department, transaction) => {
  try {
    const employees = await db.universityEmployee.findAll({
      where: { universityDepartmentId: department.universityDepartmentId },
      transaction,
    });

    for (const employee of employees) {
      const designations = await db.universityEmployeeHasDesignation.findAll({
        where: { employeeId: employee.employeeId },
        transaction,
      });

      for (const designation of designations) {
        await deleteUniEmpHasDesignation(
          {
            employeeId: designation.employeeId,
            designationId: designation.designationId,
            userId: department.userId,
          },
          transaction
        );
      }

      await deleteUniEmployee(
        {
          employeeId: employee.employeeId,
          userId: department.userId,
        },
        transaction
      );
    }

    const courses = await db.universityCourse.findAll({
      where: { universityDepartmentId: department.universityDepartmentId },
      transaction,
    });

    for (const course of courses) {
      await deleteUniDeptCourse(
        {
          courseId: course.courseId,
          userId: department.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

export const UniEmployeeBeforeDestroy = async (employee, transaction) => {
  try {
    const designations = await db.universityEmployeeHasDesignation.findAll({
      where: { employeeId: employee.employeeId },
      transaction,
    });
    for (const designation of designations) {
      await deleteUniEmpHasDesignation(
        {
          employeeId: designation.employeeId,
          designationId: designation.designationId,
          userId: employee.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

export const ClgEmployeeBeforeDestroy = async (employee, transaction) => {
  try {
    const designations = await db.collegeEmployeeHasDesignation.findAll({
      where: { employeeId: employee.employeeId },
      transaction,
    });
    for (const designation of designations) {
      await deleteClgEmpHasDesignation(
        {
          employeeId: employee.employeeId,
          designationId: designation.designationId,
          userId: employee.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

//Industry-Company Hooks
export const IndBeforeDestroy = async (industry, transaction) => {
  try {
    const companies = await db.industryCompany.findAll({
      where: { industryId: industry.industryId },
      transaction,
    });

    for (const company of companies) {
      const departments = await db.industryCompanyHasIndustryDepartment.findAll(
        {
          where: { companyId: company.companyId },
          transaction,
        }
      );

      for (const department of departments) {
        const employees = await db.industryEmployee.findAll({
          where: { companyDepartmentId: department.departmentId },
          transaction,
        });

        for (const employee of employees) {
          const designations =
            await db.industryEmployeeHasIndustryDesignation.findAll({
              where: { employeeId: employee.employeeId },
              transaction,
            });

          for (const designation of designations) {
            await deleteIndEmpHasDes(
              {
                employeeId: designation.employeeId,
                designationId: designation.designationId,
                userId: industry.userId,
              },
              transaction
            );
          }

          await deleteIndEmp(
            {
              employeeId: employee.employeeId,
              userId: industry.userId,
            },
            transaction
          );
        }

        await deleteIndCmpHasIndCmpDept(
          {
            companyId: company.companyId,
            departmentId: department.departmentId,
            userId: industry.userId,
          },
          transaction
        );
      }

      const locations =
        await db.industryCompanyHasIndustryCompanyLocation.findAll({
          where: { companyId: company.companyId },
          transaction,
        });

      for (const loc of locations) {
        await deleteIndCmpHasCmpLoc(
          {
            companyId: company.companyId,
            locationId: loc.locationId,
            userId: industry.userId,
          },
          transaction
        );
      }

      const headquarter = await db.industryCompanyHeadQuarter.findOne({
        where: { companyId: company.companyId },
        transaction,
      });

      if (headquarter) {
        await deleteCmpHeadQt(
          {
            headQuarterId: headquarter.headQuarterId,
            companyId: company.companyId,
            userId: industry.userId,
          },
          transaction
        );
      }

      await deleteIndCmp(
        {
          companyId: company.companyId,
          userId: industry.userId,
        },
        transaction
      );
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const IndCmpBeforeDestroy = async (company, transaction) => {
  try {
    const departments = await db.industryCompanyHasIndustryDepartment.findAll({
      where: { companyId: company.companyId },
      transaction,
    });

    for (const department of departments) {
      const employees = await db.industryEmployee.findAll({
        where: { companyDepartmentId: department.departmentId },
        transaction,
      });

      for (const employee of employees) {
        const designations =
          await db.industryEmployeeHasIndustryDesignation.findAll({
            where: { employeeId: employee.employeeId },
            transaction,
          });

        for (const designation of designations) {
          await deleteIndEmpHasDes(
            {
              employeeId: designation.employeeId,
              designationId: designation.designationId,
              userId: company.userId,
            },
            transaction
          );
        }

        await deleteIndEmp(
          {
            employeeId: employee.employeeId,
            userId: company.userId,
          },
          transaction
        );
      }

      await deleteIndCmpHasIndCmpDept(
        {
          companyId: company.companyId,
          departmentId: department.departmentId,
          userId: company.userId,
        },
        transaction
      );
    }

    const locations =
      await db.industryCompanyHasIndustryCompanyLocation.findAll({
        where: { companyId: company.companyId },
        transaction,
      });

    for (const loc of locations) {
      await deleteIndCmpHasCmpLoc(
        {
          companyId: company.companyId,
          locationId: loc.locationId,
          userId: company.userId,
        },
        transaction
      );
    }

    const headquarter = await db.industryCompanyHeadQuarter.findOne({
      where: { companyId: company.companyId },
      transaction,
    });

    if (headquarter) {
      await deleteCmpHeadQt(
        {
          headQuarterId: headquarter.headQuarterId,
          companyId: company.companyId,
          userId: company.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

export const IndCmpHasCmpDeptBeforeDestroy = async (
  department,
  transaction
) => {
  try {
    const employees = await db.industryEmployee.findAll({
      where: { companyDepartmentId: department.companyDepartmentId },
      transaction,
    });

    for (const employee of employees) {
      const designations =
        await db.industryEmployeeHasIndustryDesignation.findAll({
          where: { employeeId: employee.employeeId },
          transaction,
        });

      for (const designation of designations) {
        await deleteIndEmpHasDes(
          {
            employeeId: employee.employeeId,
            designationId: designation.designationId,
            userId: department.userId,
          },
          transaction
        );
      }

      await deleteIndEmp(
        {
          employeeId: employee.employeeId,
          userId: department.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};

export const IndEmployeeBeforeDestroy = async (employee, transaction) => {
  try {
    const designations =
      await db.industryEmployeeHasIndustryDesignation.findAll({
        where: { employeeId: employee.employeeId },
        transaction,
      });
    for (const designation of designations) {
      await deleteIndEmpHasDes(
        {
          employeeId: employee.employeeId,
          designationId: designation.designationId,
          userId: employee.userId,
        },
        transaction
      );
    }
  } catch (error) {
    throw error;
  }
};
