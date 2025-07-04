import db from "../../config/dbConfig.js";

export const fetchClgCourseById = async (courseId) => {
  const data = await db.collegeCourse.findAll({
    where: {
      courseId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchClgCourseByName = async (courseName) => {
  const data = await db.collegeCourse.findAll({
    where: {
      courseName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchCollegeCourseByCollegeId = async (collegeId) => {
  const data = await db.collegeCourse.findAll({
    include: [
      {
        model: db.collegeHasDepartment,
        attributes: [],
        where: { collegeId },
        include: [
          {
            model: db.departmentMaster,
            attributes: ["departmentName"],
          },
        ],
      },
    ],
    attributes: ["courseId", "courseName"],
    order: [
      [db.collegeHasDepartment, db.departmentMaster, "departmentName", "ASC"],
      ["courseName", "ASC"],
    ],
    raw: true,
    nest: false,
  });

  const formattedData = data.map((item) => {
    return {
      departmentName:
        item["college_has_department.department_master.departmentName"],
      courseId: item.courseId,
      courseName: item.courseName,
    };
  });

  return formattedData;
};

export const fetchAllClgCourse = async () => {
  const data = await db.collegeCourse.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addClgCourse = async (clgCourseData) => {
  const { courseName, collegeDepartmentId, userId } = clgCourseData;

  const data = await db.collegeCourse.create({
    courseName,
    collegeDepartmentId,
    createdBy: userId,
  });
  return data;
};

export const updateClgCourse = async (clgCourseData) => {
  const { courseId, courseName, collegeDepartmentId, userId } = clgCourseData;

  const data = await db.collegeCourse.update(
    {
      courseName,
      collegeDepartmentId,
      updatedBy: userId,
    },
    {
      where: {
        courseId,
      },
    }
  );
  return data;
};

export const deleteClgCourse = async (clgCourseData) => {
  const { courseId, userId } = clgCourseData;
  const deleteClgCourseData = await db.collegeCourse.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        courseId,
      },
    }
  );
  const data = await db.collegeCourse.destroy({
    where: {
      courseId,
    },
  });
  return data;
};

//delete api with transaction
export const deleteClgDeptCourse = async (clgCourseData, transaction) => {
  const { courseId, userId } = clgCourseData;
  await db.collegeCourse.update(
    {
      deletedBy: userId,
    },
    {
      where: { courseId },
      transaction,
    }
  );

  const data = await db.collegeCourse.destroy({
    where: { courseId },
    transaction,
  });

  return data;
};
