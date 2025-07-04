import React, { useState } from "react";
import Button from "./Button";
import { Pencil, Plus } from "lucide-react";
import Modal from "./CustomModal";
import CourseForm from "./CourseForm";
import DepartmentForm from "./DepartmentForm";
import EmployeeForm from "./EmployeeForm";
import CollegeForm from "./CollegeForm";
import UniversityForm from "./UniversityForm";
import CompanyForm from "./CompanyForm";
import { useSelector } from "react-redux";

const TabTrigger = ({ value, activeTab, onClick, children }) => (
  <button
    className={`py-1 px-3 xs:px-1 xm:px-3 text-left cursor-pointer transition-all duration-400 ease-in-out ${
      activeTab === value
        ? "bg-[var(--input-color)] shadow font-medium rounded-full"
        : "hover:bg-gray-100 rounded-full"
    } text-xs sm:text-sm lg:text-base max-w-xs`}
    onClick={() => onClick(value)}
  >
    {children}
  </button>
);

const TopSlider = ({
  activeTab,
  setActiveTab,
  setDepartmentData,
  departmentData,
  setCourseData,
  courseData,
  setEmployeeData,
  employeeData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailPage, setIsDetailPage] = useState(true);
  const userAcess = useSelector((state) => state.auth.userAccess);

  const isIndustryPage = location.pathname.includes("/industry");

  const renderForm = () => {
    switch (activeTab) {
      case "details":
        if (location.pathname === "/college/details") {
          return <CollegeForm isUpdate={isDetailPage} />;
        } else if (location.pathname === "/university/details") {
          return <UniversityForm isUpdate={isDetailPage} />;
        } else if (location.pathname === "/industry/details") {
          return <CompanyForm isUpdate={isDetailPage} />;
        } else {
          return "user";
        }
      case "courses":
        return (
          <CourseForm
            setCourseData={setCourseData}
            courseData={courseData}
            setDepartmentData={setDepartmentData}
            departmentData={departmentData}
            isUpdate={isDetailPage}
          />
        );
      case "department":
        return (
          <DepartmentForm
            setDepartmentData={setDepartmentData}
            departmentData={departmentData}
            isUpdate={isDetailPage}
          />
        );
      case "employee":
        return (
          <EmployeeForm
            setEmployeeData={setEmployeeData}
            employeeData={employeeData}
            setDepartmentData={setDepartmentData}
            departmentData={departmentData}
            isUpdate={isDetailPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <div className="flex space-x-2 xs:space-x-1 xm:space-x-2 bg-[var(--dash-bg-color)] p-4 rounded-full">
          <TabTrigger
            value="details"
            activeTab={activeTab}
            onClick={setActiveTab}
          >
            Details
          </TabTrigger>
          <TabTrigger
            value="department"
            activeTab={activeTab}
            onClick={setActiveTab}
          >
            Department
          </TabTrigger>

          {!isIndustryPage && (
            <TabTrigger
              value="courses"
              activeTab={activeTab}
              onClick={setActiveTab}
            >
              Courses
            </TabTrigger>
          )}
          <TabTrigger
            value="employee"
            activeTab={activeTab}
            onClick={setActiveTab}
          >
            Employee
          </TabTrigger>
        </div>

        {activeTab === "details" ? (
          <div className="flex items-center">
            {userAcess > 2 && (
              <Button
                text="Update"
                logo={Pencil}
                onClick={() => setIsModalOpen(true)}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center">
            {userAcess > 1 && (
              <Button
                text="Add"
                logo={Plus}
                onClick={() => {
                  setIsDetailPage(false);
                  setIsModalOpen(true);
                }}
              />
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {renderForm()}
        </Modal>
      )}
    </>
  );
};

export default TopSlider;
