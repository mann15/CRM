import db from "../../config/dbConfig.js";

// const UniversityCourse = db.universityCourse;

export const fetchUniCourseById = async (courseId) => {
  const data = await db.universityCourse.findAll({
    where: {
      courseId,
    },
    order: [["courseName", "ASC"]],
  });
  return data;
};

export const fetchUniCourseByName = async (courseName) => {
  const data = await db.universityCourse.findAll({
    where: {
      courseName,
    },
    order: [["courseName", "ASC"]],
  });
  return data;
};

export const fetchAllUniCourse = async () => {
  const data = await db.universityCourse.findAll({
    order: [["courseName", "ASC"]],
  });
  return data;
};

export const fetchUniCourseByUniversityId = async (universityId) => {
  const data = await db.universityCourse.findAll({
    include: [
      {
        model: db.universityHasDepartment,
        attributes: [],
        where: { universityId },
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
      [
        db.universityHasDepartment,
        db.departmentMaster,
        "departmentName",
        "ASC",
      ],
      ["courseName", "ASC"],
    ],
    raw: true,
    nest: false,
  });

  const formattedData = data.map((item) => {
    return {
      departmentName:
        item["university_has_department.department_master.departmentName"],
      courseId: item.courseId,
      courseName: item.courseName,
    };
  });

  return formattedData;
};

export const addUniCourse = async (uniCourseData) => {
  const { courseName, universityDepartmentId, userId } = uniCourseData;

  const data = await db.universityCourse.create({
    courseName,
    universityDepartmentId: universityDepartmentId,
    createdBy: userId,
  });
  return data;
};

export const updateUniCourse = async (uniCourseData) => {
  const { courseId, courseName, universityDepartmentId, userId } =
    uniCourseData;

  const data = await db.universityCourse.update(
    {
      courseName,
      universityDepartmentId: universityDepartmentId,
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

export const deleteUniCourse = async (uniCourseData) => {
  const { courseId, userId } = uniCourseData;
  const deleteUniCourseData = await db.universityCourse.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        courseId,
      },
    }
  );
  const data = await db.universityCourse.destroy({
    where: {
      courseId,
    },
  });
  return data;
};

//delete api with transaction
export const deleteUniDeptCourse = async (uniCourseData, transaction) => {
  const { courseId, userId } = uniCourseData;
  const deleteUniCourseData = await db.universityCourse.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        courseId,
      },
      transaction,
    }
  );
  const data = await db.universityCourse.destroy({
    where: {
      courseId,
    },
    transaction,
  });
  return data;
};
