export const formatForDisplay = (text) => {
  return text
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
