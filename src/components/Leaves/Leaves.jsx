import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import StatusStyledComponent from "../Common/StatusStyledComponent/StatusStyledComponent";

function Leaves() {
  const rowData = [
    {
      id: 1,
      from: "2025-01-01",
      to: "2025-01-07",
      days: 7,
      status: "Approved",
      action: "Edit",
      reason: "Annual Leave",
    },
    {
      id: 2,
      from: "2025-02-15",
      to: "2025-02-20",
      days: 5,
      status: "Pending",
      action: "Cancel",
      reason: "Medical Leave",
    },
    {
      id: 3,
      from: "2025-03-10",
      to: "2025-03-12",
      days: 3,
      status: "Declined",
      action: "Reapply",
      reason: "Emergency Leave",
    },
    {
      id: 4,
      from: "2025-04-01",
      to: "2025-04-05",
      days: 5,
      status: "Withdrew",
      action: "Edit",
      reason: "Personal Reasons",
    },
    {
      id: 5,
      from: "2025-01-01",
      to: "2025-01-07",
      days: 7,
      status: "Approved",
      action: "Edit",
      reason: "Annual Leave",
    },
    {
      id: 6,
      from: "2025-02-15",
      to: "2025-02-20",
      days: 5,
      status: "Pending",
      action: "Cancel",
      reason: "Medical Leave",
    },
    {
      id: 7,
      from: "2025-03-10",
      to: "2025-03-12",
      days: 3,
      status: "Declined",
      action: "Reapply",
      reason: "Emergency Leave",
    },
    {
      id: 8,
      from: "2025-04-01",
      to: "2025-04-05",
      days: 5,
      status: "Withdrew",
      action: "Edit",
      reason: "Personal Reasons",
    },
  ];

  const columnDefs = [
    {
      headerName: "From",
      field: "from",
      minWidth: 200,
      filterable: false,
    },
    {
      headerName: "To",
      field: "to",
      minWidth: 200,
      cellStyle: { color: "#0074BD", fontWeight: 600 },
    },
    {
      headerName: "Days",
      field: "days",
      minWidth: 175,
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 200,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params) => {
        const status = params?.value;

        const getColorAndBackground = (status) => {
          switch (status) {
            case "Approved":
              return { color: "#1F5200", backgroundColor: "#CBFFAC" };
            case "Pending":
              return { color: "#755200", backgroundColor: "#FFF3A4" };
            case "Declined":
              return { color: "#9F0000", backgroundColor: "#FFB5B5" };
            case "Withdrew":
              return { color: "#0038A8", backgroundColor: "#C1D6FF" };
            default:
              return { color: "", backgroundColor: "" };
          }
        };

        const { color, backgroundColor } = getColorAndBackground(status);

        return status ? (
          <StatusStyledComponent
            color={color}
            backgroundColor={backgroundColor}
            value={status}
          />
        ) : null;
      },
    },
    {
      headerName: "Action",
      field: "action",
      minWidth: 200,
    },
    {
      headerName: "Reason",
      field: "reason",
      minWidth: 200,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        p: 3,
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" fontWeight={600}>
          Your Leaves
        </Typography>
        <Typography sx={{ color: "#4D535A" }}>
          Track your leave history and apply for new leaves easily.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained">Filter</Button>
          <Button variant="contained">Apply leave</Button>
        </Box>
      </Box>
      <Box>
        <CustomAgGrid
          rowData={rowData}
          columnDefs={columnDefs}
          paginationModel={{ page: 0, pageSize: 10 }}
          checkboxSelection={false}
        />
      </Box>
    </Box>
  );
}

export default Leaves;
