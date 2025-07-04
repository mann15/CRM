import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "./Dropdown";
import {
  setCity,
  setCountry,
  setState,
} from "../features/location/locationSlice";
import { setSelectedData } from "../features/selectedData/selectedDataSlice";
import { setCollegeType } from "../features/type/typeSlice";
import { setUniversityData } from "../features/university/universitySlice";

const CollegeForm = ({ onClose, isUpdate = false }) => {
  const city = useSelector((state) => state.location.city);
  const country = useSelector((state) => state.location.country);
  const state = useSelector((state) => state.location.state);
  const type = useSelector((state) => state.type.collegeType);
  const university = useSelector((state) => state.university.universityData);
  const selectedCollege = useSelector(
    (state) => state.selectedData.selectedData
  );

  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email1: "",
    email2: "",
    phone1: "",
    phone2: "",
    address: "",
    village: "",
    town: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    university: "",
    type: "",
  });

  useEffect(() => {
    // Initialize form with selected college data if in update mode
    if (isUpdate && selectedCollege) {
      setFormData({
        name: selectedCollege[`College Name`] || "",
        email1: selectedCollege[`Primary Email`] || "",
        email2: selectedCollege[`Secondary Email`] || "",
        phone1: selectedCollege[`Primary Number`] || "",
        phone2: selectedCollege[`Secondary Number`] || "",
        address: selectedCollege[`Address`] || "",
        village: selectedCollege[`Village`] || "",
        town: selectedCollege[`Town`] || "",
        postalCode: selectedCollege[`Pincode`] || "",
        city: selectedCollege[`City`] || "",
        state: selectedCollege[`State`] || "",
        country: selectedCollege[`Country`] || "",
        university: selectedCollege[`University`] || "",
        type: selectedCollege[`Type`] || "",
      });
    }
  }, [selectedCollege]);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const universityResponse = await axios.post("/api/university/all");
        const typeResponse = await axios.post("/api/type/all", {
          typesType: "college",
        });

        // setType(typeResponse.data.data);
        // setUniversity(universityResponse.data.data);
        dispatch(setCollegeType(typeResponse.data.data));
        dispatch(setUniversityData(universityResponse.data.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversity();
    setUniversities(university);
    setTypes(type);
    setCities(city);
    setCountries(country);
    setStates(state);
  }, [dispatch, city, country, state]);

  const [showOtherInputs, setShowOtherInputs] = useState({
    city: false,
    state: false,
    country: false,
    university: false,
    type: false,
  });

  const [customValues, setCustomValues] = useState({
    city: "",
    state: "",
    country: "",
    university: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email1: false,
    phone1: false,
    address: false,
    city: false,
    state: false,
    country: false,
    university: false,
    type: false,
  });

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
    };

    const stateValues = {
      city: cities,
      state: states,
      country: countries,
      type: type,
    };

    const newValue = customValues[field]?.trim();

    if (newValue.toLowerCase() === "other" || !newValue) {
      toast.error("Provide valid " + field, { autoClose: 2000 });
      return;
    }

    if (
      stateValues[field]?.some(
        (item) =>
          item[`${field}Name`]?.trim().toLowerCase() === newValue.toLowerCase()
      )
    ) {
      toast.warning(`${field} already exists!`, { autoClose: 2000 });
      setShowOtherInputs((prev) => ({
        ...prev,
        [field]: false,
      }));
handleCustomValueChange(field,"");

      return;
    }

    const payload = {
      ...(field === "city" ||
      field === "state" ||
      field === "country" ||
      field === "type"
        ? { [`${field}Name`]: newValue }
        : {}),
      ...(field === "type" && { typesType: "college" }),
    };

    try {
      const response = await axios.post(endpoints[field], payload);
      const newData = response.data.data;

      const stateSetters = {
        city: setCities,
        state: setStates,
        country: setCountries,
        type: setTypes,
      };

      // Update state with safe array spread
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
      }else if (field === "type") {
        dispatch(
          setCollegeType(Array.isArray(type) ? [...type, newData] : [newData])
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
      university:
        !formData.university &&
        !customValues.university &&
        !showOtherInputs.university,
      type: !formData.type && !customValues.type && !showOtherInputs.type,
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

      // Fallback to original selected college value
      const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
      const originalValue = selectedCollege[capitalizedField];

      const originalItem = list.find((item) => item[nameKey] === originalValue);

      return originalItem ? originalItem[idKey] : null;
    };

    const college = {
      collegeId: selectedCollege?.collegeId,
      collegeName: data.name,
      collegeEmail1: data.email1,
      collegeEmail2: data.email2,
      collegePhone1: data.phone1,
      collegePhone2: data.phone2,
      collegeAddress: data.address,
      collegeVillage: data.village,
      collegeTown: data.town,
      collegeCity: getSelectedValue("city", cities, "cityName", "cityId"),
      collegeState: getSelectedValue("state", states, "stateName", "stateId"),
      collegeCountry: getSelectedValue(
        "country",
        countries,
        "countryName",
        "countryId"
      ),
      collegePincode: data.postalCode,
      typeId: getSelectedValue("type", type, "typeName", "typeId"),
      universityId: getSelectedValue(
        "university",
        university,
        "universityName",
        "universityId"
      ),
    };

    try {
      let response;

      if (isUpdate && selectedCollege?.collegeId) {
        response = await axios.put(`/api/college/`, college);
      } else {
        // Create new college
        response = await axios.post("/api/college/", college);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message, {
          autoClose: 1500,
          closeButton: false,
        });
        setTimeout(() => {
          onClose();
          dispatch(setSelectedData({}));
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
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 ">
          <h2 className="text-base font-semibold text-black mb-4">
            {isUpdate ? "Update College Details:" : "College Details:"}
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
                placeholder="College Name"
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
              Secondary Email
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
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
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

          <Dropdown
            field={"university"}
            options={university}
            labelText={"University"}
            nameKey={"universityName"}
            customValues={customValues}
            handleOtherSelection={handleOtherSelection}
            handleCustomValueChange={handleCustomValueChange}
            addNewValue={addNewValue}
            showOtherInputs={showOtherInputs}
            errors={errors}
            defaultValue={formData.university}
            required={true}
          />

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

export default CollegeForm;
