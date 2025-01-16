import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../../../Hooks/useAuthHeaders";
import { getAbsentLogs } from "../../../action/batches.actions";
import { formatDateTimeRange } from "../../../../../Utils/dateTimeFormator";
import { Image } from "cloudinary-react";
import ErrorHandling from "../../../../Common/ErrorHandling";
import NoDataPage from "../../../../../Utils/NoDataPage";

function AbsentLog({ batchId }) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log(batchId);

  const getAbsentLog = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAbsentLogs({ headers, batchId }));
      const data = res?.payload?.data?.data || [];
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
    console.log(res);
  };

  useEffect(() => {
    getAbsentLog();
  }, []);

  if (loading) {
    return <ErrorHandling error500={false} loadData={loading} />;
  }

  return (
    <>
      {data?.length > 0 ? (
        <Box sx={{ height: "100vh", backgroundColor: "white", p: 2 }}>
          {data.map((item) => (
            <Accordion key={item?.serialNumber} sx={{ marginBottom: "25px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id={`panel${item?.serialNumber}-header`}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <CheckCircleIcon sx={{ color: "#3D37D5" }} />
                    <Typography sx={{ color: "#085186", fontWeight: 600 }}>
                      Session {item?.serialNumber}
                    </Typography>
                  </Box>
                  <Typography sx={{ pl: 4, color: "#6E6E6E" }}>
                    Session Date:{" "}
                    {formatDateTimeRange(
                      item?.startDateTime,
                      item?.endDateTime
                    )}
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
                          width: "100%",
                          backgroundColor:
                            item?.studentAttendanceStatus === "ABSENT"
                              ? "#FEECEC"
                              : "#FFF8C7",
                          p: "5px 15px",
                          borderRadius: "15px",
                          fontWeight: 600,
                          color:
                            item?.studentAttendanceStatus === "ABSENT"
                              ? "#A30000"
                              : "#B17C02",
                          fontSize: "14px",
                          textWrap: "nowrap",
                        }}
                      >
                        {item?.studentAttendanceStatus.replace(/_/g, " ")}
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
                    <Typography
                      sx={{ color: "#6E6E6E", textWrap: "wrap", pl: 1 }}
                    >
                      {item?.reason}
                    </Typography>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <NoDataPage
          errorImgPublicId={
            "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736572101/Medal_and_trophy_awarded_for_success_zzn9iq.png"
          }
          errorHeading={"Attendance Goals Unlocked! You’re on a Roll! 🌟"}
          errorDescription={
            "No absences or leaves recorded. Keep up the great attendance streak!"
          }
        />
      )}
    </>
  );
}

export default AbsentLog;
