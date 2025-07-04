import db from "../../config/dbConfig.js";

// const UniEmployee = db.universityEmployee;

export const fetchUniEmployeeById = async (employeeId) => {
  const data = await db.universityEmployee.findAll({
    where: {
      employeeId: employeeId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchUniEmployeeByName = async (employeeName) => {
  const data = await db.universityEmployee.findAll({
    where: {
      employeeName: employeeName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllUniEmployee = async () => {
  const data = await db.universityEmployee.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchUniEmployeeByUniversityId = async (universityId) => {
  const data = await db.universityEmployee.findAll({
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
      {
        model: db.universityEmployeeHasDesignation,
        attributes: ["designationId"],
        include: [
          {
            model: db.universityDesignation,
            attributes: ["designationName"],
          },
        ],
      },
    ],
    order: [["employeeName", "ASC"]],
    raw: true,
    nest: false,
  });

  const formattedData = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.employeeId]) {
        acc[item.employeeId] = {
          employeeId: item.employeeId,
          "Employee Name": item.employeeName,
          "Primary Email": item.employeeEmail1,
          "Secondary Email": item.employeeEmail2,
          "Primary Phone": item.employeePhone1,
          "Secondary Phone": item.employeePhone2,
          "Department Name":
            item["university_has_department.department_master.departmentName"],
          Designations: [],
        };
      }
      acc[item.employeeId].Designations.push(
        item[
          "university_employee_has_designations.university_designation.designationName"
        ]
      );
      return acc;
    }, {})
  );

  return formattedData;
};

export const fetchUniEmployeeByLimit = async ({ limit, offset }) => {
  const data = await db.universityEmployee.findAll({
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addUniEmployee = async (uniEmployeeData) => {
  const { employeeName, userId, universityDepartmentId } = uniEmployeeData;
  const employeeEmail1 = uniEmployeeData.employeeEmail1 || null;
  const employeeEmail2 = uniEmployeeData.employeeEmail2 || null;
  const employeePhone1 = uniEmployeeData.employeePhone1 || null;
  const employeePhone2 = uniEmployeeData.employeePhone2 || null;

  const data = await db.universityEmployee.create({
    employeeName: employeeName,
    employeeEmail1,
    employeeEmail2,
    employeePhone1,
    employeePhone2,
    universityDepartmentId,
    createdBy: userId,
  });
  return data;
};

export const addUniEmployeeBatch = async (uniEmployeeData, transaction) => {
  const { employeeName, userId, universityDepartmentId } = uniEmployeeData;
  const employeeEmail1 = uniEmployeeData.employeeEmail1 || null;
  const employeeEmail2 = uniEmployeeData.employeeEmail2 || null;
  const employeePhone1 = uniEmployeeData.employeePhone1 || null;
  const employeePhone2 = uniEmployeeData.employeePhone2 || null;

  const data = await db.universityEmployee.create({
    employeeName: employeeName,
    employeeEmail1,
    employeeEmail2,
    employeePhone1,
    employeePhone2,
    universityDepartmentId,
    createdBy: userId,
    transaction,
  });
  return data;
};

export const updateUniEmployee = async (uniEmployeeData) => {
  const { employeeName, universityDepartmentId, employeeId, userId } =
    uniEmployeeData;

  const dataToUpdate = {
    employeeName,
    universityDepartmentId,
    updatedBy: userId,
  };

  if (uniEmployeeData.employeePhone1) {
    dataToUpdate.employeePhone1 = uniEmployeeData.employeePhone1;
  }
  if (uniEmployeeData.employeePhone2) {
    dataToUpdate.employeePhone2 = uniEmployeeData.employeePhone2;
  }
  if (uniEmployeeData.employeeEmail1) {
    dataToUpdate.employeeEmail1 = uniEmployeeData.employeeEmail1;
  }
  if (uniEmployeeData.employeeEmail2) {
    dataToUpdate.employeeEmail2 = uniEmployeeData.employeeEmail2;
  }

  const data = await db.universityEmployee.update(dataToUpdate, {
    where: {
      employeeId: employeeId,
    },
  });

  return data;
};

export const updateUniEmployeeBatch = async (uniEmployeeData, transaction) => {
  const { employeeName, universityDepartmentId, employeeId, userId } =
    uniEmployeeData;

  const dataToUpdate = {
    employeeName,
    universityDepartmentId,
    updatedBy: userId,
  };

  if (uniEmployeeData.employeePhone1) {
    dataToUpdate.employeePhone1 = uniEmployeeData.employeePhone1;
  }
  if (uniEmployeeData.employeePhone2) {
    dataToUpdate.employeePhone2 = uniEmployeeData.employeePhone2;
  }
  if (uniEmployeeData.employeeEmail1) {
    dataToUpdate.employeeEmail1 = uniEmployeeData.employeeEmail1;
  }
  if (uniEmployeeData.employeeEmail2) {
    dataToUpdate.employeeEmail2 = uniEmployeeData.employeeEmail2;
  }

  const data = await db.universityEmployee.update(dataToUpdate, {
    where: {
      employeeId: employeeId,
    },
    transaction,
  });

  return data;
};

export const deleteUniEmployee = async (uniEmployeeData, transaction) => {
  const { employeeId, userId } = uniEmployeeData;
  const deleteUniEmployeeDetails = await db.universityEmployee.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        employeeId: employeeId,
      },
      transaction,
    }
  );
  const data = await db.universityEmployee.destroy({
    where: { employeeId },
    transaction,
  });
  return data;
};
