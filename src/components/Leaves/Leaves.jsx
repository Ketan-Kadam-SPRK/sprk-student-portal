import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import PopupFilterComponent from "../Common/FilterMenuComponent/PopupFilterComponent";
import dateFormator from "../../Utils/dateFormator";
import ApplyLeaveModal from "./ApplyLeaveModal";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getAllLeaves, getWithdrawnLeaves } from "./action/leaves.action";
import ErrorHandling from "../Common/ErrorHandling";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import InfoIcon from '@mui/icons-material/Info';
import { LightTooltip } from "../../Utils/LightToolTip";

function Leaves() {
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);

  const [openWidrow, setOpenWidrow] = useState(false);
  const handleCloseWidrow = () => setOpenWidrow(!openWidrow);
  const [leaveId, setLeaveId] = useState(null);
  const initialState = {
    start: "",
    end: "",
    reason: "",
    id: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [leaveData, setleaveData] = useState([]);
  const [proofFile, setProofFile] = useState(null);
  const handleClose = () => {
    setOpen(!open);
    setFormData(initialState);
    setProofFile(null);
    setLeaveId(null);
  };

  const getAllLeavesData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllLeaves({ headers }));
      const data = res?.payload?.data?.data || [];
      console.log(data);
      const modifiedData = data.reverse();
      setleaveData(modifiedData);
      // setFilterData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLeavesData();
  }, []);

  const handleEdit = (rowData) => {
    console.log(rowData, "rowData");
    setOpen(true);
    const startDate = new Date(rowData?.start);
    startDate.setDate(startDate.getDate() + 1);
    const modifiedStart = startDate.toISOString().split("T")[0];

    // Extract the date part from end date
    const modifiedEnd = rowData?.end.split("T")[0];

    const modifiedData = {
      ...rowData,
      start: modifiedStart, // Update start date with added 1 day
      end: modifiedEnd,
    };
    console.log(modifiedData, "modifiedData");
    setFormData(modifiedData);
    setProofFile(rowData?.file);
    setLeaveId(rowData?.leaveRequestUid);
    console.log("Edit action clicked for row:", rowData);
    // Perform your edit logic here, such as opening a modal with row data
  };

  console.log(formData);

  const handleWithdraw = (rowData) => {
    setOpenWidrow(true);
    setLeaveId(rowData?.leaveRequestUid);
    console.log("Withdraw action clicked for row:", rowData?.leaveRequestUid
    );
    // Perform your withdraw logic here
  };
  const handleWithdrawConfirm = () => {
    dispatch(getWithdrawnLeaves({ headers, leaveId })).then((res) => {
      console.log(res);
    });
  }

  const handleOpenFile = (rowData) => {
    console.log("Row Data:", rowData); // Debugging
    const fileUrl = rowData;
    window.open(encodeURI(fileUrl), "_blank", "noopener,noreferrer");
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const data = Array.isArray(leaveData)
      ? leaveData.map((item, index) => ({
          ...item,
          id: item?.leaveRequestUid || index,
        }))
      : [];

    setRows(data);
    setFilterData(data);
  }, [leaveData]);

  const getInformation = (rowData) => {
    console.log(rowData?.denyReason
    );
    return (
      <Box sx={{ p: 2, maxWidth: { xs: "250px", sm: "280px", md: "400px" } }}>
        <Typography sx={{ fontWeight: "bold" }}>Deny Reason</Typography>
        <Typography sx={{ color: "#9E9E9E", pt: 1 }}>
         {rowData?.denyReason}
        </Typography>
      </Box>
    );
  };

  const columns = [
    {
      headerName: "From",
      id: "start",
      minWidth: 150,
      filterable: false,
      format: (value) => dateFormator(value),
    },
    {
      headerName: "To",
      id: "end",
      minWidth: 150,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => dateFormator(value, 1),
    },

    { headerName: "Days", id: "noOfDays", minWidth: 100 },
    { headerName: "Reason", id: "reason", minWidth: 250 },
    {
      headerName: "Status",
      id: "status",
      minWidth: 150,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      format: (status, rowData) => {
        const getColorAndBackground = (status) => {
          switch (status) {
            case "APPROVED":
              return { color: "#1F5200", backgroundColor: "#CBFFAC" };
            case "PENDING":
              return { color: "#755200", backgroundColor: "#FFF3A4" };
            case "DECLINED":
              return { color: "#9F0000", backgroundColor: "#FFB5B5" };
            case "WITHDREW":
              return { color: "#0038A8", backgroundColor: "#C1D6FF" };
            default:
              return { color: "", backgroundColor: "" };
          }
        };

        const { color, backgroundColor } = getColorAndBackground(status);
        return (
          <div
            style={{
              color: color,
              backgroundColor: backgroundColor,
              textAlign: "center",
              borderRadius: "20px",
              height: "35px",
              padding: "15px",
              minWidth: "150px",
              fontWeight: "bold",
              display: "flex",
              fontSize: "14px",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "200px",
            }}
          >
            {formatForDisplay(status)}
            {status === "DECLINED" && (
              <LightTooltip title={getInformation(rowData)} arrow>
              <InfoIcon
                sx={{ color: "#9F0000", marginLeft: "10px", fontSize: "16px",cursor:"pointer" }}
              />
              </LightTooltip>
            )}
          </div>
        );
      },
    },
    {
      headerName: "Managed By",
      id: "managedBy",
      minWidth: 200,
    },
    {
      headerName: "View Document",
      id: "file",
      minWidth: 150,
      format: (row) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => handleOpenFile(row)}
              disabled={row === null}
            >
              <InsertDriveFileIcon
                sx={{ color: row === null ? "#9B9B9B" : "#0074BD" }}
              />
            </IconButton>
          </Box>
        );
      },
    },

    {
      headerName: "Action",
      id: "leaveRequestUid",
      width: 100,
      format: (action, row) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              onClick={() => handleEdit(row)}
              disabled={row.status !== "PENDING"}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => 
                handleWithdraw(row)}
              disabled={row.status !== "PENDING"}
            >
              Withdraw
            </Button>
          </Box>
        );
      },
    },
  ];
  if (loading) {
    return <ErrorHandling error500={false} loadData={loading} />;
  }
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
              statusOptions={["APPROVED", "PENDING", "DECLINED", "WITHDREW"]}
              setFilterData={setFilterData}
              dateKey="start"
              statusKey="status"
              tabName="leave"
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

      <Dialog open={open} scroll={"body"} fullWidth={true}>
        <ApplyLeaveModal
          formData={formData}
          setFormData={setFormData}
          handleClose={handleClose}
          initialState={initialState}
          proofFile={proofFile}
          setProofFile={setProofFile}
          leaveId={leaveId}
          setLeaveId={setLeaveId}
          getAllLeavesData={getAllLeavesData}
        />
      </Dialog>
      <Dialog open={openWidrow} scroll={"body"} maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, pt: 1 }}>
              <ErrorIcon sx={{ color: "#FF0000" }} />
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
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
              <Button
                variant="outlined"
                color="error"
                sx={{ px: 6 }}
                onClick={() => setOpenWidrow(false)}
              >
                No
              </Button>
              <Button variant="contained" color="error" sx={{ px: 6 }} onClick={handleWithdrawConfirm}>
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
