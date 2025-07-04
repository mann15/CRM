import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dropdown from "./Dropdown";
import { useParams } from "react-router-dom";

const CourseForm = ({
  onClose,
  setCourseData,
  courseData,
  departmentData,
  setDepartmentData,
  isUpdate = false,
}) => {
  const { routeType } = useParams();
  const [departments, setDepartments] = useState([]);
  const Id = useSelector(
    (state) => state.selectedData?.selectedData?.[`${routeType}Id`]
  );
  const selectedCourse = useSelector(
    (state) => state.selectedData.selectedCourseData
  );

  const [formData, setFormData] = useState({
    name: "",
    department: "",
  });

  // Add errors state for validation
  const [errors, setErrors] = useState({
    name: false,
    department: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `/api/${routeType}/${routeType}HasDepartment/id`,
        {
          [`${routeType}Id`]: Id,
        }
      );
      setDepartments(response.data.data);
    };
    fetchData();

    if (isUpdate && selectedCourse) {
      setFormData({
        name: selectedCourse["courseName"] || "",
        department: selectedCourse["departmentName"] || "",
      });
    }
  }, [isUpdate, selectedCourse]);

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      department:
        !formData.department &&
        !customValues.department &&
        !showOtherInputs.department,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        autoClose: 2000,
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

      // Fallback to original selected course value
      const originalValue =
        selectedCourse[field === "department" ? "departmentName" : "courses"];

      const originalItem = list.find((item) => item[nameKey] === originalValue);

      return originalItem ? originalItem[idKey] : null;
    };

    const course = {
      courseId: selectedCourse?.courseId,
      courseName: data.name,
      [`${routeType}DepartmentId`]: getSelectedValue(
        "department",
        departments,
        "Department Name",
        `${routeType}DepartmentId`
      ),
    };
console.log("course", course);

    try {
      let response;

      if (isUpdate && selectedCourse?.courseId) {
        response = await axios.put(
          `/api/${routeType}/${routeType}Course`,
          course
        );
      } else {
        response = await axios.post(
          `/api/${routeType}/${routeType}Course`,
          course
        );
      }
      console.log("response", response);

      if (response?.data?.success) {
        const newCourse = {};
        newCourse["departmentName"] = departments.find(
          (item) =>
            item[`${routeType}DepartmentId`] ===
            course[`${routeType}DepartmentId`]
        )["Department Name"];
        newCourse["courseName"] = data.name;
        newCourse["courseId"] = response.data.data.courseId;
        console.log("newCourse", newCourse, response);

        if (isUpdate) {
        } else {
          setCourseData([newCourse, ...(courseData || [])]);
        }
        console.log("newCourse", newCourse, response);
        

        toast.success(response?.data?.message, {
          autoClose: 1500,
          closeButton: false,
        });
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
      toast.error(error.response?.data?.message || "Submission failed", {
        autoClose: 1500,
        closeButton: false,
      });
    }
  };

  const [showOtherInputs, setShowOtherInputs] = useState({ department: false });
  const [customValues, setCustomValues] = useState({ department: "" });

  const handleOtherSelection = (field, value) => {
    setShowOtherInputs((prev) => ({
      ...prev,
      [field]: value === "other",
    }));

    // Clear error when user makes a selection
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

    // Clear error when user starts typing in custom field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

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
          item["Department Name"].trim().toLowerCase() ===
          newValue.toLowerCase()
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

        console.log("response", res);
        
        const newDepartment = {};
        newDepartment["Department Name"] = response.data.data.departmentName;
        newDepartment[`${routeType}DepartmentId`] = res.data.data[`${routeType}DepartmentId`];
        newDepartment.companyId = res.data.data.companyDepartmentId;
// console.log("newDepartment", newDepartment);

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

  return (
    <>
      <ToastContainer />
      <form
        className="flex flex-col min-h-[400px]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
          <h2 className="text-base font-semibold text-black mb-4">
            {isUpdate ? "Update Course Details:" : "Course Details:"}
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
                placeholder="Course Name"
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
          {
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
          }
        </div>
        <div className="bg-white py-2 border-t flex justify-end sticky bottom-0 z-10">
          <button
            type="submit"
            className="text-sm font-semibold text-white bg-blue-500 px-3 py-2 rounded-md"
          >
            {isUpdate ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CourseForm;
