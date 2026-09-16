import {
  Box,
  Typography,
  Checkbox,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useAuthHeaders } from "../../../../../Hooks/useAuthHeaders";
import ErrorHandling from "../../../../Common/ErrorHandling";

import { getModulesDetails } from "../../../action/batches.actions";
import StatusStyledComponent from "../../../../Common/StatusStyledComponent/StatusStyledComponent";
import { useBatch } from "../../BatchContext";

const REASON_MIN_LENGTH = 5;
const REASON_MAX_LENGTH = 250;

function RequestModules({ onClose }) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [error500, setError500] = useState(false);
  const [selectedModules, setSelectedModules] = useState([]);
  const [reason, setReason] = useState("");

  const { batchId } = useBatch();

  const getModules = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getModulesDetails({ headers, batchId }));
      const data = res?.payload?.data?.data || [];
      const status = res?.payload?.status;
      if (status === 500 || status === 503) {
        setError500(true);
      }
      setModules(data); // Ensure the sorted data is set
      setLoading(false);
    } catch (err) {
      console.error(err); // Log error for debugging
      setLoading(false);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  // Function to get the color and background color based on the status
  const getStatusStyles = (status) => {
    let color = "";
    let backgroundColor = "";

    switch (status) {
      case "COMPLETED":
        color = "#1F5200";
        backgroundColor = "#CBFFAC";
        break;
      case "IN_PROGRESS":
        color = "#0038A8";
        backgroundColor = "#C1D6FF";
        break;
      case "PENDING":
        color = "#755200";
        backgroundColor = "#FFF3A4";
        break;
      default:
        color = "#000000";
        backgroundColor = "#F5F5F5";
        break;
    }

    return { color, backgroundColor };
  };

  const handleToggleModule = (index) => {
    setSelectedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isReasonValid =
    reason.trim().length >= REASON_MIN_LENGTH &&
    reason.trim().length <= REASON_MAX_LENGTH;

  const handleSubmit = () => {
    const payload = {
      batchId,
      selectedModules: selectedModules.map((i) => modules[i]),
      reason,
    };
    // TODO: hook this up to the actual submit action/dispatch
    console.log("Submitting", payload);
    setSelectedModules([]);
    setReason("");
  };

  const handleCancel = () => {
    setSelectedModules([]);
    setReason("");
  };

  if (loading || error500) {
    return <ErrorHandling error500={error500} loadData={loading} />;
  }

  return (
    <Box
      sx={{
        height: "80vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔹 Fixed Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #E0E0E0",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ color: "black", fontWeight: 700, fontSize: "18px" }}>
          Reassign Request
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "#085186" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {modules?.length > 0 ? (
        <>
          {/* 🔹 Scrollable Modules List */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {modules?.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: "10px",
                  alignItems: "center",
                  p: 2,
                  boxShadow:
                    " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  borderRadius: "8px", // Rounds the corners
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Checkbox
                    checked={selectedModules.includes(index)}
                    onChange={() => handleToggleModule(index)}
                    sx={{
                      color: "#085186",
                      "&.Mui-checked": {
                        color: "#085186",
                      },
                    }}
                  />
                  <Box>
                    <Typography sx={{ color: "#085186", fontWeight: 600 }}>
                      {item?.module}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: {
                      xs: "8px",
                      md: "20px",
                    },
                    gap: "5px",
                    py: 1,
                    borderRadius: "25px",
                  }}
                >
                  <StatusStyledComponent
                    value={item?.moduleCompletionStatus}
                    {...getStatusStyles(item?.moduleCompletionStatus)} // Spread the returned styles from getStatusStyles
                  />
                </Box>
              </Box>
            ))}
          </Box>
          {/* 🔹 Sticky Reason + Buttons */}
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              p: 1,
              //   borderTop: "1px solid #E0E0E0",
              backgroundColor: "white",
            }}
          >
            <Typography sx={{ color: "#085186", fontWeight: 600 }}>
              Reason
            </Typography>
            <TextField
              multiline
              minRows={1}
              maxRows={2}
              placeholder="Enter reason here"
              value={reason}
              onChange={(e) => {
                if (e.target.value.length <= REASON_MAX_LENGTH) {
                  setReason(e.target.value);
                }
              }}
              fullWidth
              error={reason.length > 0 && !isReasonValid}
              helperText={
                reason.length > 0 && reason.trim().length < REASON_MIN_LENGTH
                  ? `Minimum ${REASON_MIN_LENGTH} characters required`
                  : `${reason.length}/${REASON_MAX_LENGTH}`
              }
              InputProps={{
                sx: {
                  padding: "8px 10px",
                  fontSize: "14px",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                mt: 0.5,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ color: "#085186", borderColor: "#085186" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={selectedModules.length === 0 || !isReasonValid}
                sx={{ backgroundColor: "#085186" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Typography sx={{ color: "grey", fontSize: "12px" }}>
            No Modules Found
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default RequestModules;
