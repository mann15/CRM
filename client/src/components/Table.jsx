import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  setSelectedCourseData,
  setSelectedData,
  setSelectedDepartmentData,
  setSelectedEmployeeData,
} from "../features/selectedData/selectedDataSlice";
import axios from "axios";
import Modal from "./CustomModal";
import CollegeForm from "./CollegeForm";
import UniversityForm from "./UniversityForm";
import CompanyForm from "./CompanyForm";
import DepartmentForm from "./DepartmentForm";
import CourseForm from "./CourseForm";
import EmployeeForm from "./EmployeeForm";
import UserForm from "./UserForm";
import { capitalize } from "../utils/capitalize.js";
import Loader from "./Loader.jsx";

const Table = ({
  data = [],
  isModalOpen,
  isUpdateData,
  setIsUpdateData,
  activeTab = [],
  setTableData: setParentTableData,
}) => {
  const navigate = useNavigate();
  const { routeType } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const userAcess = useSelector((state) => state.auth.userAccess);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userAcess !== undefined) {
      setIsLoading(false);
    }
  }, [userAcess]);

  const itemsPerPage = 10;

  useEffect(() => {
    if (JSON.stringify(tableData) !== JSON.stringify(data)) {
      setTableData(data);
      if (setParentTableData) {
        setParentTableData(data);
      }
    }
  }, [data, setParentTableData]);

  const totalPages = useMemo(
    () => Math.ceil(tableData.length / itemsPerPage) || 1,
    [tableData]
  );

  const getPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return [...tableData].slice(startIndex, endIndex);
  }, [currentPage, tableData]);

  const formatCellValue = useCallback((value) => {
    if (!value) return "-";

    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object") {
        const nameValues = value.map((item) => {
          if (!item || typeof item !== "object") return null;
          const nameKey = Object.keys(item).find((key) => key.endsWith("Name"));
          const rawValue = nameKey ? item[nameKey] : null;
          return rawValue ? capitalize(rawValue) : null;
        });
        return (
          nameValues
            .filter((name) => name !== null && name !== "")
            .join(", ") || "-"
        );
      }
      return (
        value
          .filter((item) => item !== null && item !== "")
          .map((item) => (typeof item === "string" ? capitalize(item) : item))
          .join(", ") || "-"
      );
    }

    // Check if the value is a string before capitalizing
    return typeof value === "string"
      ? capitalize(String(value))
      : String(value);
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const renderUpdateForm = () => {
    const currentRouteType = location.pathname.split("/")[1];

    switch (activeTab) {
      case "department":
        return <DepartmentForm isUpdate={true} />;
      case "courses":
        return <CourseForm isUpdate={true} />;
      case "employee":
        return <EmployeeForm isUpdate={true} />;
      default:
        switch (currentRouteType) {
          case "college":
            return <CollegeForm isUpdate={true} />;
          case "university":
            return <UniversityForm isUpdate={true} />;
          case "industry":
            return <CompanyForm isUpdate={true} />;
          case "user":
            return <UserForm isUpdate={true} />;
          default:
            return null;
        }
    }
  };

  const confirmDelete = (rowData) => {
    setSelectedRow(rowData);
    setShowModal(true);
  };

  const handleDelete = useCallback(
    async (rowData) => {
      if (!rowData) return;
      let endpoints;

      if (location.pathname.includes("details")) {
        if (routeType !== "industry") {
          endpoints = {
            department: `/api/${routeType}/${routeType}HasDepartment/`,
            courses: `/api/${routeType}/${routeType}Course/`,
            employee: `/api/${routeType}/employee/`,
          };
        } else {
          endpoints = {
            department: `/api/${routeType}/companyHasDepartment/`,
            employee: `/api/${routeType}/employee/`,
          };
        }
      } else {
        endpoints = {
          university: "/api/university/",
          college: "/api/college/",
          industry: "/api/industry/company/",
          user:"/api/other/user"
        };
      }

      try {
        let endpoint;

        if (activeTab.length > 0) {
          endpoint = endpoints[activeTab];
        } else {
          endpoint = endpoints[routeType];
        }
        if (!endpoint) return;

        const id =
          rowData.universityId ||
          rowData.collegeId ||
          rowData.companyId ||
          rowData.employeeId ||
          rowData.companyDepartmentId ||
          rowData.courseId ||
          rowData.userId ||
          rowData[`${routeType}DepartmentId`];
        console.log(rowData);

        if (!id) {
          console.error("Missing ID in rowData:", rowData);
          return;
        }
        let idFieldName;
        if (location.pathname.includes("details")) {
          switch (activeTab) {
            case "department": {
              if (routeType === "industry") {
                idFieldName = "companyDepartmentId";
                break;
              }
              idFieldName = `${routeType}DepartmentId`;
              break;
            }
            case "courses":
              idFieldName = `courseId`;
              break;
            case "employee":
              idFieldName = "employeeId";
              break;
            default:
              idFieldName = `${routeType}Id`;
          }
        } else {
          idFieldName = `${routeType}Id`;
        }

        // Create the delete request payload
        let deletePayload;
        if (idFieldName !== "industryId") {
          deletePayload = {
            [idFieldName]: id,
          };
        } else {
          deletePayload = {
            companyId: id,
          };
        }

        const res = await axios.delete(endpoint, {
          data: deletePayload,
        });

        if (res.data.success) {
          // Update local state
          const updatedData = tableData.filter((item) => {
            const itemId =
              item.universityId ||
              item.collegeId ||
              item.companyId ||
              item.employeeId ||
              item.courseId ||
              item.userId ||
              item.companyDepartmentId ||
              item[`${routeType}DepartmentId`] ||
              item[`${routeType}CourseId`];
            return itemId !== id;
          });

          setTableData(updatedData);
          if (setParentTableData) {
            setParentTableData(updatedData);
          }

          

          // Adjust current page if necessary
          const newTotalPages = Math.ceil(updatedData.length / itemsPerPage);
          if (currentPage > newTotalPages) {
            setCurrentPage(Math.max(1, newTotalPages));
          }
        }
      } catch (error) {
        console.error(
          "Error deleting item:",
          error.response?.data || error.message
        );
      }
    },
    [
      routeType,
      tableData,
      currentPage,
      itemsPerPage,
      activeTab,
      location.pathname,
    ]
  );

  const setReduxData = (rowData) => {
    if (!rowData) return;

    const isDetailsRoute = location.pathname.includes("details");

    if (isDetailsRoute) {
      switch (activeTab) {
        case "department":
          dispatch(setSelectedDepartmentData(rowData));
          break;
        case "employee":
          dispatch(setSelectedEmployeeData(rowData));
          break;
        case "courses":
          dispatch(setSelectedCourseData(rowData));
          break;
        default:
          dispatch(setSelectedData(rowData));
          break;
      }
    } else {
      // For main routes like college, university, industry
      console.log("Setting selected data:", rowData);

      dispatch(setSelectedData(rowData));
    }
  };

  const handleRowClick = useCallback(
    (rowData) => {
      if (location.pathname.includes("details") || routeType === "user") {
        return;
      }
      if (!rowData) return;
      dispatch(setSelectedData(rowData));
      navigate(`/${routeType}/details`);
    },
    [navigate, routeType, dispatch]
  );

  const columnHeaders = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0 || !data[0]) return [];

    const allKeys = [...new Set(data.flatMap((item) => Object.keys(item)))];
    return allKeys.filter(
      (key) =>
        !/(By|At|Password|Remarks|industryId|Id|Access)$/i.test(key) &&
        data.some((item) => item && item[key] !== null && item[key] !== "")
    );
  }, [data]);

  const renderPagination = useMemo(() => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
    return pages;
  }, [currentPage, totalPages]);

  if (!Array.isArray(data)) {
    return (
      <div className="bg-[var(--table-color)] mt-20 rounded-lg shadow-lg p-8 text-center text-gray-500">
        Invalid data format
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="z-1">
      <div className="bg-[var(--table-color)] rounded-lg shadow-lg">
        <div className="max-h-[550px] overflow-y-auto rounded-lg overflow-x-scroll">
          <table className="w-full border-collapse">
            {tableData.length > 0 && columnHeaders.length > 0 ? (
              <>
                <thead className="bg-[var(--input-color)]">
                  <tr className="text-black">
                    {columnHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="p-4 text-center font-medium capitalize"
                      >
                        {header}
                      </th>
                    ))}
                    {userAcess > 2 && (
                      <th className="p-4 font-medium">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {getPageData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-t text-center cursor-pointer hover:bg-gray-100"
                      onClick={() => handleRowClick(row)}
                    >
                      {columnHeaders.map((col, idx) => (
                        <td key={idx} className="p-4">
                          {formatCellValue(row?.[col])}
                        </td>
                      ))}
                      {userAcess > 2 && (
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            {userAcess > 2 && (
                              <button
                                className="p-1 hover:text-blue-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setReduxData(row);
                                  setIsUpdateData(true);
                                }}
                              >
                                <Pencil size={20} />
                              </button>
                            )}
                            {userAcess > 3 && (
                              <button
                                className="p-1 hover:text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(row);
                                }}
                              >
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td className="text-center p-8 text-gray-500">
                    No data available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      {data.length > 0 && !isModalOpen && (
        <div className="fixed bottom-1 left-0 right-0 flex justify-center items-center p-4 mt-4 ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-2 mx-4 ">
            {renderPagination.map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={typeof page !== "number"}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === page
                    ? "bg-[var(--sidebar-color)] text-white"
                    : typeof page === "number"
                    ? "bg-white hover:bg-gray-100"
                    : "text-gray-500"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={() => {
                  handleDelete(selectedRow);
                  setShowModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isUpdateData && (
        <Modal isOpen={isUpdateData} onClose={() => setIsUpdateData(false)}>
          {renderUpdateForm()}
        </Modal>
      )}
    </div>
  );
};

export default Table;
