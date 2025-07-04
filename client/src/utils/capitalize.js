/**
 * Capitalizes the first letter of each word in a string, but preserves emails
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export const capitalize = (str) => {
  if (!str) return "";

  // Handle string input
  if (typeof str === "string") {
    // Check if the string is an email
    if (isEmail(str)) {
      return str; // Return email as is
    }

    // Split the string by spaces and capitalize each word
    return str
      .split(" ")
      .map((word) => {
        // Skip empty strings
        if (!word) return "";
        // Capitalize the first letter and make the rest lowercase
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  // If not a string, return the original value converted to string
  return String(str);
};

/**
 * Capitalizes the first letter of the string
 * @param {string} str - The string to capitalize
 * @returns {string} - The string with first letter capitalized
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Checks if a string is an email
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is an email
 */
function isEmail(str) {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}
