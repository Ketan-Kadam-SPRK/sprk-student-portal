import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// CircularProgressWithLabel component to display the circular progress with a label inside
function CircularProgressWithLabel({ value, totalValue, progress }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* Background circle (gray) */}
      <CircularProgress
        variant="determinate"
        value={100} // Full circle
        sx={{
          color: "#e0e0e0", // Gray background color
          position: "absolute",
        }}
        thickness={4.5} // Optional: Adjust thickness
      />
      {/* Progress circle (primary blue) */}
      <CircularProgress
        variant="determinate"
        value={(value / totalValue) * 100}
        sx={{
          color: "#1976D2", // Primary blue color
        }}
        thickness={4.5} // Optional: Match thickness with the background
      />
      {/* Label inside the circle */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "#1976D2", fontWeight: "bold" }}
        >
          {progress}
        </Typography>
      </Box>
    </Box>
  );
}

// PropTypes for type-checking
CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired,
  progress: PropTypes.string.isRequired,
};

export default CircularProgressWithLabel;
