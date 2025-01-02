import { Box } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dateFormator from "../../../../../Utils/dateFormator";

function AbsentLog() {
  const data = [
    {
      session: 1,
      date: "2024-12-05T05:30:00Z",
      attendance: "Absent",
      reason: "",
    },
    {
      session: 2,
      date: "2024-12-06T05:30:00Z",
      attendance: "Absent",
      reason: "sick leave going to hospital not big issue just sick", 
    },
    {
      session: 3,
      date: "2024-12-07T05:30:00Z",
      attendance: "Absent",
      reason: "",
    },
  ];
  return (
    <Box sx={{ height: "100vh", backgroundColor: "white", p: 2 }}>
      {data.map((item) => (
        <Accordion sx={{ marginBottom: "25px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <CheckCircleIcon sx={{ color: "#3D37D5" }} />
                <Typography sx={{ color: "#085186", fontWeight: 600 }}>
                  Session {item?.session}
                </Typography>
              </Box>

              <Typography sx={{ pl: 4, color: "#6E6E6E" }}>
                Session Date : {dateFormator(item?.date)}
              </Typography>
            </Box>
            <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Box>
                  {item?.attendance !== null && (
                    <Typography
                      sx={{
                        backgroundColor: "#FEECEC",
                        p: "5px 15px",
                        borderRadius: "15px",
                        fontWeight: 600,
                        color:"#A30000",
                        fontSize: "14px",
                      }}
                    >
                      {item?.attendance}
                    </Typography>
                  )}
                </Box>
              </Box>
          </AccordionSummary>
          <AccordionDetails>
            {item?.reason && (
              <Box sx={{ display: "flex", pl: 4 }}>
                <Typography sx={{ color: "#085186", fontWeight: 600 }}>
                  Reason:{" "}
                </Typography>
                <Typography sx={{ color: "#6E6E6E",textWrap:"wrap" }}>
                  {item?.reason}
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default AbsentLog;
