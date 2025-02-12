export const searchFilterData = (data, searchQuery) => {
  const newQuickFilter =
    typeof searchQuery === "string" ? searchQuery.trim() : "";
  const quickfilterLower = newQuickFilter.toLowerCase();

  // Check if data is an array
  if (!Array.isArray(data)) {
    return [];
  }

  const filteredData = data.filter((item) => {
    return Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(quickfilterLower)
    );
  });

  return filteredData;
};
