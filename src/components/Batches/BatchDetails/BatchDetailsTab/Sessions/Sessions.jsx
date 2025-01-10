import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "./Sessions.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { formatForDisplay } from "../../../../../Utils/formateForDisplay";
import { formatDateTimeRange } from "../../../../../Utils/dateTimeFormator";

function Sessions({ sessionData }) {

  const [show, setShow] = useState(false);
  const [showAttendanceDrawer, setShowAttendanceDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setShowAttendanceDrawer(!showAttendanceDrawer);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "PRESENT":
        return {
          color: "#0A983C",
          backgroundColor: "#E2FDEC",
        };
      case "ABSENT":
        return {
          color: "#DA0E0E",
          backgroundColor: "#FEECEC",
        };
      case "ON_LEAVE":
        return {
          color: "#B17C02",
          backgroundColor: "#FFF8C7",
        };
      default:
        return {
          color: "#000000",
          backgroundColor: "#F5F5F5",
        };
    }
  };
  

  console.log(sessionData);
  return (
    <Box className={styles.mainBox}>
      <Box sx={{ px: 3, py: 2 }}>
        {/* Map through sessionData and render each session */}
        {sessionData?.list?.map((sessionData) => (
          <Accordion
            key={sessionData?.session_id}
            sx={{ marginBottom: "25px" }}
          >
            {/* Accordion header */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {/* Session information */}

              <Box className={styles.infoBox}>
                <Box
                  className={styles.SummeryBox}
                  onClick={() => setShow(!show)}
                >
                  {/* Icon indicating if the session is taken */}

                  <CheckCircleIcon className={styles.iconStyle} />

                  {/* Session details */}
                  <Typography
                    className={styles.sessionsNumb}
                    onClick={() => {
                      if (!isBAtchScheduling) {
                        handleToggleDrawer();
                      }
                    }}
                  >
                    Session <span>{sessionData.serial_number}</span>{" "}
                  </Typography>
                </Box>

                {/* Additional session information */}
                <Typography className={styles.sessionInfo}>
                  Faculty: {sessionData.faculty}
                </Typography>
                <Box sx={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
                  <Box>
                    <Typography className={styles.sessionInfo}>
                      Session Date:{" "}
                      {formatDateTimeRange(
                        sessionData.start_time,
                        sessionData.end_time
                      )}
                    </Typography>
                  </Box>
                </Box>
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
                  {sessionData?.attendance !== null && (
                    <Typography
                      sx={{
                        p: "5px 15px",
                        borderRadius: "15px",
                        fontWeight: 600,
                        fontSize: "14px",
                        ...getStatusStyles(sessionData?.studentAttendanceStatus),
                      }}
                    >
                      {formatForDisplay(sessionData?.studentAttendanceStatus)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            {/* Accordion content */}

            <AccordionDetails>
              {/* Display modules for the session */}
              <Typography>
                {sessionData?.moduleDetails?.length ? (
                  sessionData.moduleDetails
                    .filter((module) => module.status !== "PENDING")
                    .map((module, index) => (
                      <Typography key={index} className={styles.modules}>
                        {/* Icon indicating if the module is taken */}
                        {module.moduleCompletionStatus === "COMPLETED" ? (
                          <CheckCircleIcon className={styles.takenIcon} />
                        ) : (
                          <RotateRightIcon className={styles.takenIcon} />
                        )}
                        {module.module}
                      </Typography>
                    ))
                ) : (
                  // Displayed when no modules are available for the session
                  <Typography className={styles.noData}>
                    No data available
                  </Typography>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

export default Sessions;
