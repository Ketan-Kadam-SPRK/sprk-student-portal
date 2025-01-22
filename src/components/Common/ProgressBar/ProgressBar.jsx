import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

/**
 * ProgressBar Component
 * @param {Object} props - Component props
 * @param {Array} props.steps - Array of steps with `label` and `completed` properties
 * @param {string} [props.title] - Title to display above the progress bar
 */
const ProgressBar = ({ steps, title = "Progress" }) => {
  return (
    <Box p={2}>
      {/* Title Section */}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {/* Steps Section */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {steps.map((step, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                minWidth: "60px",
                display: "flex",
                flexDirection: "column", // Align the icon and label vertically
                alignItems: "center",
              }}
            >
              {/* Icon Box */}
              <Box>
                {step.completed ? (
                  <CheckCircleIcon style={{ color: "purple" }} />
                ) : (
                  <RadioButtonUncheckedIcon style={{ color: "gray" }} />
                )}
              </Box>

              {/* Label Box */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ marginTop: "4px", textAlign: "center" }}
                >
                  {step.label}
                </Typography>
              </Box>
            </Box>

            {index < steps.length - 1 && (
              <Box
                sx={{
                  height: "4px",
                  width: "40px",
                  backgroundColor: step.completed ? "purple" : "gray",
                  mx: 1,
                }}
              />
            )}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressBar;
