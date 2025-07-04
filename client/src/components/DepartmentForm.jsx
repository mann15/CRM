import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const DepartmentForm = ({
  onClose,
  setDepartmentData,
  departmentData,
  isUpdate = false,
}) => {
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const { routeType } = useParams();
  const selectedDepartment = useSelector(
    (state) => state.selectedData.selectedDepartmentData
  );
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {

    if (isUpdate && selectedDepartment) {
      console.log("selectedDepartment", selectedDepartment);
      
      setFormData({
        name: selectedDepartment["Department Name"] || "",
      });
    }
  }, [isUpdate, selectedDepartment]);

  let Id;
  if (routeType === "industry") {
    Id = useSelector((state) => state.selectedData?.selectedData?.companyId);
  } else {
    Id = useSelector(
      (state) => state.selectedData?.selectedData?.[`${routeType}Id`]
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataObj = new FormData(event.target);
    const data = Object.fromEntries(formDataObj);

    if (!data.name.trim() || data.name.length < 3) {
      setIsError(true);
      return;
    }
    setIsError(false);

      let departmentResponse, linkedResponse;
      if (!isUpdate) {
        departmentResponse = await axios.post("/api/other/department", {
          departmentName: data.name,
        });

        console.log("departmentResponse", departmentResponse);
        
        const newDepartmentId = departmentResponse?.data?.data?.departmentId;
        if (!newDepartmentId) {
          throw new Error("Failed to retrieve the new department ID.");
        }

        if (routeType !== "industry") {
          linkedResponse = await axios.post(
            `/api/${routeType}/${routeType}HasDepartment`,
            {
              [`${routeType}Id`]: Id,
              departmentId: newDepartmentId,
            }
          );
        } else {
          linkedResponse = await axios.post(
            `/api/${routeType}/companyHasDepartment`,
            {
              companyId: Id,
              departmentId: newDepartmentId,
            }
          );
        }

        if (
          departmentResponse?.data?.success &&
          linkedResponse?.data?.success
        ) {
          const newDept = {
            "Department Name": departmentResponse.data.data.departmentName,
            "departmentId": newDepartmentId,
            [`${routeType}DepartmentId`]: linkedResponse.data.data[`${routeType}DepartmentId`],
            companyDepartmentId: linkedResponse.data.data.companyDepartmentId,
          };

          toast.success(departmentResponse?.data?.message, {
            autoClose: 1500,
            closeButton: false,
          });

          setName("");
          setIsError(false);
          setDepartmentData([newDept, ...(departmentData || [])]);

          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          throw new Error(
            departmentResponse?.data?.message || linkedResponse?.data?.message
          );
        }
      } else {
        
        departmentResponse = await axios.put("/api/other/department", {
          departmentName: data.name,
          departmentId: selectedDepartment["departmentId"],
        });

console.log("departmentResponse", departmentResponse);


        if (departmentResponse?.data?.success) {
          toast.success(departmentResponse?.data?.message, {
            autoClose: 1500,
            closeButton: false,
          });

console.log("departmentData", departmentData);

          // const updatedDepartmentData = departmentData.map((dept) =>
          //   dept["departmentId"] === selectedDepartment["departmentId"]
          //     ? { ...dept, "Department Name": data.name }
          //     : dept
          // );

          // setDepartmentData(updatedDepartmentData);

          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          throw new Error(departmentResponse?.data?.message);
        }
      }
   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ( value.length > 3) {
      setIsError(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <h2 className="text-base font-semibold text-black mb-4">
            Department Details:
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
                placeholder="Enter department name"
                value={formData.name}
                minLength={3}
                onChange={handleInputChange}
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  isError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={isError}
              />
              {isError && (
                <p className="mt-1 text-sm text-red-500" id="name-error">
                  Must be at least 3 characters and not empty.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white py-2 border-t flex justify-end sticky bottom-0 z-10">
          <button
            type="submit"
            className="text-sm font-semibold text-white bg-[var(--email-color)] px-3 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default DepartmentForm;
