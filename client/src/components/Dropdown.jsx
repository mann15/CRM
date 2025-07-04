import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({
  field,
  options,
  labelText,
  nameKey,
  customValues,
  showOtherInputs,
  handleOtherSelection,
  handleCustomValueChange,
  addNewValue,
  errors,
  defaultValue = "",
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const initialSetupDone = useRef(false);

  useEffect(() => {
    if (
      initialSetupDone.current ||
      !options ||
      options.length === 0 ||
      !defaultValue
    ) {
      return;
    }

    // Find the option that matches the default value
    const idKey = `${field}Id`;
    const selectedOption = options.find(
      (option) =>
        option[idKey] === defaultValue || option[nameKey] === defaultValue
    );

    if (selectedOption) {
      setSelectedValue(selectedOption[nameKey]);
      // Update parent without triggering handleCustomValueChange's own effects
      initialSetupDone.current = true;
    }
  }, [defaultValue, options, field, nameKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset search when dropdown closes
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Focus search input when dropdown opens
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter options based on search term
  useEffect(() => {
    if (!options) return;

    if (searchTerm === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option[nameKey].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options, nameKey]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      // Reset search when dropdown closes
      setSearchTerm("");
    }
  };

  const selectOption = (optionName) => {
    setIsOpen(false);
    setSelectedValue(optionName);
    setSearchTerm("");
    handleOtherSelection(field, optionName);
    handleCustomValueChange(field, optionName);
  };

  const selectOther = () => {
    handleOtherSelection(field, "other");
    setSelectedValue("");
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex items-start gap-4" ref={dropdownRef}>
      <label
        htmlFor={field}
        className="text-sm font-medium self-center text-black w-1/3 flex items-center"
      >
        {labelText}
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
        {!showOtherInputs[field] && (
          <button
            className={`flex-1 block w-full rounded-md border px-3 py-2 text-sm bg-white text-left ${
              errors[field]
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
            }`}
            type="button"
            onClick={toggleDropdown}
            aria-required={required}
            aria-invalid={errors[field]}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            {selectedValue || customValues[field] || `Select ${field}`}
          </button>
        )}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--label-broder-color)] rounded-md shadow-md">
            <div className="p-2 border-b border-gray-200">
              <input
                ref={searchInputRef}
                type="text"
                className="w-full px-2 py-1 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label={`Search ${field} options`}
              />
            </div>
            <ul className="max-h-60 overflow-y-auto" role="listbox">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li key={index} role="option">
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
                      type="button"
                      onClick={() => selectOption(option[nameKey])}
                    >
                      {option[nameKey]}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500 italic">
                  No matches found
                </li>
              )}

              {searchTerm === "" &&
                field !== "university" &&
                field !== "HeadquarterCities" &&
                field !== "HeadquarterStates" &&
                field !== "HeadquarterCountries" && (
                  <li role="option">
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-200"
                      type="button"
                      onClick={selectOther}
                    >
                      Other
                    </button>
                  </li>
                )}
            </ul>
          </div>
        )}
        {showOtherInputs[field] && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={customValues[field] || ""}
              onChange={(e) => handleCustomValueChange(field, e.target.value)}
              className={`flex-1 block w-full rounded-md border px-3 py-2 text-sm bg-white ${
                errors[field]
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-[var(--label-broder-color)] focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder={`Enter new ${field}`}
              aria-required={required}
              aria-invalid={errors[field]}
            />
            <button
              type="button"
              onClick={() => addNewValue(field)}
              className="rounded-md px-3 py-1.5 text-sm font-semibold bg-[var(--email-color)] text-white shadow-sm"
            >
              Add
            </button>
          </div>
        )}

        {errors[field] && (
          <p className="mt-1 text-sm text-red-500" id={`${field}-error`}>
            This field is required.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
