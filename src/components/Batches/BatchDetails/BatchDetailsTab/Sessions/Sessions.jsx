import React, { useState } from "react";
import styles from "./Sessions.module.css";
import { Box, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RotateRightIcon from "@mui/icons-material/RotateRight";

import { formatForDisplay } from "../../../../../Utils/formateForDisplay";
import { formatDateTimeRange } from "../../../../../Utils/dateTimeFormator";
import NoDataPage from "../../../../Common/NoDataPage";
import NoDataAvailableUI from "../../../../Common/CustomAgGrid/NoDataAvailableUI";
import { useBatch } from "../../BatchContext";

function Sessions({ filterData }) {
  const [show, setShow] = useState(false);
  const [showAttendanceDrawer, setShowAttendanceDrawer] = useState(false);
  const { sessionData } = useBatch();

  const handleToggleDrawer = () => {
    setShowAttendanceDrawer(!showAttendanceDrawer);
  };

  /**
   * Given a status, returns the corresponding color and background color for the status.
   *
   * @param {string} status - The status to get the styles for. Can be "PRESENT", "ABSENT", or "ON_LEAVE"
   * @returns {object} - An object containing the color and backgroundColor for the given status
   */
  const getStatusStyles = (status) => {
    switch (status) {
      case "PRESENT":
        return {
          color: "#0A983C",
          backgroundColor: "#E2FDEC",
        };
      case "ABSENT":
        return {
          color: "#A30000",
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

  return (
    <>
      {sessionData?.list?.length > 0 ? (
        <Box className={styles.mainBox}>
          <Box sx={{ px: 3, py: 2 }}>
            {filterData?.length > 0 ? (
              filterData?.map((sessionData, index) => (
                <Accordion
                  key={`${index + 1}-${sessionData?.session_id}`}
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
                          <span style={{ color: "grey", fontSize: "12px" }}>
                            {sessionData?.type !== "REGULAR"
                              ? "(Backup Session)"
                              : ""}
                          </span>
                        </Typography>
                      </Box>

                      {/* Additional session information */}
                      <Typography className={styles.sessionInfo}>
                        Faculty: {sessionData?.faculty}
                      </Typography>
                      <Box
                        sx={{ display: "flex", gap: "50px", flexWrap: "wrap" }}
                      >
                        <Box>
                          <Typography className={styles.sessionInfo}>
                            Session Date:{" "}
                            {formatDateTimeRange(
                              sessionData?.start_time,
                              sessionData?.end_time
                            )}
                          </Typography>
                        </Box>
                      </Box>
                      {sessionData?.lev_reason && (
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#6E6E6E",
                              wordBreak: "break-word", 
                              overflowWrap: "anywhere", 
                              whiteSpace: "normal",
                              pr: "10px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#085186",
                                fontWeight: "bold",
                              }}
                            >
                              Reason :{" "}
                            </span>
                            {sessionData?.lev_reason}
                          </Typography>
                        </Box>
                      )}
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
                              ...getStatusStyles(
                                sessionData?.studentAttendanceStatus
                              ),
                            }}
                          >
                            {formatForDisplay(
                              sessionData?.studentAttendanceStatus
                            )}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>

                  {/* Accordion content */}
                  <AccordionDetails>
                    {/* Display modules for the session */}
                    <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
                      {sessionData?.moduleDetails?.length ? (
                        sessionData.moduleDetails
                          .filter((module) => module?.status !== "PENDING")
                          .map((module, index) => (
                            <div key={index} className={styles.modules}>
                              {/* Icon indicating if the module is taken */}
                              {module.moduleCompletionStatus === "COMPLETED" ? (
                                <CheckCircleIcon className={styles.takenIcon} />
                              ) : (
                                <RotateRightIcon className={styles.takenIcon} />
                              )}
                              <Typography>{module?.module}</Typography>
                            </div>
                          ))
                      ) : (
                        // Displayed when no modules are available for the session
                        <Typography className={styles.noData}>
                          No data available
                        </Typography>
                      )}
                    </div>
                    {sessionData?.remark && (
                      <Box sx={{ mt: 1, ml: 2 }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#6E6E6E",
                            fontWeight: 600,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#085186",
                              fontWeight: "bold",
                            }}
                          >
                            Remark :{" "}
                          </span>
                          {sessionData?.remark}
                        </Typography>
                      </Box>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <NoDataAvailableUI />
            )}
          </Box>
        </Box>
      ) : (
        <NoDataPage
          errorImgPublicId={
            "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736514777/Brainstorming_session_with_notepad_and_chat_bubble_bnqa9f.svg"
          }
          errorHeading={"Sessions are yet to be conducted!"}
          errorDescription={
            "Your sessions will appear here once they are completed."
          }
        />
      )}
    </>
  );
}

export default Sessions;
