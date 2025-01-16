import React from "react";
import PropTypes from "prop-types";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[3],
    fontSize: 12,
    maxWidth: 500,
    listStyleType: "disc",
    paddingLeft: "10px",
    maxHeight: "300px",
    overflowY: "auto",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
}));

StyledTooltip.propTypes = {
  className: PropTypes.string,
  // theme: PropTypes.object.isRequired, // Assuming 'theme' is being passed as a prop
};

export const LightTooltip = StyledTooltip;
export { tooltipClasses };