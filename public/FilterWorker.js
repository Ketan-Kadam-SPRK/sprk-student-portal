/* eslint-disable no-restricted-globals */

/**
 * self.onmessage is the event handler for the worker that filters the data based on
 * the given filterState, dateKey and statusKey. The filterState object contains
 * three properties: quickFilter, startDate and endDate. The quickFilter property is
 * used to filter the data based on a search term. The startDate and endDate properties
 * are used to filter the data based on a date range. The dateKey and statusKey are used
 * to filter the data based on a specific date column and status column respectively.
 * The event handler posts the filtered data back to the main thread.
 * @param {object} e - The event object containing the data to be filtered.
 * @param {array} e.data.rowData - The data to be filtered.
 * @param {object} e.data.filterState - The filter state containing the search term, start and end dates.
 * @param {string} e.data.dateKey - The key of the date column to be filtered.
 * @param {string} e.data.statusKey - The key of the status column to be filtered.
 */
self.onmessage = function (e) {
  const { rowData, filterState, dateKey, statusKey } = e.data;

  const filterData = (rowData, filterState, dateKey, statusKey) => {
    let filteredData = rowData;

    if (filterState?.quickFilter) {
      const searchTerm = filterState?.quickFilter?.trim()?.toLowerCase();
      filteredData = filteredData?.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm)
        )
      );
    }

    if (filterState?.startDate && filterState?.endDate && dateKey) {
      const startDate = new Date(filterState?.startDate);
      const endDate = filterState?.endDate
        ? new Date(filterState?.endDate)
        : new Date();

      startDate.setDate(startDate.getDate() - 1);

      filteredData = filteredData?.filter((item) => {
        const itemDate = new Date(item[dateKey]);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    if (filterState?.selectedStatus?.length > 0 && statusKey) {
      filteredData = filteredData?.filter((item) =>
        filterState.selectedStatus.includes(item[statusKey])
      );
    }

    return filteredData;
  };

  const result = filterData(rowData, filterState, dateKey, statusKey);
  self.postMessage(result);
};
