import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dropdown from "./Dropdown";
import MultiSelect from "./MultiSelect";

const EmployeeForm = ({
  onClose,
  setEmployeeData,
  employeeData,
  setDepartmentData,
  departmentData,
  isUpdate = false,
}) => {
  const { routeType } = useParams();
  const department = useSelector((state) => state.department.department);
  const selectedEmployee = useSelector(
    (state) => state.selectedData.selectedEmployeeData
  );

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [designationIds, setDesignationIds] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email1: "",
    email2: "",
    phone: "",
    phone2: "",
    department: "",
  });

  // Add state for errors
  const [errors, setErrors] = useState({
    name: false,
    email1: false,
    phone: false,
    department: false,
  });

  let Id;
  if (routeType === "industry") {
    Id = useSelector((state) => state.selectedData?.selectedData?.companyId);
  } else {
    Id = useSelector(
      (state) => state.selectedData?.selectedData?.[`${routeType}Id`]
    );
  }

  // Initialize form with selected employee data if in update mode
  useEffect(() => {
    console.log("selectedEmployee", selectedEmployee);

    if (isUpdate && selectedEmployee) {
      setFormData({
        name: selectedEmployee["Employee Name"] || "",
        email1: selectedEmployee["Primary Email"] || "",
        email2: selectedEmployee["Secondary Email"] || "",
        phone: selectedEmployee["Primary Phone"] || "",
        phone2: selectedEmployee["Secondary Phone"] || "",
        department: selectedEmployee["Department Name"] || "",
      });

      // Set initial designations
      const initialDesignations = selectedEmployee["Designations"]
        ? typeof selectedEmployee["Designations"] === "string"
          ? selectedEmployee["Designations"].split(", ")
          : Array.isArray(selectedEmployee["Designations"])
          ? selectedEmployee["Designations"]
          : []
        : [];
      setSelectedDesignations(initialDesignations);
    }
  }, [isUpdate, selectedEmployee]);

  // Existing code for formatting designations
  const formatDesignations = (designations) => {
    if (!designations) return [];
    return designations.map((designation) => ({
      value: designation,
      label: designation,
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  // Handle designation change
  const handleDesignationChange = (values) => {
    setSelectedDesignations(values);

    // Clear designation error when user makes a selection
    if (errors.designations) {
      setErrors((prev) => ({
        ...prev,
        designations: false,
      }));
    }
  };

  // Add new custom designation
  const handleAddCustomDesignation = (newDesignation) => {
    setDesignations([...designations, newDesignation.value]);
    setSelectedDesignations([...selectedDesignations, newDesignation.value]);
  };

  // Fetch Designations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/designation/all`, {
          designationType: routeType,
        });

        const designationNames = response.data.data.map(
          (item) => item.designationName
        );

        setDesignations(designationNames);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchData();
  }, [routeType]);

  // Fetch Designation IDs
  useEffect(() => {
    const fetchDesignationIds = async () => {
      if (selectedDesignations.length > 0) {
        try {
          const response = await axios.post(`/api/designation/name`, {
            designationName: selectedDesignations,
            designationType: routeType,
          });

          const ids = response.data.data.map((item) => item.designationId);
          setDesignationIds(ids);
        } catch (error) {
          console.error("Error fetching designation IDs:", error);
          // toast.error("Failed to fetch designation IDs", {
          //   autoClose: 1500,
          //   closeButton: false,
          // });
        }
      } else {
        setDesignationIds([]);
      }
    };

    fetchDesignationIds();
  }, [selectedDesignations, routeType]);

  // Fetch Departments
  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (routeType === "industry") {
        response = await axios.post(
          `/api/${routeType}/companyHasDepartment/id`,
          {
            companyId: Id,
          }
        );
      } else {
        response = await axios.post(
          `/api/${routeType}/${routeType}HasDepartment/id`,
          {
            [`${routeType}Id`]: Id,
          }
        );
      }
      setDepartments(response.data.data);
    };
    fetchData();
  }, [routeType, Id]);

  // State for Other Input Handling
  const [showOtherInputs, setShowOtherInputs] = useState({
    department: false,
  });
  const [customValues, setCustomValues] = useState({ department: "" });

  // Handle Other Selection
  const handleOtherSelection = (field, value) => {
    setShowOtherInputs((prev) => ({
      ...prev,
      [field]: value === "other",
    }));

    // Clear error when user selects "other"
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handleCustomValueChange = (field, value) => {
    setCustomValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user types in custom field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email1: !formData.email1.trim(),
      phone: !formData.phone.trim(),
      department:
        !formData.department &&
        !customValues.department &&
        !showOtherInputs.department,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Add New Department (existing implementation)
  const addNewValue = async (field) => {
    const endpoints = { department: "/api/other/department/" };
    const newValue = customValues[field]?.trim();

    if (newValue.toLowerCase() === "other" || !newValue) {
      toast.error("Provide valid " + field, { autoClose: 2000 });
      return;
    }

    if (!newValue) {
      toast.warning(`Please enter a valid ${field}!`, { autoClose: 1500 });
      return;
    }

    if (
      field === "department" &&
      Array.isArray(departments) &&
      departments.some(
        (item) =>
          item["Department Name"].toLowerCase() === newValue.toLowerCase()
      )
    ) {
      toast.warning(`Department already exists!`, { autoClose: 1500 });
      setShowOtherInputs((prev) => ({ ...prev, [field]: false }));
      handleCustomValueChange(field, "");
      return;
    }

    const payload = { [`${field}Name`]: newValue };

    try {
      const response = await axios.post(endpoints[field], payload);
      const newDepartmentId = response?.data?.data?.departmentId;

      if (!newDepartmentId) {
        throw new Error("Failed to retrieve the new department ID.");
      }
      let res;
      if (routeType !== "industry") {
        res = await axios.post(`/api/${routeType}/${routeType}HasDepartment`, {
          [`${routeType}Id`]: Id,
          departmentId: newDepartmentId,
        });
      } else {
        res = await axios.post(`/api/${routeType}/companyHasDepartment`, {
          companyId: Id,
          departmentId: newDepartmentId,
        });
      }

      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          autoClose: 1500,
          closeButton: false,
        });
        const newDepartment = {};
        newDepartment["Department Name"] = response.data.data.departmentName;

        setDepartmentData([newDepartment, ...(departmentData || [])]);
        setDepartments([newDepartment, ...(departments || [])]);
      } else {
        toast.error(res?.data?.message, {
          autoClose: 1500,
          closeButton: false,
        });
      }

      setShowOtherInputs((prev) => ({ ...prev, [field]: false }));
      setCustomValues((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      console.error(`Error adding new ${field}:`, error);
      toast.error(error.response?.data?.message || "Submission failed", {
        autoClose: 1500,
        closeButton: false,
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before processing
    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        autoClose: 1500,
        closeButton: false,
      });
      return;
    }

    const formDataObj = new FormData(e.target);
    const data = Object.fromEntries(formDataObj);

    const getSelectedValue = (field, list, nameKey, idKey) => {
      // If "other" input is shown, use custom value
      if (showOtherInputs[field]) {
        return customValues[field];
      }

      // Try to find match in list by form data
      const selectedItem = list.find(
        (item) => item[nameKey] === customValues[field]
      );

      if (selectedItem) {
        return selectedItem[idKey];
      }

      // Fallback to original selected employee value
      const originalValue = selectedEmployee[nameKey];
      const originalItem = list.find((item) => item[nameKey] === originalValue);

      return originalItem ? originalItem[idKey] : null;
    };

    const value = routeType === "industry" ? "company" : routeType;

    const employee = {
      employeeId: selectedEmployee?.employeeId, // Add employeeId for update
      employeeName: data.name,
      employeeEmail1: data.email1,
      employeeEmail2: data.email2,
      employeePhone1: data.phone,
      employeePhone2: data.phone2,
      [`${value}DepartmentId`]: getSelectedValue(
        "department",
        departments,
        "Department Name",
        `${value}DepartmentId`
      ),
      designationId: designationIds,
    };

    try {
      let response;
      console.log("employee", employee);

      if (isUpdate && selectedEmployee?.employeeId) {
        // Update existing employee
        response = await axios.put(
          `/api/${routeType}/employee/batch`,
          employee
        );
      } else {
        // Create new employee
        response = await axios.post(
          `/api/${routeType}/employee/batch`,
          employee
        );
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message, {
          autoClose: 1500,
          closeButton: false,
        });

        const newEmp = {};
        newEmp["Employee Name"] = data.name;
        newEmp["employeeId"] = isUpdate
          ? selectedEmployee.employeeId
          : response.data.data.employeeId;
        newEmp["Primary Email"] = data?.email1;
        newEmp["Secondary Email"] = data?.email2;
        newEmp["Primary Phone"] = data?.phone;
        newEmp["Secondary Phone"] = data?.phone2;
        newEmp["Department Name"] = departments.find(
          (item) =>
            item[`${value}DepartmentId`] === employee[`${value}DepartmentId`]
        )["Department Name"];
        newEmp["Designations"] = selectedDesignations;

        console.log("newEmp", newEmp);

        // Update employee data in the parent component
        if (isUpdate) {
          // Update existing employee in the list
          // setEmployeeData((prevData) =>
          //   prevData.map((emp) =>
          //     emp.employeeId === newEmp.employeeId ? newEmp : emp
          //   )
          // );
        } else {
          // Add new employee to the list
          setEmployeeData([newEmp, ...(employeeData || [])]);
        }

        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error(response?.data?.message, {
          autoClose: 1500,
          closeButton: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message, {
        autoClose: 1500,
        closeButton: false,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <h2 className="text-base font-semibold text-black mb-4">
            {isUpdate ? "Update Employee Details:" : "Employee Details:"}
          </h2>

          <div className="flex items-center gap-4">
            <label
              htmlFor="name"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Name
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Employee Name"
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500" id="name-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="email1"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Primary Email
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <input
                id="email1"
                name="email1"
                type="email"
                value={formData.email1}
                onChange={handleInputChange}
                placeholder="Primary Email"
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.email1
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.email1}
              />
              {errors.email1 && (
                <p className="mt-1 text-sm text-red-500" id="email1-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="email2"
              className="text-sm font-medium text-black w-1/3"
            >
              Secondary Email
            </label>
            <input
              id="email2"
              name="email2"
              type="email"
              value={formData.email2}
              onChange={handleInputChange}
              placeholder="Secondary Email"
              className="flex-1 block w-full rounded-md border border-[var(--label-broder-color)] px-3 py-2 text-sm"
            />
          </div>

          <Dropdown
            field={"department"}
            options={departments}
            labelText={"Department"}
            nameKey={"Department Name"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            showOtherInputs={showOtherInputs}
            addNewValue={addNewValue}
            errors={errors}
            defaultValue={formData.department}
            required={true}
          />

          <div className="flex items-center gap-4">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Primary Contact
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Primary Phone Number"
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.phone}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500" id="phone-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="phone2"
              className="text-sm font-medium text-black w-1/3"
            >
              Secondary Contact
            </label>
            <input
              id="phone2"
              name="phone2"
              type="tel"
              value={formData.phone2}
              onChange={handleInputChange}
              placeholder="Secondary Phone Number"
              className="flex-1 block w-full rounded-md border border-[var(--label-broder-color)] px-3 py-2 text-sm"
            />
          </div>

          <h2 className="text-base font-semibold text-black mb-4">
            Designation Details:
          </h2>
          <div className="flex items-center gap-4">
            <label
              htmlFor="designation"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Designation
            </label>
            <div className="flex-1 relative">
              <MultiSelect
                options={formatDesignations(designations)}
                selectedValues={selectedDesignations}
                onChange={handleDesignationChange}
                placeholder="Select designations..."
                employeeId={isUpdate ? selectedEmployee?.employeeId : null}
                onAddCustomValue={handleAddCustomDesignation}
              />
            </div>
          </div>
        </div>
        <div className="bg-white py-2 border-t flex justify-end sticky bottom-0 z-10">
          <button
            type="submit"
            className="text-sm font-semibold text-white bg-[var(--email-color)] px-3 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            {isUpdate ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
