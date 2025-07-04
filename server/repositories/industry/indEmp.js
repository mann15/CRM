import db from "../../config/dbConfig.js";

export const fetchAllIndEmp = async () => {
  const data = await db.industryEmployee.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchIndEmpById = async (employeeId) => {
  const data = await db.industryEmployee.findAll({
    where: {
      employeeId,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const fetchEmpByCompanyId = async (companyId) => {
  const data = await db.industryEmployee.findAll({
    include: [
      {
        model: db.industryCompanyHasIndustryDepartment,
        attributes: [],
        where: { companyId },
        include: [
          {
            model: db.departmentMaster,
            attributes: ["departmentName"],
          },
        ],
      },
      {
        model: db.industryEmployeeHasIndustryDesignation,
        attributes: ["designationId"],
        include: [
          {
            model: db.industryDesignation,
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
            item[
              "industry_company_has_industry_department.department_master.departmentName"
            ],
          Designations: [],
        };
      }
      acc[item.employeeId].Designations.push(
        item[
          "industry_employee_has_industry_designations.industry_designation.designationName"
        ]
      );
      return acc;
    }, {})
  );

  return formattedData;
};

export const fetchIndEmpByName = async (employeeName) => {
  const data = await db.industryEmployee.findAll({
    where: {
      employeeName,
    },
    order: [["updatedAt", "DESC"]],
  });
  return data;
};

export const addIndEmp = async (indEmpData) => {
  const { employeeName, userId, companyDepartmentId } = indEmpData;
  const employeeEmail1 = indEmpData.employeeEmail1 || null;
  const employeeEmail2 = indEmpData.employeeEmail2 || null;
  const employeePhone1 = indEmpData.employeePhone1 || null;
  const employeePhone2 = indEmpData.employeePhone2 || null;

  const data = await db.industryEmployee.create({
    employeeName,
    employeeEmail1,
    employeeEmail2,
    employeePhone1,
    employeePhone2,
    companyDepartmentId,
    createdBy: userId,
  });
  return data;
};

export const addIndEmpBatch = async (indEmpData, transaction) => {
  const { employeeName, userId, companyDepartmentId } = indEmpData;
  const employeeEmail1 = indEmpData.employeeEmail1 || null;
  const employeeEmail2 = indEmpData.employeeEmail2 || null;
  const employeePhone1 = indEmpData.employeePhone1 || null;
  const employeePhone2 = indEmpData.employeePhone2 || null;

  const data = await db.industryEmployee.create(
    {
      employeeName,
      employeeEmail1,
      employeeEmail2,
      employeePhone1,
      employeePhone2,
      companyDepartmentId,
      createdBy: userId,
    },
    { transaction }
  );
  return data;
};

export const updateIndEmp = async (indEmpData) => {
  const { employeeId, employeeName, userId, companyDepartmentId } = indEmpData;

  const dataToUpdate = {
    employeeName,
    companyDepartmentId,
    updatedBy: userId,
  };

  if (indEmpData.employeePhone1) {
    dataToUpdate.employeePhone1 = indEmpData.employeePhone1;
  }
  if (indEmpData.employeePhone2) {
    dataToUpdate.employeePhone2 = indEmpData.employeePhone2;
  }
  if (indEmpData.employeeEmail1) {
    dataToUpdate.employeeEmail1 = indEmpData.employeeEmail1;
  }
  if (indEmpData.employeeEmail2) {
    dataToUpdate.employeeEmail2 = indEmpData.employeeEmail2;
  }

  const data = await db.industryEmployee.update(dataToUpdate, {
    where: {
      employeeId,
    },
  });

  return data;
};

export const updateIndEmpBatch = async (indEmpData, transaction) => {
  const { employeeId, employeeName, userId, companyDepartmentId } = indEmpData;

  const dataToUpdate = {
    employeeName,
    companyDepartmentId,
    updatedBy: userId,
  };

  if (indEmpData.employeePhone1) {
    dataToUpdate.employeePhone1 = indEmpData.employeePhone1;
  }
  if (indEmpData.employeePhone2) {
    dataToUpdate.employeePhone2 = indEmpData.employeePhone2;
  }
  if (indEmpData.employeeEmail1) {
    dataToUpdate.employeeEmail1 = indEmpData.employeeEmail1;
  }
  if (indEmpData.employeeEmail2) {
    dataToUpdate.employeeEmail2 = indEmpData.employeeEmail2;
  }

  const data = await db.industryEmployee.update(dataToUpdate, {
    where: {
      employeeId,
    },
    transaction,
  });

  return data;
};

export const deleteIndEmp = async (indEmpData, transaction) => {
  const { employeeId, userId } = indEmpData;
  // Update deletedBy within the transaction
  await db.industryEmployee.update(
    { deletedBy: userId },
    { where: { employeeId }, transaction }
  );
  const data = await db.industryEmployee.destroy({
    where: { employeeId },
    transaction,
  });
  return data;
};
