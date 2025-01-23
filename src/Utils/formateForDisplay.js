export const formatForDisplay = (text) => {
  return text
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const CapitalizeFirstLetter = (string) => {
  // Check if the string is empty or null
  if (!string) return string;

  // Split the string into an array of words
  const words = string.split(" ");

  // Capitalize the first letter of each word and join them back into a string
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
