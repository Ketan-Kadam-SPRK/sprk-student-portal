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
      <Box display="flex" alignItems="center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Box textAlign="center" sx={{ minWidth: "60px" }}>
              {/* Show the appropriate icon based on completion status */}
              {step.completed ? (
                <CheckCircleIcon style={{ color: "purple" }} />
              ) : (
                <RadioButtonUncheckedIcon style={{ color: "gray" }} />
              )}
              <Typography variant="caption">{step.label}</Typography>
            </Box>
            {/* Connector line between steps */}
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
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressBar;
