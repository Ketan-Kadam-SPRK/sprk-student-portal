import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import { applyForEvent, getEventByUid } from "../event.action";
import { Close } from "@mui/icons-material";
import { formatDateTime } from "../../../Utils/dateTimeFormator";

function EventPreviewModal({
  eventUid,
  handleCloseEvent,
  eventStatus,
  handleGetAllEvents,
}) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();

  const [formData, setFormData] = useState({});
  const [studentDesc, setStudentDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventUid) {
      dispatch(getEventByUid({ headers, eventUid })).then((res) => {
        const data = res?.payload?.data?.data || {};
        setFormData(data);
        setStudentDesc(data?.studentDescription || "");
      });
    }
  }, [eventUid]);


  // ✅ Validation function
  const validateDescription = (value) => {
    // ✅ Mandatory field validation
    if (!value || value.trim() === "") {
      return "Please mention your skills";
    }

    // ✅ Minimum length validation
    if (value.trim().length < 10) {
      return "Skills description must be at least 10 characters";
    }

    // ✅ Maximum length validation
    if (value.length > 500) {
      return "Skills description must not exceed 500 characters";
    }

    return "";
  };

  // ✅ Handle change with validation
  const handleStudentDescChange = (e) => {
    const value = e.target.value;
    setStudentDesc(value);

    const validationError = validateDescription(value);
    setError(validationError);
  };

  // ✅ Handle Apply button
  const handleApplyToEvent = async () => {
    try {
      const validationError = validateDescription(studentDesc);

      if (validationError) {
        setError(validationError);
        return;
      }

      setLoading(true);

      const payload = {
        eventUid,
        studentDescription: studentDesc?.trim(),
      };

      await dispatch(applyForEvent({ headers, payload })).then((res) => {
        if (res.payload !== undefined) {
          handleCloseEvent();
          handleGetAllEvents();
        }

        setLoading(false);
      });
    } catch (err) {
      console.error("Apply event error:", err);
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle sx={{ px: 3, py: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600} sx={{ fontSize: "16px" }}>
            Event Details
          </Typography>

          <IconButton onClick={handleCloseEvent}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 1 }}>
          {/* Title */}
          <Box>
            <Typography>Event Title</Typography>

            <TextField
              fullWidth
              size="small"
              value={formData?.title || "-"}
              InputProps={{ readOnly: true }}
            />
          </Box>

          {/* Fees */}
          <Box>
            <Typography>Registration Fees</Typography>

            <TextField
              fullWidth
              size="small"
              value={formData?.reg_fees ?? "-"}
              InputProps={{ readOnly: true }}
            />
          </Box>

          {/* Dates */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography>Event Start</Typography>

              <Typography
                sx={{
                  p: 1,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {formatDateTime(formData?.start)}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography>Event End</Typography>

              <Typography
                sx={{
                  p: 1,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                {formatDateTime(formData?.end)}
              </Typography>
            </Box>
          </Box>

          {/* Summary */}
          <Box>
            <Typography>Summary</Typography>

            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              value={formData?.summary || "-"}
              InputProps={{ readOnly: true }}
            />
          </Box>

          {/* Description */}
          <Box>
            <Typography>Description</Typography>

            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                minHeight: "100px",
              }}
              dangerouslySetInnerHTML={{
                __html: formData?.description || "<p>-</p>",
              }}
            />
          </Box>

          {/* Images */}
          <Typography>Images</Typography>

          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              {formData?.images?.length ? (
                formData.images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "0.3s",

                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    <img
                      src={img.link}
                      alt={img.img_alt_text}
                      width={160}
                      height={110}
                      style={{
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                ))
              ) : (
                <Typography>-</Typography>
              )}
            </Box>
          </Box>

          {/* ✅ Skills Field */}
          <Box>
            <Typography>
              Mention Your Skills Below <span style={{ color: "red" }}>*</span>
            </Typography>

            <TextField
              fullWidth
              size="small"
              multiline
              rows={4}
              placeholder="Example: React.js, UI Development, Team Collaboration, Problem Solving..."
              value={studentDesc}
              onChange={handleStudentDescChange}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2,justifyContent:"flex-end",my:2 }}>
          <Button variant="outlined" onClick={handleCloseEvent}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleApplyToEvent}
            disabled={eventStatus !== "APPLY" || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Apply"}
          </Button>
        </Box>
      </DialogContent>

    </>
  );
}

export default EventPreviewModal;
