import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setCity,
  setCountry,
  setState,
} from "../features/location/locationSlice";
import { setSelectedData } from "../features/selectedData/selectedDataSlice";

const CompanyForm = ({ onClose, isUpdate = false }) => {
  const city = useSelector((state) => state.location.city || []);
  const country = useSelector((state) => state.location.country || []);
  const state = useSelector((state) => state.location.state || []);
  const selectedCompany = useSelector(
    (state) => state.selectedData.selectedData
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyName: "",
    industryName: "",
    village: "",
    town: "",
    companyEmail: "",
    companyPhone: "",
    cities: [],
    countries: [],
    states: [],
    typeList: [],
    industryNames: [],
    city: "",
    state: "",
    country: "",
    type: "",
    HeadquarterCities: "",
    HeadquarterStates: "",
    HeadquarterCountries: "",
  });

  const [showOtherInputs, setShowOtherInputs] = useState({});
  const [customValues, setCustomValues] = useState({});
  const [errors, setErrors] = useState({
    companyName: false,
    companyEmail: false,
    companyPhone: false,
    industryName: false,
    city: false,
    state: false,
    country: false,
    type: false,
    HeadquarterCities: false,
    HeadquarterStates: false,
    HeadquarterCountries: false,
  });

  // Initialize form with selected company data if in update mode
  useEffect(() => {
    if (isUpdate && selectedCompany) {
      setFormData({
        companyName: selectedCompany[`Company Name`] || "",
        industryName: selectedCompany[`Industry Name`] || "",
        village: selectedCompany[`Village`] || "",
        town: selectedCompany[`Town`] || "",
        companyEmail: selectedCompany[`Email`] || "",
        companyPhone: selectedCompany[`Phone`] || "",
        city: selectedCompany[`City`] || "",
        state: selectedCompany[`State`] || "",
        country: selectedCompany[`Country`] || "",
        type: selectedCompany[`Type`] || "",
        HeadquarterCities: selectedCompany[`Headquarter City`] || "",
        HeadquarterStates: selectedCompany[`Headquarter State`] || "",
        HeadquarterCountries: selectedCompany[`Headquarter Country`] || "",
        cities: city || [],
        countries: country || [],
        states: state || [],
        typeList: [],
        industryNames: [],
      });
    }
  }, [isUpdate, selectedCompany, city, country, state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch industry types
        const typeResponse = await axios.post("/api/type/all", {
          typesType: "industry",
        });

        // Fetch industry names
        const industryNamesResponse = await axios.post(
          "/api/industry/name/all"
        );

        setFormData((prev) => ({
          ...prev,
          typeList: typeResponse.data.data,
          industryNames: industryNamesResponse.data.data || [],
          cities: city,
          countries: country,
          states: state,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, country, state]);

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
      industryName: "/api/industry/name/",
    };

    const stateValues = {
      city: formData.cities,
      state: formData.states,
      country: formData.countries,
      type: formData.typeList,
      industryName: formData.industryNames,
    };

    const newValue = customValues[field]?.trim();

    if (newValue.toLowerCase() === "other" || !newValue) {
      toast.error("Provide valid " + field, { autoClose: 2000 });
      return;
    }

    // Check for existing values based on field type
    const nameKey = field === "industryName" ? "industyName" : `${field}Name`;

    if (
      stateValues[field]?.some(
        (item) => item[nameKey]?.trim().toLowerCase() === newValue.toLowerCase()
      )
    ) {
      setShowOtherInputs((prev) => ({ ...prev, [field]: false }));
      return;
    }

    const payload = {
      [field === "industryName" ? "industryName" : `${field}Name`]: newValue,
      ...(field === "type" && { typesType: "industry" }),
    };

    try {
      const response = await axios.post(endpoints[field], payload);

      if (!response.data.success) throw new Error("Failed to add new value");

      const newData = response.data.data;

      // Update formData with the new value in the appropriate list
      const arrayKey =
        field === "type"
          ? "typeList"
          : field === "industryName"
          ? "industryNames"
          : `${field}s`;

      setFormData((prev) => ({
        ...prev,
        [arrayKey]: [...(prev[arrayKey] || []), newData],
      }));

      // Update Redux state with safe array spreading (only for location fields)
      if (field === "city") dispatch(setCity([...(city || []), newData]));
      if (field === "state") dispatch(setState([...(state || []), newData]));
      if (field === "country")
        dispatch(setCountry([...(country || []), newData]));

      setShowOtherInputs((prev) => ({ ...prev, [field]: false }));
      setCustomValues((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      toast.error(`Error adding ${field}: ${error.message}`, {
        autoClose: 1500,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      companyName: !formData.companyName.trim(),
      companyEmail: !formData.companyEmail.trim(),
      companyPhone: !formData.companyPhone.trim(),
      industryName:
        !formData.industryName &&
        !customValues.industryName &&
        !showOtherInputs.industryName,
      city: !formData.city && !customValues.city && !showOtherInputs.city,
      state: !formData.state && !customValues.state && !showOtherInputs.state,
      country:
        !formData.country && !customValues.country && !showOtherInputs.country,
      type: !formData.type && !customValues.type && !showOtherInputs.type,
      HeadquarterCities:
        !formData.HeadquarterCities &&
        !customValues.HeadquarterCities &&
        !showOtherInputs.HeadquarterCities,
      HeadquarterStates:
        !formData.HeadquarterStates &&
        !customValues.HeadquarterStates &&
        !showOtherInputs.HeadquarterStates,
      HeadquarterCountries:
        !formData.HeadquarterCountries &&
        !customValues.HeadquarterCountries &&
        !showOtherInputs.HeadquarterCountries,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const getSelectedValue = (field, list, nameKey, idKey, data) => {
    if (showOtherInputs[field]) {
      return customValues[field];
    }

    // Try to find match in list by custom values first
    const selectedByCustom = list.find(
      (item) => item[nameKey] === customValues[field]
    );
    if (selectedByCustom) {
      return selectedByCustom[idKey];
    }

    // Then try to find by form data
    const selectedByForm = list.find((item) => item[nameKey] === data[field]);
    if (selectedByForm) {
      return selectedByForm[idKey];
    }

    // Fallback to original selected company value for update mode
    if (isUpdate) {
      // Transform field name to match the keys in selectedCompany
      let fieldKey = field;
      if (field === "city") fieldKey = "City";
      else if (field === "state") fieldKey = "State";
      else if (field === "country") fieldKey = "Country";
      else if (field === "type") fieldKey = "Type";
      else if (field === "HeadquarterCities") fieldKey = "Headquarter City";
      else if (field === "HeadquarterStates") fieldKey = "Headquarter State";
      else if (field === "HeadquarterCountries")
        fieldKey = "Headquarter Country";
      else if (field === "industryName") fieldKey = "Industry Name";

      const originalValue = selectedCompany[fieldKey];
      const originalItem = list.find((item) => item[nameKey] === originalValue);
      return originalItem ? originalItem[idKey] : null;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        autoClose: 2000,
      });
      return;
    }

    const formEntries = new FormData(e.target);
    const data = Object.fromEntries(formEntries);

    // Create the complete data object for comparison and updates
    const completeData = {
      // Company data
      companyId: isUpdate ? selectedCompany?.companyId : undefined,
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,

      // Location data
      locationId: isUpdate ? selectedCompany?.locationId : undefined,
      village: data.village,
      town: data.town,
      cityId: getSelectedValue(
        "city",
        formData.cities,
        "cityName",
        "cityId",
        data
      ),
      stateId: getSelectedValue(
        "state",
        formData.states,
        "stateName",
        "stateId",
        data
      ),
      countryId: getSelectedValue(
        "country",
        formData.countries,
        "countryName",
        "countryId",
        data
      ),

      // Industry data
      industryId: isUpdate ? selectedCompany?.IndustryId : undefined,
      industryNameId: getSelectedValue(
        "industryName",
        formData.industryNames,
        "industryName",
        "industryNameId",
        data
      ),
      typeId: getSelectedValue(
        "type",
        formData.typeList,
        "typeName",
        "typeId",
        data
      ),

      // Headquarter data
      headQuarterId: isUpdate ? selectedCompany?.headQuarterId : undefined,
      headQuarterCityId: getSelectedValue(
        "HeadquarterCities",
        formData.cities,
        "cityName",
        "cityId",
        data
      ),
      headQuarterStateId: getSelectedValue(
        "HeadquarterStates",
        formData.states,
        "stateName",
        "stateId",
        data
      ),
      headQuarterCountryId: getSelectedValue(
        "HeadquarterCountries",
        formData.countries,
        "countryName",
        "countryId",
        data
      ),
    };

    // If not updating, create new company with all data
    if (!isUpdate) {
      try {
        const response = await axios.post("/api/industry/batch", completeData);

        toast[response.data.success ? "success" : "error"](
          response.data.message,
          { autoClose: 1500 }
        );

        if (response.data.success) {
          setTimeout(() => {
            onClose();
            dispatch(setSelectedData({}));
          }, 1500);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to create company",
          { autoClose: 1500 }
        );
      }
      return;
    }

    // For updates, check what has changed and make targeted API calls
    try {
      let apiCalls = [];

      // Check if company details have changed
      if (
        selectedCompany[`Company Name`] !== data.companyName ||
        selectedCompany[`Email`] !== data.companyEmail ||
        selectedCompany[`Phone`] !== data.companyPhone
      ) {
        apiCalls.push({
          endpoint: "/api/industry/company/",
          data: {
            companyId: selectedCompany?.companyId,
            companyName: data.companyName,
            companyEmail: data.companyEmail,
            companyPhone: data.companyPhone,
          },
        });
      }

      if (
        selectedCompany[`Village`] !== data.village ||
        selectedCompany[`Town`] !== data.town ||
        selectedCompany[`City`] !== formData.city ||
        selectedCompany[`State`] !== formData.state ||
        selectedCompany[`Country`] !== formData.country
      ) {
        apiCalls.push({
          endpoint: "/api/industry/location",
          data: {
            locationId: selectedCompany?.locationId,
            village: data.village,
            town: data.town,
            cityId: getSelectedValue(
              "city",
              formData.cities,
              "cityName",
              "cityId",
              data
            ),
            stateId: getSelectedValue(
              "state",
              formData.states,
              "stateName",
              "stateId",
              data
            ),
            countryId: getSelectedValue(
              "country",
              formData.countries,
              "countryName",
              "countryId",
              data
            ),
          },
        });
      }

      // First, get the correct IDs
      const newIndustryNameId = getSelectedValue(
        "industryName",
        formData.industryNames,
        "industryName",
        "industryNameId",
        data
      );
      const newTypeId = getSelectedValue(
        "type",
        formData.typeList,
        "typeName",
        "typeId",
        data
      );

      // Get the actual selected names for better comparison
      const selectedIndustryName = formData.industryNames.find(
        (i) => i.industryNameId === newIndustryNameId
      )?.industryName;
      const selectedTypeName = formData.typeList.find(
        (t) => t.typeId === newTypeId
      )?.typeName;

      // Now compare using ONLY the name values
      if (
        selectedCompany[`Industry Name`] !== selectedIndustryName ||
        selectedCompany[`Type`] !== selectedTypeName
      ) {
        apiCalls.push({
          endpoint: "/api/industry/",
          data: {
            industryId: selectedCompany?.IndustryId,
            industryNameId: newIndustryNameId,
            typeId: newTypeId,
          },
        });
      }

      // Check if headquarter details have changed
      if (
        selectedCompany[`Headquarter City`] !==
          formData.cities.find(
            (c) =>
              c.cityId ===
              getSelectedValue(
                "HeadquarterCities",
                formData.cities,
                "cityName",
                "cityId",
                data
              )
          )?.cityName ||
        selectedCompany[`Headquarter State`] !==
          formData.states.find(
            (s) =>
              s.stateId ===
              getSelectedValue(
                "HeadquarterStates",
                formData.states,
                "stateName",
                "stateId",
                data
              )
          )?.stateName ||
        selectedCompany[`Headquarter Country`] !==
          formData.countries.find(
            (c) =>
              c.countryId ===
              getSelectedValue(
                "HeadquarterCountries",
                formData.countries,
                "countryName",
                "countryId",
                data
              )
          )?.countryName
      ) {
        apiCalls.push({
          endpoint: "/api/industry/head_qt",
          data: {
            headQuarterId: selectedCompany?.headQuarterId,
            cityId: getSelectedValue(
              "HeadquarterCities",
              formData.cities,
              "cityName",
              "cityId",
              data
            ),
            stateId: getSelectedValue(
              "HeadquarterStates",
              formData.states,
              "stateName",
              "stateId",
              data
            ),
            countryId: getSelectedValue(
              "HeadquarterCountries",
              formData.countries,
              "countryName",
              "countryId",
              data
            ),
          },
        });
      }

      // If no changes detected
      if (apiCalls.length === 0) {
        toast.info("No changes detected", { autoClose: 1500 });
        onClose();
        return;
      }

      // Show initial update toast
      toast.info("Updating...", { autoClose: 1000 });

      // Execute API calls
      const results = await Promise.allSettled(
        apiCalls.map((call) => axios.put(call.endpoint, call.data))
      );

      // Get result statistics
      const successCount = results.filter(
        (result) => result.status === "fulfilled" && result.value?.data?.success
      ).length;

      // Show single summary toast instead of multiple toasts
      if (successCount === apiCalls.length) {
        toast.success("All updates completed successfully", {
          autoClose: 1500,
        });
        setTimeout(() => {
          onClose();
          dispatch(setSelectedData({}));
        }, 1500);
      } else if (successCount === 0) {
        toast.error("Update failed", { autoClose: 1500 });
      } else {
        toast.warning(
          `${successCount} of ${apiCalls.length} updates completed`,
          {
            autoClose: 1500,
          }
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed", {
        autoClose: 1500,
      });
    }
  };

  // Helper function to render form field with error handling
  const renderFormField = (field, label, type = "text", required = true) => (
    <div className="flex items-center gap-4">
      <label
        htmlFor={field}
        className="text-sm font-medium text-black w-1/3 flex items-center"
      >
        {label}
        {required && (
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
          id={field}
          name={field}
          type={type}
          placeholder={`${label}`}
          value={formData[field] || ""}
          onChange={handleInputChange}
          className={`block w-full rounded-md border px-3 py-2 text-sm ${
            errors[field]
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
          }`}
          aria-required={required ? "true" : "false"}
          aria-invalid={errors[field]}
        />
        {errors[field] && (
          <p className="mt-1 text-sm text-red-500" id={`${field}-error`}>
            This field is required.
          </p>
        )}
      </div>
    </div>
  );

  const renderDropdowns = (section, fields) => (
    <>
      <h2 className="text-base font-semibold text-black mt-6 mb-4">
        {section}:
      </h2>
      {fields.map((field) => (
        <Dropdown
          key={field.name}
          field={field.name}
          options={formData[field.options]}
          labelText={field.label}
          nameKey={field.nameKey}
          customValues={customValues}
          handleOtherSelection={handleOtherSelection}
          handleCustomValueChange={handleCustomValueChange}
          showOtherInputs={showOtherInputs}
          addNewValue={addNewValue}
          errors={errors}
          defaultValue={formData[field.name]}
          required={field.required}
        />
      ))}
    </>
  );

  return (
    <>
      <ToastContainer />
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-10">
          <h2 className="text-base font-semibold text-black mb-4">
            {isUpdate ? "Update Company Details:" : "Company Details:"}
          </h2>

          {renderFormField("companyName", "Name")}
          {renderFormField("companyEmail", "Email", "email")}
          {renderFormField("companyPhone", "Phone", "tel")}
          {renderFormField("village", "Village", "text", false)}
          {renderFormField("town", "Town", "text", false)}

          {renderDropdowns("Company Location", [
            {
              name: "city",
              options: "cities",
              label: "City",
              nameKey: "cityName",
              required: true,
            },
            {
              name: "state",
              options: "states",
              label: "State",
              nameKey: "stateName",
              required: true,
            },
            {
              name: "country",
              options: "countries",
              label: "Country",
              nameKey: "countryName",
              required: true,
            },
          ])}

          {renderDropdowns("Industry Details", [
            {
              name: "type",
              options: "typeList",
              label: "Type",
              nameKey: "typeName",
              required: true,
            },
            {
              name: "industryName",
              options: "industryNames",
              label: "Industry Name",
              nameKey: "industryName",
              required: true,
            },
          ])}

          {renderDropdowns("Headquarter Details", [
            {
              name: "HeadquarterCities",
              options: "cities",
              label: "City",
              nameKey: "cityName",
              required: true,
            },
            {
              name: "HeadquarterStates",
              options: "states",
              label: "State",
              nameKey: "stateName",
              required: true,
            },
            {
              name: "HeadquarterCountries",
              options: "countries",
              label: "Country",
              nameKey: "countryName",
              required: true,
            },
          ])}
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

export default CompanyForm;
