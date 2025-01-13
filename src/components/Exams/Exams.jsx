import { Badge, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Theory from "./Child/Theory";
import Practical from "./Child/Practical";
import Project from "./Child/Project";

const buttonStyle = {
  borderRadius: "5px",
  padding: "10px",
  width: "150px",
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  backgroundColor: "white",
  color: "#6560F0",
  fontWeight: "bold",
  fontSize: "14px",
  gap: "10px",
};
function Exams() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        height: "100vh",
      }}
    >
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight={"600"}>
          Your Exams
        </Typography>
        <Typography fontSize={"var(--font-size-medium)"}>
          Track your upcoming exams here
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{
              ...buttonStyle,
              backgroundColor: activeTab === 0 && "#6560F0",
              color: activeTab === 0 && "white",
            }}
            onClick={() => handleTabChange(0)}
            endIcon={<Badge badgeContent={1} color="secondary"></Badge>}
          >
            Theory
          </Button>
          <Button
            sx={{
              ...buttonStyle,
              backgroundColor: activeTab === 1 && "#6560F0",
              color: activeTab === 1 && "white",
            }}
            onClick={() => handleTabChange(1)}
            endIcon={<Badge badgeContent={5} color="secondary"></Badge>}
          >
            Practical
          </Button>
          <Button
            sx={{
              ...buttonStyle,
              backgroundColor: activeTab === 2 && "#6560F0",
              color: activeTab === 2 && "white",
            }}
            onClick={() => handleTabChange(2)}
            endIcon={<Badge badgeContent={0} color="secondary"></Badge>}
          >
            Project
          </Button>
        </Box>
        <Box sx={{ flex: 1, py: 2 }}>
          {activeTab === 0 && <Theory />}
          {activeTab === 1 && <Practical />}
          {activeTab === 2 && <Project />}
        </Box>
      </Box>
    </Box>
  );
}

export default Exams;
