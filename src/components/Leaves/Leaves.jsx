import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import StatusStyledComponent from "../Common/StatusStyledComponent/StatusStyledComponent";
import dateFormator from "../../Utils/dateFormator";
import PopupFilterComponent from "../Common/FilterMenuComponent/PopupFilterComponent";
import ApplyLeaveModal from "./ApplyLeaveModal";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

function Leaves() {
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);
  const [openWidrow, setOpenWidrow] = useState(false);
  const handleCloseWidrow = () => setOpenWidrow(!openWidrow);

  const rowData = [
    {
      id: 1,
      from: "2025-01-01T12:00:00Z",
      to: "2025-01-07T12:00:00Z",
      days: 7,
      status: "Approved",
      action: "Edit",
      reason: "Annual Leave",
    },
    {
      id: 2,
      from: "2025-02-15T12:00:00Z",
      to: "2025-02-20T12:00:00Z",
      days: 5,
      status: "Pending",
      action: "Cancel",
      reason: "Medical Leave",
    },
    {
      id: 3,
      from: "2025-03-10T12:00:00Z",
      to: "2025-03-12T12:00:00Z",
      days: 3,
      status: "Declined",
      action: "Reapply",
      reason: "Emergency Leave",
    },
    {
      id: 4,
      from: "2025-04-01T12:00:00Z",
      to: "2025-04-05T12:00:00Z",
      days: 5,
      status: "Withdrew",
      action: "Edit",
      reason: "Personal Reasons",
    },
    {
      id: 5,
      from: "2025-01-01T12:00:00Z",
      to: "2025-01-07T12:00:00Z",
      days: 7,
      status: "Approved",
      action: "Edit",
      reason: "Annual Leave",
    },
    {
      id: 6,
      from: "2025-02-15T12:00:00Z",
      to: "2025-02-20T12:00:00Z",
      days: 5,
      status: "Pending",
      action: "Cancel",
      reason: "Medical Leave",
    },
    {
      id: 7,
      from: "2025-03-10T12:00:00Z",
      to: "2025-03-12T12:00:00Z",
      days: 3,
      status: "Declined",
      action: "Reapply",
      reason: "Emergency Leave",
    },
    {
      id: 8,
      from: "2025-04-01T12:00:00Z",
      to: "2025-04-05T12:00:00Z",
      days: 5,
      status: "Withdrew",
      action: "Edit",
      reason: "Personal Reasons",
    },
  ];

  const rows = rowData.map((item, index) => ({
    ...item,
    id: item.id || index,
  }));

  const columns = [
    {
      headerName: "From",
      id: "from",
      minWidth: 200,
      filterable: false,
      format: (value) => dateFormator(value),
    },
    {
      headerName: "To",
      id: "to",
      minWidth: 200,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => dateFormator(value),
    },
    { headerName: "Days", id: "days", minWidth: 100 },
    {
      headerName: "Status",
      id: "status",
      minWidth: 150,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      format: (status) => {
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
        return (
          <StatusStyledComponent
            color={color}
            backgroundColor={backgroundColor}
            value={status}
          />
        );
      },
    },
    {
      headerName: "Action",
      id: "action",
      width: 100,
      format: (action, row) => {
        return (
          <Button
            variant="contained"
            size="small"
            onClick={handleCloseWidrow}
            disabled={row.status !== "Pending"}
          >
            Withdraw
          </Button>
        );
      },
    },
    { headerName: "Reason", id: "reason", minWidth: 250 },
  ];

  console.log(filterData);
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
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box>
            <PopupFilterComponent
              rowData={rows}
              statusOptions={["Approved", "Pending", "Declined", "Withdrew"]}
              setFilterData={setFilterData}
              filterData={filterData}
              dateKey="from"
              statusKey="status"
              // tabName="enrollments"
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Apply Leave
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <CustomAgGrid
          rows={filterData}
          columns={columns}
          paginationModel={{ page: 0, pageSize: 10 }}
          checkboxSelection={false}
        />
      </Box>

      <Dialog open={open} scroll={"body"}  fullWidth={true}>
        <ApplyLeaveModal handleClose={handleClose} />
      </Dialog>
      <Dialog open={openWidrow} scroll={"body"}  maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 1,pt:1}}>
              <ErrorIcon sx={{ color: "#FF0000" }} />
              <Typography sx={{fontSize:'18px',fontWeight:600}}>
                Are you sure you want to withdraw your leave request?
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={() => setOpenWidrow(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" color="error" sx={{ px: 6 }} onClick={() => setOpenWidrow(false)}>
                No
              </Button>
              <Button variant="contained" color="error" sx={{ px: 6 }}>
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default Leaves;
