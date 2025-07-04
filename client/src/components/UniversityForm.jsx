import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import {
  setCity,
  setCountry,
  setState,
} from "../features/location/locationSlice";

const UniversityForm = ({ onClose, isUpdate = false }) => {
  const city = useSelector((state) => state.location.city);
  const country = useSelector((state) => state.location.country);
  const state = useSelector((state) => state.location.state);
  const selectedUniversity = useSelector(
    (state) => state.selectedData.selectedData
  );
  const dispatch = useDispatch();

  const [cities, setCities] = useState(city);
  const [countries, setCountries] = useState(country);
  const [states, setStates] = useState(state);
  const [type, setType] = useState([]);
  const [nirf, setNirf] = useState([]);
  const [naac, setNaac] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email1: "",
    email2: "",
    address: "",
    phone1: "",
    phone2: "",
    village: "",
    town: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    type: "",
    nirf: "",
    naac: "",
  });

  useEffect(() => {
    // Initialize form with selected university data if in update mode
    console.log(selectedUniversity);

    if (isUpdate && selectedUniversity) {
      setFormData({
        name: selectedUniversity[`University Name`] || "",
        email1: selectedUniversity[`Primary Email`] || "",
        email2: selectedUniversity[`Secondary Email`] || "",
        address: selectedUniversity[`Address`] || "",
        phone1: selectedUniversity[`Primary Phone`] || "",
        phone2: selectedUniversity[`Secondary Phone`] || "",
        village: selectedUniversity[`Village`] || "",
        town: selectedUniversity[`Town`] || "",
        postalCode: selectedUniversity[`Pincode`] || "",
        city: selectedUniversity[`City`] || "",
        state: selectedUniversity[`State`] || "",
        country: selectedUniversity[`Country`] || "",
        type: selectedUniversity[`Type`] || "",
        nirf: selectedUniversity[`nirfRank`] || "",
        naac: selectedUniversity[`naacGrade`] || "",
      });
    }
  }, [isUpdate, selectedUniversity]);

  useEffect(() => {
    setCities(city);
    setCountries(country);
    setStates(state);
  }, [city, country, state]);

  const [showOtherInputs, setShowOtherInputs] = useState({
    city: false,
    state: false,
    country: false,
    type: false,
    nirf: false,
    naac: false,
  });

  const [customValues, setCustomValues] = useState({
    city: "",
    state: "",
    country: "",
    type: "",
    nirf: "",
    naac: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email1: false,
    phone1: false,
    address: false,
    city: false,
    state: false,
    country: false,
    type: false,
    nirf: false,
    naac: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nirfRes, naacRes, typeRes] = await Promise.all([
          axios.post("/api/university/nirf/all"),
          axios.post("/api/university/naac/all"),
          axios.post("/api/type/all", { typesType: "university" }),
        ]);

        setNirf(nirfRes.data.data);
        setNaac(naacRes.data.data);
        setType(typeRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    const endpoints = {
      city: "/api/other/city/",
      state: "/api/other/state/",
      country: "/api/other/country/",
      type: "/api/type/",
      nirf: "/api/university/nirf/",
      naac: "/api/university/naac/",
    };

    const stateValues = {
      city: cities,
      state: states,
      country: countries,
      type: type,
      nirf: nirf,
      naac: naac,
    };

    const newValue = customValues[field]?.trim();

    if (newValue.toLowerCase() === "other" || !newValue) {
      toast.error("Provide valid " + field, { autoClose: 2000 });
      return;
    }

    if (field === "nirf") {
      if (
        isNaN(newValue) ||
        !Number.isInteger(Number(newValue)) ||
        Number(newValue) <= 0
      ) {
        toast.error("NIRF rank must be a positive integer", {
          autoClose: 2000,
        });
        return;
      }
    }

    // NAAC validation - must be in the format like A+, B, C+
    if (field === "naac") {
      const naacPattern = /^[A-D][+]{0,2}$/;
      if (!naacPattern.test(newValue)) {
        toast.error("NAAC grade must be in the format A+, B, C+, etc.", {
          autoClose: 2000,
        });
        return;
      }
    }
    if (
      stateValues[field]?.some((item) => {
        if (field === "nirf") return item.nirfRank === newValue;

        if (field === "naac") return item.naacGrade === newValue;
        return (
          item[`${field}Name`]?.trim().toLowerCase() === newValue.toLowerCase()
        );
      })
    ) {
      toast.warning(`${field} already exists!`, { autoClose: 1500 });
      setShowOtherInputs((prev) => ({
        ...prev,
        [field]: false,
      }));
      handleCustomValueChange(field, "");
      return;
    }

    const payload = {
      ...(field === "city" ||
      field === "state" ||
      field === "country" ||
      field === "type"
        ? { [`${field}Name`]: newValue }
        : {}),
      ...(field === "nirf" ? { nirfRank: newValue } : {}),
      ...(field === "naac" ? { naacGrade: newValue } : {}),
      ...(field === "type" && { typesType: "university" }),
    };

    try {
      const response = await axios.post(endpoints[field], payload);
      const newData = response.data.data;

      const stateSetters = {
        city: setCities,
        state: setStates,
        country: setCountries,
        type: setType,
        nirf: setNirf,
        naac: setNaac,
      };

      stateSetters[field]((prev) =>
        Array.isArray(prev) ? [...prev, newData] : [newData]
      );

      // Update Redux store with safe array spread
      if (field === "city") {
        dispatch(setCity(Array.isArray(city) ? [...city, newData] : [newData]));
      } else if (field === "state") {
        dispatch(
          setState(Array.isArray(state) ? [...state, newData] : [newData])
        );
      } else if (field === "country") {
        dispatch(
          setCountry(Array.isArray(country) ? [...country, newData] : [newData])
        );
      }

      setShowOtherInputs((prev) => ({
        ...prev,
        [field]: false,
      }));
      setCustomValues((prev) => ({
        ...prev,
        [field]: "",
      }));
    } catch (error) {
      console.error(`Error adding new ${field}:`, error);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email1: !formData.email1.trim(),
      phone1: !formData.phone1.trim(),
      address: !formData.address.trim(),
      city: !formData.city && !customValues.city && !showOtherInputs.city,
      state: !formData.state && !customValues.state && !showOtherInputs.state,
      country:
        !formData.country && !customValues.country && !showOtherInputs.country,
      type: !formData.type && !customValues.type && !showOtherInputs.type,
      nirf: !formData.nirf && !customValues.nirf && !showOtherInputs.nirf,
      naac: !formData.naac && !customValues.naac && !showOtherInputs.naac,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // Fallback to original selected university value
      let capitalizedField;
      if (field === "nirf") {
        capitalizedField = "nirfRank";
      } else if (field === "naac") {
        capitalizedField = "naacGrade";
      } else {
        capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
      }
      const originalValue = selectedUniversity[capitalizedField];

      const originalItem = list.find((item) => item[nameKey] === originalValue);

      return originalItem ? originalItem[idKey] : null;
    };

    const university = {
      universityId: selectedUniversity?.universityId,
      universityName: data.name,
      universityEmail1: data.email1,
      universityEmail2: data.email2,
      universityAddress: data.address,
      universityPhone1: data.phone1,
      universityPhone2: data.phone2,
      universityVillage: data.village,
      universityTown: data.town,
      universityCity: getSelectedValue("city", cities, "cityName", "cityId"),
      universityState: getSelectedValue(
        "state",
        states,
        "stateName",
        "stateId"
      ),
      universityCountry: getSelectedValue(
        "country",
        countries,
        "countryName",
        "countryId"
      ),
      universityPincode: data.postalCode,
      universityType: getSelectedValue("type", type, "typeName", "typeId"),
      universityNIRF: getSelectedValue("nirf", nirf, "nirfRank", "nirfId"),
      universityNAAC: getSelectedValue("naac", naac, "naacGrade", "naacId"),
    };

    try {
      let response;
      console.log("University data:", university);

      if (isUpdate && selectedUniversity?.universityId) {
        console.log("Updating university:", university);
        response = await axios.put(`/api/university/`, university);
      } else {
        // Create new university
        response = await axios.post("/api/university/", university);
      }

      console.log(response.data);
      if (response?.data?.success) {
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
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <h2 className="text-base font-semibold text-black mb-4">
            {isUpdate ? "Update University Details:" : "University Details:"}
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
                placeholder="University Name"
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
              Email address1
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
                placeholder="Primary email"
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
              Email address2
            </label>
            <input
              id="email2"
              name="email2"
              type="email"
              value={formData.email2}
              onChange={handleInputChange}
              placeholder="Secondary email"
              className="flex-1 block w-full rounded-md border border-[var(--label-broder-color)] px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="address"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Address
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.address
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.address}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500" id="address-error">
                  This field is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="phone1"
              className="text-sm font-medium text-black w-1/3 flex items-center"
            >
              Phone Number1
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </label>
            <div className="flex-1 relative">
              <input
                id="phone1"
                name="phone1"
                type="tel"
                value={formData.phone1}
                onChange={handleInputChange}
                placeholder="Primary Phone Number"
                className={`block w-full rounded-md border px-3 py-2 text-sm ${
                  errors.phone1
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
                }`}
                aria-required="true"
                aria-invalid={errors.phone1}
              />
              {errors.phone1 && (
                <p className="mt-1 text-sm text-red-500" id="phone1-error">
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
              Phone Number2
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

          <div className="flex items-center gap-4">
            <label
              htmlFor="village"
              className="text-sm font-medium text-black w-1/3"
            >
              Village
            </label>
            <input
              id="village"
              name="village"
              type="text"
              value={formData.village}
              onChange={handleInputChange}
              placeholder="Village Name"
              className="flex-1 block w-full rounded-md border border-[var(--label-broder-color)] px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="town"
              className="text-sm font-medium text-black w-1/3"
            >
              Town
            </label>
            <input
              id="town"
              name="town"
              type="text"
              value={formData.town}
              onChange={handleInputChange}
              placeholder="Town Name"
              className="flex-1 block w-full rounded-md border border-[var(--label-broder-color)] px-3 py-2 text-sm"
            />
          </div>

          <Dropdown
            field={"city"}
            options={cities}
            labelText={"City"}
            nameKey={"cityName"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            showOtherInputs={showOtherInputs}
            addNewValue={addNewValue}
            errors={errors}
            defaultValue={formData.city}
            required={true}
          />

          <Dropdown
            field={"state"}
            options={states}
            labelText={"State"}
            nameKey={"stateName"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            addNewValue={addNewValue}
            showOtherInputs={showOtherInputs}
            errors={errors}
            defaultValue={formData.state}
            required={true}
          />

          <Dropdown
            field={"country"}
            options={countries}
            labelText={"Country"}
            nameKey={"countryName"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            addNewValue={addNewValue}
            showOtherInputs={showOtherInputs}
            errors={errors}
            defaultValue={formData.country}
            required={true}
          />

          <Dropdown
            field={"type"}
            options={type}
            labelText={"Type"}
            nameKey={"typeName"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            addNewValue={addNewValue}
            showOtherInputs={showOtherInputs}
            errors={errors}
            defaultValue={formData.type}
            required={true}
          />

          <Dropdown
            field={"nirf"}
            options={nirf}
            labelText={"NIRF Rank"}
            nameKey={"nirfRank"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            addNewValue={addNewValue}
            showOtherInputs={showOtherInputs}
            errors={errors}
            defaultValue={formData.nirf}
            required={true}
          />

          <Dropdown
            field={"naac"}
            options={naac}
            labelText={"NAAC Grade"}
            nameKey={"naacGrade"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            addNewValue={addNewValue}
            showOtherInputs={showOtherInputs}
            errors={errors}
            defaultValue={formData.naac}
            required={true}
          />

          <div className="flex items-center gap-4">
            <label
              htmlFor="postal-code"
              className="text-sm font-medium text-black w-1/3"
            >
              Pincode
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="Pincode"
              className="flex-1 block w-full rounded-md border border-[var(--label-broder-color)] px-3 py-2 text-sm"
            />
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

export default UniversityForm;
