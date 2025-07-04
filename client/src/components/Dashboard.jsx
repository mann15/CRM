import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Topbar from "./Topbar";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFieldData } from "../features/FieldData/FieldData";
import {
  setNaacData,
  setNirfData,
} from "../features/university/universitySlice";
import Loader from "./Loader";

const Dashboard = () => {
  const { routeType } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateData, setIsUpdateData] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.field.fieldData);

  const validRoutes = ["college", "university", "industry", "user"];

  useEffect(() => {
    const fetchData = async () => {
      if (!validRoutes.includes(routeType)) {
        return;
      }

      try {
        setIsLoading(true);
        let response;
        if (routeType === "college" || routeType === "university") {
          response = await axios.post(
            `/api/${routeType}/batch/all`,
            {},
            { withCredentials: true }
          );
        } else if (routeType === "industry") {
          response = await axios.post(
            `/api/industry/company/batch/all`,
            {},
            { withCredentials: true }
          );
        } else {
          response = await axios.post(
            `/api/other/${routeType}/all`,
            {},
            { withCredentials: true }
          );
        }
        if (routeType === "university") {
          const [nirfResponse, naacResponse] = await Promise.all([
            axios.post("/api/university/nirf/all"),
            axios.post("/api/university/naac/all"),
          ]);
          dispatch(setNirfData(nirfResponse.data.data));
          dispatch(setNaacData(naacResponse.data.data));
        }

        dispatch(setFieldData(response.data.data));
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [routeType, isModalOpen, isUpdateData]);

  if (!validRoutes.includes(routeType)) {
    return <Navigate to="/home" />;
  }

  const filteredData = data && data.filter((item) =>
    typeof item === "object" &&
    Object.keys(item).filter((key) => key.endsWith("Name"))
      .some(
        (key) =>
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex overflow-x-auto xs:overflow-x-auto h-screen overflow-hidden max-h-screen bg-[var(--dash-bg-color)]">
      <Sidebar />
      <div className="flex-1 space-y-20 p-6 ml-20 xs:ml-7 xm:ml-20 ">
        <Topbar
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isUpdateData={isUpdateData}
        />
        <Table data={filteredData} isUpdateData={isUpdateData} isModalOpen={isModalOpen} setIsUpdateData={setIsUpdateData} />
      </div>
    </div>
  );
};

export default Dashboard;
