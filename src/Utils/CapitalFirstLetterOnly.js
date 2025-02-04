export const CapitalFirstLetterOnly = (string) => {
    // Check if the string is empty or null
    if (!string) return string;
  
    // Check if the string is all uppercase
    const isAllUppercase = string === string.toUpperCase();
  
    // Capitalize the first letter of the first word
    const capitalizedFirstLetter = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  
    // If the string is all uppercase, convert the rest of the string to lowercase
    return isAllUppercase ? capitalizedFirstLetter : string.charAt(0).toUpperCase() + string.slice(1);
  };