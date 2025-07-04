import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopSlider from "./TopSlider";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "./Loader";
import { setSelectedDepartmentData } from "../features/selectedData/selectedDataSlice";

const TabContent = ({ value, activeTab, children }) =>
  activeTab === value && (
    <div
      className="h-full overflow-auto
    "
    >
      {children}
    </div>
  );

const Detailpage = () => {
  const { routeType } = useParams();
  const navigate = useNavigate();
  const [isUpdateData, setIsUpdateData] = useState(false);

  const Details = useSelector((state) => state.selectedData.selectedData);
  let Id;
  if (routeType === "industry") {
    Id = useSelector((state) => state.selectedData?.selectedData?.companyId);
  } else {
    Id = useSelector(
      (state) => state.selectedData?.selectedData?.[`${routeType}Id`]
    );
  }


  const dispatch = useDispatch();
  const [departmentData, setDepartmentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!Id) return;

    setIsLoading(true);
    try {
      let deptRes, courseRes, employeeRes;
      if (routeType !== "industry") {
        [deptRes, courseRes, employeeRes] = await Promise.all([
          axios.post(`/api/${routeType}/${routeType}HasDepartment/id`, {
            [`${routeType}Id`]: Id,
          }),
          axios.post(`/api/${routeType}/${routeType}Course/batch/all`, {
            [`${routeType}Id`]: Id,
          }),
          axios.post(`/api/${routeType}/employee/batch/all`, {
            [`${routeType}Id`]: Id,
          }),
        ]);
        setCourseData(courseRes.data.data || []);
        dispatch(setSelectedDepartmentData(courseRes.data.data || []));
      } else {
        [deptRes, employeeRes] = await Promise.all([
          axios.post(`/api/${routeType}/companyHasDepartment/id`, {
            companyId: Id,
          }),
          axios.post(`/api/${routeType}/employee/batch/all`, {
            companyId: Id,
          }),
        ]);
      }

      setDepartmentData(deptRes.data.data || []);
      dispatch(setSelectedDepartmentData(deptRes.data.data || []));
      setEmployeeData(employeeRes.data.data || []);
      dispatch(setSelectedDepartmentData(employeeRes.data.data || []));
      // console.log("hi");
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [routeType, Id, Details, isUpdateData]);

  useEffect(() => {
    if (Object.keys(Details).length === 0) {
      navigate(`/${routeType}`);
    }
  }, [Details, navigate, routeType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatFieldName = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/Name$/, "")
      .trim();
  };
  const capitalizeValue = (value) => {
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen p-8 xs:px-0 xm:px-8 bg-[var(--table-color)]">
      <TopSlider
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setDepartmentData={setDepartmentData}
        departmentData={departmentData}
        setCourseData={setCourseData}
        courseData={courseData}
        setEmployeeData={setEmployeeData}
        employeeData={employeeData}
      />

      <div className="flex-1 overflow-hidden mt-6">
        <TabContent value="details" activeTab={activeTab}>
          <div className="p-6 xs:p-1 xm:p-6 rounded-lg shadow-lg bg-[var(--dash-bg-color)]">
            <div className="space-y-4">
              {Object.keys(Details).length > 0 ? (
                Object.entries(Details).map(
                  ([key, value]) =>
                    !key.endsWith("Id") && (
                      <div
                        className="grid grid-cols-[200px,1fr] gap-6 xs:grid-cols-[150px,1fr] xm:grid-cols-[200px,1fr] xs:gap-2 xm:gap-20"
                        key={key}
                      >
                        <span className="font-medium capitalize">
                          {formatFieldName(key)}
                        </span>
                        <span>
                          {value ? (
                            key.toLowerCase().includes("email") ? (
                              <a
                                href={`mailto:${value}`}
                                className="text-[var(--email-color)] hover:underline"
                              >
                                {value}
                              </a>
                            ) : (
                             capitalizeValue(value)
                            )
                          ) : (
                            "-"
                          )}
                        </span>
                      </div>
                    )
                )
              ) : (
                <div>No college details available</div>
              )}
            </div>
          </div>
        </TabContent>

        <TabContent value="department" activeTab={activeTab}>
          <Table
            data={departmentData}
            activeTab={activeTab}
            setTableData={setDepartmentData}
            isUpdateData={isUpdateData}
            setIsUpdateData={setIsUpdateData}
          />
        </TabContent>

        <TabContent value="courses" activeTab={activeTab}>
          <Table
            data={courseData}
            activeTab={activeTab}
            setTableData={setCourseData}
            isUpdateData={isUpdateData}
            setIsUpdateData={setIsUpdateData}
          />
        </TabContent>

        <TabContent value="employee" activeTab={activeTab}>
          <Table
            data={employeeData}
            activeTab={activeTab}
            setTableData={setEmployeeData}
            isUpdateData={isUpdateData}
            setIsUpdateData={setIsUpdateData}
          />
        </TabContent>
      </div>
    </div>
  );
};

export default Detailpage;
