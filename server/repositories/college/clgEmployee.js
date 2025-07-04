import db from "../../config/dbConfig.js";

export const fetchClgEmployeeById = async (employeeId) => {
  const data = await db.collegeEmployee.findAll({
    where: {
      employeeId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchEmpData = async (collegeId) => {
  const data = await db.collegeEmployee.findAll({
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
      {
        model: db.collegeEmployeeHasDesignation,
        attributes: ["designationId"],
        include: [
          {
            model: db.collegeDesignation,
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
            item["college_has_department.department_master.departmentName"],
          Designations: [],
        };
      }
      acc[item.employeeId].Designations.push(
        item[
          "college_department_employee_has_desginations.college_designation.designationName"
        ]
      );
      return acc;
    }, {})
  );

  return formattedData;
};

export const fetchClgEmployeeByName = async (employeeName) => {
  const data = await db.collegeEmployee.findAll({
    where: {
      employeeName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchAllClgEmployee = async () => {
  const data = await db.collegeEmployee.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchClgEmployeeByLimit = async ({ limit, offset }) => {
  const data = await db.collegeEmployee.findAll({
    limit,
    offset,
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addClgEmployee = async (clgEmployeeData) => {
  const { employeeName, userId, collegeDepartmentId } = clgEmployeeData;
  const employeeEmail1 = clgEmployeeData.employeeEmail1 || null;
  const employeeEmail2 = clgEmployeeData.employeeEmail2 || null;
  const employeePhone1 = clgEmployeeData.employeePhone1 || null;
  const employeePhone2 = clgEmployeeData.employeePhone2 || null;

  const data = await db.collegeEmployee.create({
    employeeName,
    employeeEmail1,
    employeeEmail2,
    employeePhone1,
    employeePhone2,
    collegeDepartmentId,
    createdBy: userId,
  });
  return data;
};

export const addClgEmployeeBatch = async (clgEmployeeData, transaction) => {
  const { employeeName, userId, collegeDepartmentId } = clgEmployeeData;
  const employeeEmail1 = clgEmployeeData.employeeEmail1 || null;
  const employeeEmail2 = clgEmployeeData.employeeEmail2 || null;
  const employeePhone1 = clgEmployeeData.employeePhone1 || null;
  const employeePhone2 = clgEmployeeData.employeePhone2 || null;

  const data = await db.collegeEmployee.create(
    {
      employeeName,
      employeeEmail1,
      employeeEmail2,
      employeePhone1,
      employeePhone2,
      collegeDepartmentId,
      createdBy: userId,
    },
    { transaction }
  );
  return data;
};

export const updateClgEmployee = async (clgEmployeeData) => {
  const { employeeName, collegeDepartmentId, employeeId, userId } =
    clgEmployeeData;

  const dataToUpdate = {
    employeeName,
    collegeDepartmentId,
    updatedBy: userId,
  };

  if (clgEmployeeData.employeePhone1) {
    dataToUpdate.employeePhone1 = clgEmployeeData.employeePhone1;
  }
  if (clgEmployeeData.employeePhone2) {
    dataToUpdate.employeePhone2 = clgEmployeeData.employeePhone2;
  }
  if (clgEmployeeData.employeeEmail1) {
    dataToUpdate.employeeEmail1 = clgEmployeeData.employeeEmail1;
  }
  if (clgEmployeeData.employeeEmail2) {
    dataToUpdate.employeeEmail2 = clgEmployeeData.employeeEmail2;
  }

  const data = await db.collegeEmployee.update(dataToUpdate, {
    where: {
      employeeId,
    },
  });

  return data;
};

export const updateClgEmployeeBatch = async (clgEmployeeData, transaction) => {
  const { employeeName, collegeDepartmentId, employeeId, userId } =
    clgEmployeeData;

  const dataToUpdate = {
    employeeName,
    collegeDepartmentId,
    updatedBy: userId,
  };

  if (clgEmployeeData.employeePhone1) {
    dataToUpdate.employeePhone1 = clgEmployeeData.employeePhone1;
  }
  if (clgEmployeeData.employeePhone2) {
    dataToUpdate.employeePhone2 = clgEmployeeData.employeePhone2;
  }
  if (clgEmployeeData.employeeEmail1) {
    dataToUpdate.employeeEmail1 = clgEmployeeData.employeeEmail1;
  }
  if (clgEmployeeData.employeeEmail2) {
    dataToUpdate.employeeEmail2 = clgEmployeeData.employeeEmail2;
  }

  const data = await db.collegeEmployee.update(dataToUpdate, {
    where: {
      employeeId,
    },
    transaction,
  });

  return data;
};

export const deleteClgEmployee = async (clgEmployeeData, transaction) => {
  const { employeeId, userId } = clgEmployeeData;
  const deleteClgEmployeeData = await db.collegeEmployee.update(
    {
      deletedBy: userId,
    },
    {
      where: {
        employeeId,
      },
      transaction,
    }
  );
  const data = await db.collegeEmployee.destroy({
    where: { employeeId },
    transaction,
  });
  return data;
};
