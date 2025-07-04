import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserForm = ({ onClose, isUpdate = false }) => {
  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);

  const [isUserAccessOpen, setIsUserAccessOpen] = useState(false);

  const { routeType } = useParams();
  const Id = useSelector(
    (state) => state.selectedData?.selectedData?.[`${routeType}Id`]
  );
  const selectedUser = useSelector((state) => state.selectedData?.selectedData);

  const [formData, setFormData] = useState({
    employeeId: "",
    userName: "",
    userType: "",
    userAccess: "",
    userEmail: "",
    userPassword: "",
    userStatus: "active",
  });

  // Add errors state for validation
  const [errors, setErrors] = useState({
    employeeId: false,
    userName: false,
    userType: false,
    userAccess: false,
    userEmail: false,
    userPassword: false,
  });

  // User type options
  const userTypeOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  // User access options
  const userAccessOptions = [
    { value: "r-w-u-d", label: "Read-Write-Update-Delete" },
    { value: "r", label: "Read only" },
    { value: "r-w", label: "Read-Write" },
    { value: "r-w-u", label: "Read-Write-Update" },
  ];

  useEffect(() => {
    // Initialize form with selected user data if in update mode
    if (isUpdate && selectedUser) {
      setFormData({
        employeeId: selectedUser.userEmployeeId || "",
        userName: selectedUser.userName || "",
        userType: selectedUser.userType || "",
        userAccess: selectedUser.userAccess || "",
        userEmail: selectedUser.userEmail || "",
        userPassword: selectedUser.userPassword || "",
        userStatus: selectedUser.userStatus || "active",
      });
    }
  }, [isUpdate, selectedUser]);

  const validateForm = () => {
    const newErrors = {
      employeeId: !formData.employeeId,
      userName: !formData.userName.trim(),
      userType: !formData.userType,
      userAccess: !formData.userAccess,
      userEmail:
        !formData.userEmail.trim() || !validateEmail(formData.userEmail),
      userPassword: !isUpdate && !formData.userPassword.trim(),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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
      toast.error("Please fill in all required fields correctly", {
        autoClose: 2000,
        closeButton: false,
      });
      return;
    }

    const userData = {
      userEmployeeId: parseInt(formData.employeeId),
      userName: formData.userName,
      userType: formData.userType,
      userAccess: formData.userAccess,
      userStatus: formData.userStatus,
      userEmail: formData.userEmail,
      userPassword: formData.userPassword || undefined,
    };

    if (isUpdate) {
      userData.userId = selectedUser?.userId;
    }

    try {
      let response;

      if (isUpdate && selectedUser?.userId) {
        response = await axios.put(`/api/other/user`, userData);
      } else {
        response = await axios.post(`/api/other/user`, userData);
      }

      if (response?.data?.success) {
        // if (!isUpdate) {
        //   setUserData([userData, ...(userData || [])]);
        // }

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
            {isUpdate ? "Update User Details:" : "User Details:"}
          </h2>
          {/* Employee ID */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="employeeId"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Employee ID
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <input
                id="employeeId"
                name="employeeId"
                type="number"
                value={formData.employeeId}
                onChange={handleInputChange}
                placeholder="Employee ID"
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.employeeId
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.employeeId}
              />
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-500" id="employeeId-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>
          {/* User Name */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="userName"
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
                id="userName"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="User Name"
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.userName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.userName}
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-500" id="userName-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>
          {/* User Type */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="userType"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              User Type
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <div
                className={`block w-full rounded-md border px-3 py-2 text-sm bg-white ${
                  errors.userType
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                onClick={() => setIsUserTypeOpen(!isUserTypeOpen)}
              >
                {formData.userType || "Select User Type"}
              </div>
              {isUserTypeOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--label-broder-color)] rounded-md shadow-md">
                  <ul className="max-h-60 overflow-y-auto">
                    {userTypeOptions.map((option) => (
                      <li
                        key={option.value}
                        className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            userType: option.value,
                          });
                          setIsUserTypeOpen(false);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {errors.userType && (
                <p className="mt-1 text-sm text-red-500" id="userType-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>

          {/* User Access */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="userAccess"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Access Level
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <div
                className={`block w-full rounded-md border px-3 py-2 text-sm bg-white ${
                  errors.userAccess
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                onClick={() => setIsUserAccessOpen(!isUserAccessOpen)}
              >
                {formData.userAccess || "Select Access Level"}
              </div>
              {isUserAccessOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--label-broder-color)] rounded-md shadow-md">
                  <ul className="max-h-60 overflow-y-auto">
                    {userAccessOptions.map((option) => (
                      <li
                        key={option.value}
                        className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            userAccess: option.value,
                          });
                          setIsUserAccessOpen(false);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {errors.userAccess && (
                <p className="mt-1 text-sm text-red-500" id="userAccess-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>
          {/* User Email */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="userEmail"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Email
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="Email Address"
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.userEmail
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.userEmail}
              />
              {errors.userEmail && (
                <p className="mt-1 text-sm text-red-500" id="userEmail-error">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>
          {/* User Password */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="userPassword"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Password
              {!isUpdate && (
                <>
                  <span className="text-red-500 ml-1" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">required</span>
                </>
              )}
            </label>
            <div className="flex-1 relative">
              <input
                id="userPassword"
                name="userPassword"
                type="password"
                value={formData.userPassword}
                onChange={handleInputChange}
                placeholder={
                  isUpdate ? "Leave blank to keep current password" : "Password"
                }
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.userPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required={!isUpdate}
                aria-invalid={errors.userPassword}
              />
              {errors.userPassword && (
                <p
                  className="mt-1 text-sm text-red-500"
                  id="userPassword-error"
                >
                  This field is required.
                </p>
              )}
            </div>
          </div>
          {/* User Status */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="userStatus"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Status
            </label>
            <div className="flex-1 relative">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    id="active"
                    name="userStatus"
                    type="radio"
                    value="active"
                    checked={formData.userStatus === "active"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="inactive"
                    name="userStatus"
                    type="radio"
                    value="inactive"
                    checked={formData.userStatus === "inactive"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="inactive"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </div>
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

export default UserForm;
