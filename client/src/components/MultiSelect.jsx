import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MultiSelect = ({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options",
  label,
  onAddCustomValue = () => {},
  employeeId = null, // Add employeeId prop to know which employee's designations to remove
}) => {
  const { routeType } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddCustomValue = async () => {
    if (!customValue.trim()) return;

    if (customValue.toLowerCase() === "other") {
      toast.error("Invalid designation name.", {
        autoClose: 1500,
      });
      return;
    }

    // Check if value already exists
    if (
      formattedOptions.some(
        (option) => option.label.toLowerCase() === customValue.toLowerCase()
      )
    ) {
      alert("This designation already exists.");
      return;
    }

    try {
      const response = await axios.post(`/api/designation`, {
        designationType: routeType,
        designationName: customValue,
      });

      // Add the new option dynamically
      onAddCustomValue({ value: customValue, label: customValue });
      setCustomValue("");
      setShowOtherInput(false);
    } catch (error) {
      console.error("Error adding designation:", error);
      alert("Failed to add designation. Please try again.");
    }
  };

  // Convert string options to proper format if needed
  const formattedOptions = Array.isArray(options)
    ? options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
      )
    : [];

  // Add "Other" option if it doesn't exist
  const allOptions = [...formattedOptions];
  if (!allOptions.some((option) => option.value === "other")) {
    allOptions.push({ value: "other", label: "Other" });
  }

  // Filter options based on search term
  const filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle option selection
  const toggleOption = (option) => {
    if (option.value === "other") {
      setShowOtherInput(true);
      return;
    }

    const newSelection = selectedValues.includes(option.value)
      ? selectedValues.filter((value) => value !== option.value)
      : [...selectedValues, option.value];
    onChange(newSelection);
  };

  // Remove a selected value and call API to delete relationship
  const removeValue = async (valueToRemove) => {
    // First, update the UI
    const newSelection = selectedValues.filter(
      (value) => value !== valueToRemove
    );
    onChange(newSelection);

    // If we have an employeeId, call the API to remove the relationship
    if (employeeId) {
      try {
        // Get the designation ID for the value we're removing
        const designationResponse = await axios.post(`/api/designation/name`, {
          designationName: [valueToRemove],
          designationType: routeType,
        });

        if (
          designationResponse.data.success &&
          designationResponse.data.data.length > 0
        ) {
          const designationId = designationResponse.data.data[0].designationId;

          // Now delete the relationship
          await axios.delete(`/api/${routeType}/employeeHasDesignation`, {
            data: {
              employeeId: employeeId,
              designationId: designationId,
            },
          });

          console.log(
            `Successfully removed ${valueToRemove} designation from employee ${employeeId}`
          );
        }
      } catch (error) {
        console.error("Error removing designation relationship:", error);
        alert(
          "Failed to remove designation. The UI has been updated but the server may not reflect this change."
        );
      }
    }
  };

  // Get selected options' labels
  const getSelectedLabels = () => {
    return formattedOptions
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Selected items display */}
        <div
          className="min-h-[42px] w-full border border-[var(--label-broder-color)] rounded-md bg-white p-1 flex flex-wrap items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          aria-label="Open dropdown"
        >
          {selectedValues.length > 0 ? (
            <div className="flex flex-wrap gap-1 p-1">
              {getSelectedLabels().map((label, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  {label}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      const option = formattedOptions.find(
                        (opt) => opt.label === label
                      );
                      if (option) removeValue(option.value);
                    }}
                  />
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 p-1">{placeholder}</span>
          )}
          <ChevronDown
            size={20}
            className={`ml-auto mr-1 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--label-broder-color)] rounded-md shadow-lg max-h-60 overflow-auto">
            {/* Search input */}
            <div className="sticky top-0 bg-white p-2 border-b border-[var(--label-broder-color)]">
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-[var(--label-broder-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Custom value input when "Other" is selected */}
            {showOtherInput && (
              <div className="p-2 border-b border-[var(--label-broder-color)] bg-gray-50">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 text-sm border border-[var(--label-broder-color)] rounded-md focus:outline-none"
                    placeholder="Enter new Designation"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddCustomValue();
                    }}
                    className="rounded-md px-3 py-1.5 text-sm font-semibold bg-[var(--email-color)] text-white shadow-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* Options list */}
            <div className="py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`px-3 py-2 text-sm cursor-pointer flex items-center gap-2
                      ${
                        selectedValues.includes(option.value)
                          ? "bg-blue-50 text-blue-800"
                          : "hover:bg-gray-100"
                      }`}
                    onClick={() => toggleOption(option)}
                  >
                    {option.value !== "other" && (
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        readOnly
                      />
                    )}
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
