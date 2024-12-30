const TrimmedString = (obj) => {
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  function trimStrings(obj) {
    if (isObject(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (typeof value === "string") {
            const trimmedValue = value.trim();
            obj[key] = trimmedValue === "" ? null : trimmedValue;
          } else if (isObject(value)) {
            trimStrings(value);
          }
        }
      }
    }
  }

  const trimmedObject = JSON.parse(JSON.stringify(obj));

  trimStrings(trimmedObject);

  return trimmedObject;
};

export default TrimmedString;
