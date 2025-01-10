import React, { useState, useEffect } from "react";
import {
  Menu,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  TextField,
  Badge,
  Box,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useLocation } from "react-router-dom";

function modifyCapitalization(inputString) {
  return inputString
    .toLowerCase()
    .replace(/(?:^|_)(\w)/g, (match) => match.toUpperCase());
}

function PopupFilterComponent({
  statusOptions = [],
  setFilterData,
  rowData = [],
  dateKey = null,
  statusKey = null,
  tabName = "",
  filterData
}) {
  const location = useLocation();
  const searchQuery = location?.state?.searchQuery;
  const bookingCode = location?.state?.bcode;
  const [filterState, setFilterState] = useState(() => {
    const savedFilter = localStorage.getItem(`${tabName}Filter`);
    return savedFilter
      ? JSON.parse(savedFilter)
      : {
          quickFilter: "",
          selectAll: false,
          startDate: null,
          endDate: null,
          selectedStatus: [],
        };
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState({
    startError: "",
    endError: "",
  });

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 console.log(statusOptions);
 console.log(filterState)
 console.log(filterData)
  useEffect(() => {
    const PersistFilterData = localStorage.getItem(`${tabName}Filter`);
    if (PersistFilterData && tabName !== "") {
      try {
        const retrievedObject = JSON.parse(PersistFilterData);
        setFilterState(retrievedObject);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, [tabName]);

  useEffect(() => {
    if (tabName !== "") {
      localStorage.setItem(`${tabName}Filter`, JSON.stringify(filterState));
    }
  }, [filterState, tabName]);

  useEffect(() => {
    if (searchQuery || bookingCode) {
      setFilterState((prev) => ({
        ...prev,
        quickFilter: searchQuery || bookingCode,
      }));
    }
  }, [rowData, searchQuery, bookingCode]);

  useEffect(() => {
    applyFilter();
  }, [filterState?.quickFilter]);

  const applyFilter = () => {
    console.log("im in apply filter");
    if (dateError.startError !== "" || dateError.endError !== "") {
      console.log(dateError,"i n error");
      return;
    }

    setLoading(true);

    // Initialize worker and pass data
    const worker = new Worker("/FilterWorker.js");

    worker.onmessage = function (e) {
      console.log(e.data)
      setFilterData(e.data);
      setLoading(false);
      handleClose();
    };

    worker.onerror = function (error) {
      console.error("Error in worker:", error);
      setLoading(false);
    };

    worker.postMessage({
      rowData,
      filterState,
      dateKey,
      statusKey,
    });
  };

  useEffect(() => {
    setFilterState((prevState) => ({
      ...prevState,
      selectAll: prevState.selectedStatus.length === statusOptions.length,
    }));
  }, [filterState.selectedStatus, statusOptions]);

  const handleStatusToggle = (status) => () => {
    const currentIndex = filterState.selectedStatus.indexOf(status);
    const newSelectedStatus = [...filterState.selectedStatus];

    if (currentIndex === -1) {
      newSelectedStatus.push(status);
    } else {
      newSelectedStatus.splice(currentIndex, 1);
    }

    setFilterState((prevState) => ({
      ...prevState,
      selectedStatus: newSelectedStatus,
    }));
  };

  const handleSelectAllToggle = () => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedStatus: prevState.selectAll ? [] : statusOptions,
      selectAll: !prevState.selectAll,
    }));
  };


  const handleClearFilter = () => {
    setFilterState({
      quickFilter: "",
      startDate: null,
      endDate: null,
      selectedStatus: [],
      selectAll: false,
    });
    setFilterData(rowData);
    handleClose();
    setDateError({
      startError: "",
      endError: "",
    });
  };

  const isValidDateFormat = (date) => {
    if (date === null || date === "") {
      return true; // Treat null or empty as valid
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date) && !isNaN(new Date(date).getTime());
  };


  const handleDateChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate") {
      validateDates(value, filterState.endDate);
    } else if (name === "endDate") {
      validateDates(filterState.startDate, value);
    }
    setFilterState((prevState) => ({
      ...prevState,
      [name]: isValidDateFormat(value) ? value : null,
    }));
  };


  const validateDates = (startDate, endDate) => {
    const error = {};
    error.startError = !isValidDateFormat(startDate)
      ? "Invalid start date"
      : !startDate && endDate
      ? "Start date is required if end date is provided"
      : startDate && endDate && new Date(startDate) > new Date(endDate)
      ? "Start date cannot be greater than end date"
      : "";

    error.endError = !isValidDateFormat(endDate)
      ? "Invalid end date"
      : startDate && !endDate
      ? "End date is required if start date is provided"
      : "";

    setDateError(error);
    return error;
  };

  return (
    <Box
      sx={{
        display: "flex",
        py: 1,
        alignItems: "center",
        gap: "10px",
      }}
    >
      <TextField
        type="search"
        size="small"
        sx={{
          width: { xs: "100%", sm: "300px" },
          backgroundColor: "white",
          borderRadius: 1,
        }}
        value={filterState.quickFilter}
        onChange={(e) => {
          setFilterState((prevState) => ({
            ...prevState,
            quickFilter: e.target.value,
          }));
        }}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ position: "relative" }}>
        <Button
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          sx={{
            width: "120px",
          }}
          onClick={handleOpen}
          endIcon={
            <Badge
              badgeContent={
                (filterState.startDate || filterState.endDate) &&
                filterState.selectedStatus.length > 0
                  ? 2
                  : filterState.startDate ||
                    filterState.endDate ||
                    filterState.selectedStatus.length > 0
                  ? 1
                  : 0
              }
              color="secondary"
            >
              <FilterAltIcon
                sx={{
                  color:
                    filterState.startDate ||
                    filterState.endDate ||
                    filterState.selectedStatus.length > 0
                      ? "orange"
                      : "white",
                }}
              />
            </Badge>
          }
        >
          Filter
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ position: "absolute", top: "0", right: "0px" }}
        >
          <Box sx={{ px: 2, pb: 1, maxWidth: "200px" }}>
            {statusOptions.length > 0 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterState.selectAll}
                    onChange={handleSelectAllToggle}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body1" sx={{ fontSize: "14px" }}>
                    Select All
                  </Typography>
                }
                sx={{ py: 0 }}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {statusOptions?.map((status, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={filterState.selectedStatus.includes(status)}
                      onChange={handleStatusToggle(status)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ fontSize: "14px" }}>
                      {modifyCapitalization(status).replace("_", " ")}
                    </Typography>
                  }
                  sx={{ py: 0 }}
                />
              ))}
            </div>
            {dateKey !== null && (
              <div>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  From:
                </Typography>
                <TextField
                  type="date"
                  size="small"
                  name="startDate"
                  fullWidth
                  value={filterState.startDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: "9999-12-31", // Replace with your desired maximum date
                  }}
                  error={!!dateError.startError}
                  helperText={dateError.startError}
                />
              </div>
            )}

            {dateKey !== null && (
              <div>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "bold", mr: 2 }}
                >
                  To:{" "}
                </Typography>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={filterState.endDate}
                  name="endDate"
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: "9999-12-31", // Replace with your desired maximum date
                  }}
                  error={!!dateError.endError}
                  helperText={dateError.endError}
                />
              </div>
            )}

            <Button
              variant="contained"
              onClick={applyFilter}
              fullWidth
              sx={{ px: 3, fontSize: "12px", mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Apply"}
            </Button>

            <Button
              variant="contained"
              onClick={handleClearFilter}
              fullWidth
              sx={{ px: 3, fontSize: "12px", mt: 1 }}
            >
              Clear
            </Button>
          </Box>
        </Menu>
      </div>
    </Box>
  );
}

export default PopupFilterComponent