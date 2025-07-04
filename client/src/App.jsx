import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import {
  setCity,
  setCountry,
  setState,
} from "./features/location/locationSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setIndustryType,
  setUniversityType,
} from "./features/type/typeSlice";
import { setDepartment } from "./features/department/departmentSlice";
import Breadcrumbs from "./components/Breadcrumbs";
import Detailpage from "./components/Detailpage";
import { loadUser, setUser } from "./features/other/authSlice";
import CheckAccess from "./components/CheckAccess";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

useEffect(() => {
  dispatch(loadUser()); 

  const fetchData = async () => {
    try {
      const [
        cityResponse,
        stateResponse,
        countryResponse,
        universityTypeResponse,
        industryTypeResponse,
        departmentResponse,
        profileResponse,
      ] = await Promise.all([
        axios.post("/api/other/city/all"),
        axios.post("/api/other/state/all"),
        axios.post("/api/other/country/all"),
        axios.post("/api/type/all", { typesType: "university" }),
        axios.post("/api/type/all", { typesType: "industry" }),
        axios.post("/api/other/department/all"),
        axios.post("/api/auth/getProfile"),
      ]);

      dispatch(setCity(cityResponse.data.data));
      dispatch(setState(stateResponse.data.data));
      dispatch(setCountry(countryResponse.data.data));
      dispatch(setUniversityType(universityTypeResponse.data.data));
      dispatch(setIndustryType(industryTypeResponse.data.data));
      dispatch(setDepartment(departmentResponse.data.data));
      dispatch(setUser(profileResponse.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [dispatch]);


  return (
    <Router>
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route
          path="/home"
          element={
            <CheckAccess  isLoggedIn={isLoggedIn}>
              <LandingPage />
            </CheckAccess>
          }
        />
        <Route
          path="/:routeType"
          element={
            <CheckAccess isLoggedIn={isLoggedIn}>
              <Dashboard />
            </CheckAccess>
          }
        />
        <Route
          path="/:routeType/details"
          element={
            <CheckAccess isLoggedIn={isLoggedIn}>
              <Detailpage />
            </CheckAccess>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
