import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./Sessions.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RotateRightIcon from "@mui/icons-material/RotateRight";

function Sessions() {
  const SessionsData = {
    batch_id: "BTH24DECPYTH19",
    total_modules: 28,
    compl_modules: 4,
    total_sessions: 12,
    total_students: 6,
    total_active: 6,
    total_discontinued: 0,
    total_on_leave: 0,
    compl_sessions: 1,
    course_name: "Python",
    faculty_name: "Kavita Pankaj Pawar",
    start_date: "2024-12-05",
    end_date: "2024-12-17",
    start_time: "05:30:00",
    end_time: "06:30:00",
    compl_status: "ON_TIME",
    status: "ONGOING",
    zone: "Asia/Calcutta",
    week_days: [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ],
    session_list: [
      {
        session_id: "SSN24DFE9BE",
        serial_no: 1,
        faculty_name: "Kavita Pankaj Pawar",
        start_time: "2024-12-05T05:30:00Z",
        end_time: "2024-12-05T06:30:00Z",
        taken: true,
        modules: [
          {
            name: "Introduction - Basics of Python Programming",
            status: "COMPLETED",
          },

          {
            name: "Introduction - Print fucntion in details",
            status: "COMPLETED",
          },
          {
            name: "Input Function",
            status: "IN_PROGRESS",
          },
          {
            name: "Define Variables",
            status: "PENDING",
          },
        ],
        attendance: "Present",
        remark: null,
        type: "REGULAR",
      },
      {
        session_id: "SSN24B6FE02",
        serial_no: 2,
        faculty_name: "Kavita Pankaj Pawar",
        start_time: "2024-12-06T05:30:00Z",
        end_time: "2024-12-06T06:30:00Z",
        taken: false,
        modules: [],
        attendance: null,
        remark: null,
        type: "REGULAR",
      },
      {
        session_id: "SSN244E58F4",
        serial_no: 3,
        faculty_name: "Kavita Pankaj Pawar",
        start_time: "2024-12-07T05:30:00Z",
        end_time: "2024-12-07T06:30:00Z",
        taken: false,
        modules: [],
        attendance: null,
        remark: null,
        type: "REGULAR",
      },
      {
        session_id: "SSN2418936E",
        serial_no: 4,
        faculty_name: "Kavita Pankaj Pawar",
        start_time: "2024-12-08T05:30:00Z",
        end_time: "2024-12-08T06:30:00Z",
        taken: false,
        modules: [],
        attendance: null,
        remark: null,
        type: "REGULAR",
      },
      {
        session_id: "SSN24EC0541",
        serial_no: 5,
        faculty_name: "Kavita Pankaj Pawar",
        start_time: "2024-12-09T05:30:00Z",
        end_time: "2024-12-09T06:30:00Z",
        taken: false,
        modules: [],
        attendance: null,
        remark: null,
        type: "REGULAR",
      },
      {
        session_id: "SSN24680353",
        serial_no: 6,
        faculty_name: "Kavita Pankaj Pawar",
        start_time: "2024-12-10T05:30:00Z",
        end_time: "2024-12-10T06:30:00Z",
        taken: false,
        modules: [],
        attendance: null,
        remark: null,
        type: "REGULAR",
      },
    ],
  };

  /**
   * Takes two timestamps and formats them as a time range, e.g. "2:00 PM - 3:00 PM"
   * @param {number} startTime Unix timestamp for the start time
   * @param {number} endTime Unix timestamp for the end time
   * @returns {string} Formatted time range
   */
  const formatDateRange = (start, end) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const formattedStart = new Date(start).toLocaleDateString("en-US", options);
    const formattedStartTime = new Date(start).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    const formattedEndTime = new Date(end).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    return `${formattedStart} | ${formattedStartTime} - ${formattedEndTime}`;
  };

  const [show, setShow] = useState(false);

  const [showAttendanceDrawer, setShowAttendanceDrawer] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [serialNo, setSerialNo] = useState(null);

  const handleToggleDrawer = () => {
    setShowAttendanceDrawer(!showAttendanceDrawer);
  };

  console.log(SessionsData);
  return (
    <Box className={styles.mainBox}>
      <Box sx={{ px: 3, py: 2 }}>
        {/* Map through SessionsData and render each session */}
        {SessionsData?.session_list?.map((sessionData) => (
          <Accordion key={sessionData.session_id} sx={{ marginBottom: "25px" }}>
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
                  {sessionData.taken ? (
                    <CheckCircleIcon className={styles.iconStyle} />
                  ) : (
                    <RadioButtonUncheckedIcon className={styles.iconStyle} />
                  )}
                  {/* Session details */}
                  <Typography
                    className={styles.sessionsNumb}
                    onClick={() => {
                      if (!isBAtchScheduling) {
                        handleToggleDrawer();
                        setSessionId(sessionData.session_id);
                        setSerialNo(sessionData.serial_no);
                      }
                    }}
                  >
                    Session <span>{sessionData.serial_no}</span>{" "}
                    <span style={{ color: "grey", fontSize: "12px" }}>
                      {sessionData.type !== "REGULAR" && "(BACKUP)"}
                    </span>
                  </Typography>
                </Box>

                {/* Additional session information */}
                <Typography className={styles.sessionInfo}>
                  Faculty: {sessionData.faculty_name}
                </Typography>
                <Box sx={{ display: "flex", gap: "50px", flexWrap: "wrap"}}>
                  <Box>
                    <Typography className={styles.sessionInfo}>
                      Session Date:{" "}
                      {formatDateRange(
                        sessionData.start_time,
                        sessionData.end_time
                      )}
                    </Typography>
                  </Box>

                </Box>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap",}}>
                <Box >
                    {sessionData?.attendance !== null && (
                      <Typography
                        sx={{
                          backgroundColor:"#E2FDEC",
                          p:"5px 10px",
                          borderRadius:"15px",
                          color:
                            sessionData?.attendance === "Present"
                              ? "#239A60"
                              : "#A30000",
                          fontSize: "12px",
                        }}
                      >
                        {sessionData?.attendance}
                      </Typography>
                    )}
                    </Box>
               </Box>
            </AccordionSummary>
            {/* Accordion content */}
            <AccordionDetails>
              {/* Display modules for the session */}
              <Typography>
                {sessionData?.modules?.length ? (
                  sessionData.modules
                    .filter((module) => module.status !== "PENDING")
                    .map((module, index) => (
                      <Typography key={index} className={styles.modules}>
                        {/* Icon indicating if the module is taken */}
                        {module.status === "COMPLETED" ? (
                          <CheckCircleIcon className={styles.takenIcon} />
                        ) : (
                          <RotateRightIcon className={styles.takenIcon} />
                        )}
                        {module.name}
                      </Typography>
                    ))
                ) : (
                  // Displayed when no modules are available for the session
                  <Typography className={styles.noData}>
                    No data available
                  </Typography>
                )}

                {sessionData?.remark && (
                  <Typography className={styles.noData}>
                    Remark: {sessionData?.remark}
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
