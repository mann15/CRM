import Joi from "joi";

export const universitySchema = Joi.object({
  universityId: Joi.number().integer().messages({
    "number.base": "University ID must be a valid number.",
  }),
  universityName: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "University name must be a valid string.",
    "string.min": "University name must be at least 3 characters long.",
    "string.max": "University name must not exceed 50 characters.",
    "any.required": "University name is required.",
  }),
  universityEmail1: Joi.string()
    .email()
    .max(320)
    .optional()
    .allow("")
    .messages({
      "string.base": "University email must be a valid email format.",
      "string.email": "University email must be a valid email address.",
      "string.empty": "University email can be empty.",
      "string.max": "University email must not exceed 320 characters.",
      //remove below line if email is optional
      // "any.required":"University email is optional but must be a valid email if provided.",
    }),
  universityEmail2: Joi.string()
    .email()
    .max(320)
    .optional()
    .allow("")
    .messages({
      "string.base": "University email must be a valid email format.",
      "string.email": "University email must be a valid email address.",
      "string.empty": "University email can be empty.",
      "string.max": "University email must not exceed 320 characters.",
      //remove below line if email is optional
      // "any.required":"University email is optional but must be a valid email if provided.",
    }),
  universityPhone1: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "University phone must be a string of digits.",
      "string.length": "University phone must be exactly 10 digits long.",
      "string.pattern.base":
        "University phone must either be a 10-digit mobile number starting with 6-9 or a valid landline number in the format 'STD code-number'",
      "string.empty": "University phone can be empty.",
    }),
  universityPhone2: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "University phone must be a string of digits.",
      "string.length": "University phone must be exactly 10 digits long.",
      "string.pattern.base":
        "University phone must either be a 10-digit mobile number starting with 6-9 or a valid landline number in the format 'STD code-number'",
      "string.empty": "University phone can be empty.",
    }),
  universityPincode: Joi.number()
    .integer()
    .min(100000)
    .max(999999)
    .optional()
    .allow(null, "")
    .messages({
      "number.base": "University pincode must be a number.",
      "number.integer": "University pincode must be an integer.",
      "number.min": "University pincode must be exactly 6 digits long.",
      "number.max": "University pincode must be exactly 6 digits long.",
      "any.required": "University pincode is required.",
    }),
  universityAddress: Joi.string()
    .trim()
    .min(10)
    .max(200)
    .optional()
    .allow("")
    .messages({
      "string.base": "University address must be a valid string.",
      "string.empty": "University address can be empty.",
      "string.min": "University address must be at least 10 characters long.",
      "string.max": "University address must not exceed 200 characters.",
    }),
  universityTown: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .allow("")
    .messages({
      "string.base": "University town must be a valid string.",
      "string.min": "University town must be at least 3 characters long.",
      "string.max": "University town must not exceed 100 characters.",
      "string.empty": "University town can be empty.",
    }),
  universityVillage: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .allow("")
    .messages({
      "string.base": "University village must be a valid string.",
      "string.min": "University village must be at least 3 characters long.",
      "string.max": "University village must not exceed 100 characters.",
      "string.empty": "University village can be empty.",
    }),
  universityRemarks: Joi.string().optional().allow("").messages({
    "string.base": "University remarks must be a valid string.",
    "string.empty": "University remarks can be empty.",
  }),
  universityCity: Joi.number().integer().required().messages({
    "number.base": "University city must be a valid number.",
    "any.required": "University city is required.",
  }),
  universityState: Joi.number().integer().required().messages({
    "number.base": "University state must be a valid number.",
    "any.required": "University state is required.",
  }),
  universityCountry: Joi.number().integer().required().messages({
    "number.base": "University country must be a valid number.",
    "any.required": "University country is required.",
  }),
  universityType: Joi.number().integer().optional().allow("").messages({
    "number.base": "University type must be a valid number.",
  }),
  universityNIRF: Joi.number().integer().optional().messages({
    "number.base": "University NIRF rank must be a valid number.",
  }),
  universityNAAC: Joi.number().integer().optional().messages({
    "number.base": "University NAAC grade must be a valid number.",
  }),
});

export const collegeSchema = Joi.object({
  collegeName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.base": "College name must be a valid string.",
      "string.min": "College name must be at least 3 characters long.",
      "string.max": "College name must not exceed 50 characters.",
      "string.empty": "College name is required and cannot be empty.",
      "string.pattern.base":
        "College name must contain only alphabets and spaces.",
      "any.required": "College name is required.",
    }),
  collegeEmail1: Joi.string().email().max(320).optional().allow("").messages({
    "string.base": "College email must be a valid email format.",
    "string.email": "College email must be a valid email address.",
    "string.empty": "College email can be empty.",
    "string.max": "College email must not exceed 320 characters.",
  }),
  collegeEmail2: Joi.string().email().max(320).optional().allow("").messages({
    "string.base": "College email must be a valid email format.",
    "string.email": "College email must be a valid email address.",
    "string.empty": "College email can be empty.",
    "string.max": "College email must not exceed 320 characters.",
  }),
  collegePhone1: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "College phone must be a string of digits.",
      "string.length": "College phone must be exactly 10 digits long.",
      "string.pattern.base":
        "College phone must either be a 10-digit mobile number starting with 6-9 or a valid landline number in the format 'STD code-number'",
      "string.empty": "College phone can be empty.",
    }),
  collegePhone2: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "College phone must be a string of digits.",
      "string.length": "College phone must be exactly 10 digits long.",
      "string.pattern.base":
        "College phone must either be a 10-digit mobile number starting with 6-9 or a valid landline number in the format 'STD code-number'",
      "string.empty": "College phone can be empty.",
    }),
  collegePincode: Joi.string()
    .length(6)
    .pattern(/^[0-9]{6}$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "College pincode must be a string of digits.",
      "string.length": "College pincode must be exactly 6 digits long.",
      "string.pattern.base": "College pincode must contain only numbers.",
      "string.empty": "College pincode can be empty.",
    }),
  collegeAddress: Joi.string()
    .trim()
    .min(10)
    .max(200)
    .optional()
    .allow("")
    .messages({
      "string.base": "College address must be a valid string.",
      "string.empty": "College address can be empty.",
      "string.min": "College address must be at least 10 characters long.",
      "string.max": "College address must not exceed 200 characters.",
    }),
  collegeTown: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .allow("")
    .messages({
      "string.base": "College town must be a valid string.",
      "string.min": "College town must be at least 3 characters long.",
      "string.max": "College town must not exceed 100 characters.",
      "string.empty": "College town can be empty.",
    }),
  collegeVillage: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .allow("")
    .messages({
      "string.base": "College village must be a valid string.",
      "string.min": "College village must be at least 3 characters long.",
      "string.max": "College village must not exceed 100 characters.",
      "string.empty": "College village can be empty.",
    }),
  collegeRemarks: Joi.string().trim().optional().allow("").messages({
    "string.base": "College remarks must be a valid string.",
    "string.empty": "College remarks can be empty.",
  }),
  courseName: Joi.string().trim().min(3).max(100).allow("").messages({
    "string.base": "Course name must be a valid string.",
    "string.min": "Course name must be at least 3 characters long.",
    "string.max": "Course name must not exceed 100 characters.",
  }),
  collegeCity: Joi.number().integer().required().messages({
    "number.base": "College city must be a valid number.",
    "any.required": "College city is required.",
  }),
  collegeState: Joi.number().integer().required().messages({
    "number.base": "College state must be a valid number.",
    "any.required": "College state is required.",
  }),
  collegeCountry: Joi.number().integer().required().messages({
    "number.base": "College country must be a valid number.",
    "any.required": "College country is required.",
  }),
  typeId: Joi.number().integer().optional().allow("").messages({
    "number.base": "College type must be a valid number.",
  }),
  universityId: Joi.number().optional().allow("").messages({
    "number.base": "University ID must be a valid number.",
  }),
  collegeId: Joi.number().optional().allow("").messages({
    "number.base": "college ID must be a valid number.",
  }),
});

export const collegeDepartmentEmployeeSchema = Joi.object({
  employeeName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.base": "College Department Employee name must be a valid string.",
      "string.min":
        "College Department Employee name must be at least 3 characters long.",
      "string.max":
        "College Department Employee name must not exceed 100 characters.",
      "string.empty":
        "College Department Employee name is required and cannot be empty.",
      "string.pattern.base":
        "College Department Employee name must contain only alphabets and spaces.",
      "any.required": "College Department Employee name is required.",
    }),
  employeeEmail1: Joi.string().email().max(320).optional().allow("").messages({
    "string.base": "College Employee email must be a valid email format.",
    "string.email": "College Employee email must be a valid email address.",
    "string.max": "Employee email must not exceed 320 characters.",
    "string.empty": "College Employee email can be empty.",
  }),
  employeeEmail2: Joi.string().email().max(320).optional().allow("").messages({
    "string.base": "College Employee email must be a valid email format.",
    "string.email": "College Employee email must be a valid email address.",
    "string.max": "Employee email must not exceed 320 characters.",
    "string.empty": "College Employee email can be empty.",
  }),
  employeePhone1: Joi.string()
    .optional()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .allow("")
    .messages({
      "string.base": "College Employee phone must be a string of digits.",
      "string.length": "College Employee phone must be exactly 10 digits long.",
      "string.pattern.base":
        "College Employee phone must start with a digit between 6 and 9 and contain only numbers.",
      "string.empty": "College Employee phone can be empty.",
    }),
  employeePhone2: Joi.string()
    .optional()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .allow("")
    .messages({
      "string.base": "College Employee phone must be a string of digits.",
      "string.length": "College Employee phone must be exactly 10 digits long.",
      "string.pattern.base":
        "College Employee phone must start with a digit between 6 and 9 and contain only numbers.",
      "string.empty": "College Employee phone can be empty.",
    }),
  collegeDepartmentId: Joi.number().optional().allow("").messages({
    "number.base": "College Department ID must be a valid number.",
  }),
  employeeId: Joi.number().integer().optional().allow("").messages({
    "number.base": "College employee ID must be a valid number.",
  }),
});

export const universityEmployeeSchema = Joi.object({
  employeeName: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "University Employee name must be a valid string.",
    "string.min":
      "University Employee name must be at least 3 characters long.",
    "string.max": "University Employee name must not exceed 100 characters.",
    "any.required": "University Employee name is required.",
  }),
  employeeEmail1: Joi.string().email().max(320).optional().messages({
    "string.base": "Employee email must be a valid email format.",
    "string.email": "Employee email must be a valid email address.",
    "string.max": "Employee email must not exceed 320 characters.",
    "string.empty": "Employee email can be empty.",
  }),
  employeeEmail2: Joi.string().email().max(320).optional().messages({
    "string.base": "Employee email must be a valid email format.",
    "string.email": "Employee email must be a valid email address.",
    "string.max": "Employee email must not exceed 320 characters.",
    "string.empty": "Employee email can be empty.",
  }),
  employeePhone1: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "University Employee phone must be a string of digits.",
      "string.length":
        "University Employee phone must be exactly 10 digits long.",
      "string.pattern.base":
        "University Employee phone must start with a digit between 6 and 9 and contain only numbers.",
      "string.empty": "University Employee phone can be empty.",
    }),
  employeePhone2: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "University Employee phone must be a string of digits.",
      "string.length":
        "University Employee phone must be exactly 10 digits long.",
      "string.pattern.base":
        "University Employee phone must start with a digit between 6 and 9 and contain only numbers.",
      "string.empty": "University Employee phone can be empty.",
    }),
  universityDepartmentId: Joi.number().integer().optional().allow("").messages({
    "number.base": "University Department ID must be a valid number.",
    "number.required": "University Department ID is required.",
  }),
  employeeId: Joi.number().integer().optional().allow("").messages({
    "number.base": "university employee ID must be a valid number.",
  }),
});

export const departmentSchema = Joi.object({
  departmentName: Joi.string().trim().min(3).max(100).messages({
    "string.base": "Department name must be a valid string.",
    "string.min": "Department name must be at least 3 characters long.",
    "string.max": "Department name must not exceed 100 characters.",
  }),
  departmentId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Department ID must be a valid number.",
  }),
});

export const industrySchema = Joi.object({
  industryNameId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Industry Name ID must be a valid number.",
  }),
  industryRemarks: Joi.string().trim().optional().allow("").messages({
    "string.base": "Industry remarks must be a valid string.",
    "string.empty": "Industry remarks can be empty.",
  }),
  typeId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Industry Type ID must be a valid number.",
  }),
  industryId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Industry ID must be a valid number.",
  }),
});

export const industryNameSchema = Joi.object({
  industryName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .messages({
      "string.base": "Industry name must be a valid string.",
      "string.min": "Industry name must be at least 3 characters long.",
      "string.max": "Industry name must not exceed 100 characters.",
    }),
  industryNameId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Industry Name ID must be a valid number.",
  }),
});

export const industryCompanySchema = Joi.object({
  companyName: Joi.string().trim().min(3).max(100).messages({
    "string.base": "Company name must be a valid string.",
    "string.min": "Company name must be at least 3 characters long.",
    "string.max": "Company name must not exceed 100 characters.",
  }),
  companyPhone: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "Company phone must be a string of digits.",
      "string.length": "Company phone must be exactly 10 digits long.",
      "string.pattern.base":
        "Company phone must start with a digit between 6 and 9 and contain only numbers.",
      "string.empty": "Company phone can be empty.",
    }),
  companyEmail: Joi.string().email().max(320).optional().allow("").messages({
    "string.base": "Company email must be a valid email format.",
    "string.email": "Company email must be a valid email address.",
    "string.max": "Company email must not exceed 320 characters.",
    "string.empty": "Company email can be empty.",
  }),
  companyRemarks: Joi.string().trim().optional().allow("").messages({
    "string.base": "Company remarks must be a valid string.",
    "string.empty": "Company remarks can be empty.",
  }),
  industryId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Industry ID must be a valid number.",
    "number.required": "Industry ID is required.",
  }),
  companyId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Company ID must be a valid number.",
  }),
});

export const industryEmployeeSchema = Joi.object({
  employeeName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.base": "Industry Employee name must be a valid string.",
      "string.min":
        "Industry Employee name must be at least 3 characters long.",
      "string.max": "Industry Employee name must not exceed 100 characters.",
      "string.empty": "Industry Employee name is required and cannot be empty.",
      "string.pattern.base":
        "Industry Employee name must contain only alphabets and spaces.",
      "any.required": "Industry Employee name is required.",
    }),
  employeeEmail1: Joi.string().email().max(320).optional().allow("").messages({
    "string.base": "Industry Employee email must be a valid email format.",
    "string.email": "Industry Employee email must be a valid email address.",
    "string.max": "Industry email must not exceed 320 characters.",
    "string.empty": "Industry Employee email can be empty.",
  }),
  employeeEmail2: Joi.string().email().max(320).optional().allow("").messages({
    "string.base": "Industry Employee email must be a valid email format.",
    "string.email": "Industry Employee email must be a valid email address.",
    "string.max": "Industry email must not exceed 320 characters.",
    "string.empty": "Industry Employee email can be empty.",
  }),
  employeePhone1: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "Industry Employee phone must be a string of digits.",
      "string.length":
        "Industry Employee phone must be exactly 10 digits long.",
      "string.pattern.base":
        "Industry Employee phone must start with a digit between 6 and 9 and contain only numbers.",
      "string.empty": "Industry Employee phone can be empty.",
    }),
  employeePhone2: Joi.string()
    .length(10)
    .pattern(/^([6-9][0-9]{9}|0[0-9]{9}|[0-9]{3,5}-[0-9]{6,8})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": "Industry Employee phone must be a string of digits.",
      "string.length":
        "Industry Employee phone must be exactly 10 digits long.",
      "string.pattern.base":
        "Industry Employee phone must start with a digit between 6 and 9 and contain only numbers.",
      "string.empty": "Industry Employee phone can be empty.",
    }),
  companyDepartmentId: Joi.number().optional().allow("").messages({
    "number.base": "Industry department ID must be a valid number.",
    "number.required": "Industry  department ID is required.",
  }),
  employeeId: Joi.number().integer().optional().allow("").messages({
    "number.base": "Industry employee ID must be a valid number.",
  }),
});
