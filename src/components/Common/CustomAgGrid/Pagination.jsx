import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Select,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

/**
 * @memberof CustomAgGrid
 * Pagination component for the CustomAgGrid component.
 * @param {object} props
 * @param {object} props.gridApi The grid API object
 * @param {function} props.setDesiredPage A function to set the desired page number
 * @param {function} props.goToPage A function to navigate to the desired page
 * @param {number} props.desiredPage The desired page number
 * @param {function} props.handlePageSizeChange A function to handle page size change
 * @returns {React.ReactElement} The Pagination component
 */
function Pagination({
  gridApi=null,
  setDesiredPage,
  goToPage,
  desiredPage,
  handlePageSizeChange,
}) {
  const [selectedPageSize, setSelectedPageSize] = useState(10);

  // Update selectedPageSize when gridApi changes and pagination is available
  useEffect(() => {
    if (gridApi && gridApi.paginationProxy) {
      setSelectedPageSize(gridApi.paginationProxy.pageSize || 10);
    }
  }, [gridApi]);

  const totalPages = gridApi ? gridApi.paginationGetTotalPages() : 1;

  return (
    <Box
      sx={{
        py: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "white",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Go to Page */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            htmlFor="jumpToPageInput"
            sx={{
              fontSize: "12px",
              color: "var(--table-header-bg-color)",
              fontWeight: "500",
            }}
          >
            Go to Page:
          </Typography>
          <TextField
            size="small"
            type="number"
            value={desiredPage}
            onChange={(e) => setDesiredPage(parseInt(e.target.value, 10))}
            min="1"
            max={totalPages}
            InputProps={{
              sx: {
                height: "25px",
                width: "40px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: "25px",
              p: 0,
              width: "20px",
              m: 0,
              minWidth: "40px",
            }}
            onClick={() => goToPage(gridApi, desiredPage)}
          >
            Go
          </Button>
        </Box>

        {/* Page Size Selection */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            htmlFor="pageSizeSelect"
            sx={{
              fontSize: "12px",
              display: { xs: "none", sm: "block" },
              color: "var(--table-header-bg-color)",
              fontWeight: "500",
            }}
          >
            Page Size:
          </Typography>
          <Select
            size="small"
            id="pageSizeSelect"
            onChange={(e) => {
              const pageSize = parseInt(e.target.value, 10);
              handlePageSizeChange(gridApi, pageSize);
              setSelectedPageSize(pageSize);
            }}
            value={selectedPageSize}
            sx={{ height: "25px", width: "70px", fontSize: "12px" }}
          >
            <MenuItem sx={{ minHeight: "0px" }} value={10}>
              10
            </MenuItem>
            <MenuItem sx={{ minHeight: "0px" }} value={20}>
              20
            </MenuItem>
            <MenuItem sx={{ minHeight: "0px" }} value={50}>
              50
            </MenuItem>
            <MenuItem sx={{ minHeight: "0px" }} value={100}>
              100
            </MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
}

export default Pagination;
