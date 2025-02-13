import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

//mui icons
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

//common component, utils and hooks
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import PopupFilterComponent from "../Common/FilterMenuComponent/PopupFilterComponent";
import dateFormator from "../../Utils/dateFormator";
import ErrorHandling from "../Common/ErrorHandling";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import { LightTooltip } from "../../Utils/LightToolTip";

//child components and actions
import ApplyLeaveModal from "./ApplyLeaveModal";
import { getAllLeaves, getWithdrawnLeaves } from "./action/leaves.action";
import { Image } from "cloudinary-react";

function Leaves() {
  const initialState = {
    start: "",
    end: "",
    reason: "",
    id: "",
  };
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openWidrow, setOpenWidrow] = useState(false);
  const handleCloseWidrow = () => setOpenWidrow(!openWidrow);
  const [leaveId, setLeaveId] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [leaveData, setleaveData] = useState([]);
  const [proofFile, setProofFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [withdrawnLoad, setWithdrawnLoad] = useState(false);
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
      const modifiedData = data.reverse();
      setleaveData(modifiedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLeavesData();
  }, []);

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

  const handleEdit = (rowData) => {
    setOpen(true);
    const startDate = new Date(rowData?.start);
    startDate.setDate(startDate.getDate() + 1);
    const modifiedStart = startDate.toISOString().split("T")[0];
    const modifiedEnd = rowData?.end.split("T")[0];

    const modifiedData = {
      ...rowData,
      start: modifiedStart, // Update start date with added 1 day
      end: modifiedEnd,
    };
    setFormData(modifiedData);
    setProofFile(rowData?.file);
    setLeaveId(rowData?.leaveRequestUid);
  };

  const handleWithdraw = (rowData) => {
    setOpenWidrow(true);
    setLeaveId(rowData?.leaveRequestUid);
  };
  const handleWithdrawConfirm = async () => {
    setWithdrawnLoad(true);
    try {
      const res = await dispatch(getWithdrawnLeaves({ headers, leaveId })).then(
        (res) => {
          if (res.payload !== undefined) {
            handleCloseWidrow();
            getAllLeavesData();
            setWithdrawnLoad(false);
            setLeaveId(null);
          }
        }
      );
    } catch (error) {
      console.error("Error withdrawing leave:", error);
      setWithdrawnLoad(false);
    }
  };

  const handleOpenFile = (rowData) => {
    const fileUrl = rowData;
    window.open(encodeURI(fileUrl), "_blank", "noopener,noreferrer");
  };

  const getInformation = (rowData) => {
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
      minWidth: 120,
      filterable: false,
      format: (value) => dateFormator(value),
    },
    {
      headerName: "To",
      id: "end",
      minWidth: 120,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => dateFormator(value, 1),
    },

    { headerName: "Days", id: "noOfDays", minWidth: 80 },
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
            {status === "DECLINED" && rowData?.denyReason && (
              <LightTooltip title={getInformation(rowData)} arrow>
                <InfoIcon
                  sx={{
                    color: "#9F0000",
                    marginLeft: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                />
              </LightTooltip>
            )}
          </div>
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
              onClick={() => handleWithdraw(row)}
              disabled={row.status !== "PENDING"}
            >
              Withdraw
            </Button>
          </Box>
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
  ];

  console.log(leaveId);

  if (loading) {
    return <ErrorHandling error500={false} loadData={loading} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        overflow: "auto",
        flex: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="h4" fontWeight={600}>
            Your Leaves
          </Typography>
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739277438/calendar-with-checklist-date-schedule-3d-icon-removebg-preview_1_vtiyrw.svg"
            cloudName="dxlzzgbfw"
            style={{
              width: "30px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography
          fontSize={"var(--font-size-medium)"}
          sx={{ color: "#4D535A",}}
        >
          Track your leave history easily.
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  setLeaveId(null);
                }}
              >
                Apply Leave
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomAgGrid
            rows={filterData}
            columns={columns}
            paginationModel={{ page: 0, pageSize: 10 }}
            checkboxSelection={false}
            errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737008545/calendar_with_marks_uh7eeu.svg"
            errorHeading="No leaves applied yet. "
            errorDescription="Click 'Apply Leave' to get started."
          />
        </Box>
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
      <Dialog open={openWidrow} scroll={"body"} maxWidth="xs">
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
              <Button
                variant="contained"
                color="error"
                sx={{ px: 6 }}
                onClick={handleWithdrawConfirm}
                disabled={withdrawnLoad}
              >
                {withdrawnLoad ? <CircularProgress size={20} /> : "Yes"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default Leaves;
