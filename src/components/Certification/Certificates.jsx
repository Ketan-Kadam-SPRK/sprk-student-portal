import React from "react";
import ProgressBar from "../Common/ProgressBar/ProgressBar";
import { Box } from "@mui/material";

function Certificates() {
  const response = {
    steps: [
      { label: "Certificate Pending", completed: true },
      { label: "Certificate To Review", completed: true },
      { label: "Certificate Ready", completed: false },
      { label: "Certificate Released", completed: false },
    ],
  };

  return (
    <Box>
      <Box>Certificates</Box>
      <ProgressBar steps={response.steps} title="Fullstack in Java" />
    </Box>
  );
}

export default Certificates;
