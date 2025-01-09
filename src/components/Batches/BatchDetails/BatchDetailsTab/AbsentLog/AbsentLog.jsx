import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import dateFormator from "../../../../../Utils/dateFormator";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../../../Hooks/useAuthHeaders";
import { getAbsentLogs } from "../../../action/batches.actions";
import { formatDateTimeRange } from "../../../../../Utils/dateTimeFormator";

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
                  Session {item?.serialNumber}
                </Typography>
              </Box>

              <Typography sx={{ pl: 4, color: "#6E6E6E" }}>
                Session Date : {formatDateTimeRange(item?.startDateTime,item?.endDateTime)}
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
                      backgroundColor:item?.studentAttendanceStatus === "ABSENT" ? "#FEECEC":"#FFF8C7",
                      p: "5px 15px",
                      borderRadius: "15px",
                      fontWeight: 600,
                      color:item?.studentAttendanceStatus === "ABSENT" ? "#A30000":"#B17C02",
                      fontSize: "14px",
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
                <Typography sx={{ color: "#6E6E6E", textWrap: "wrap", pl: 1 }}>
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
