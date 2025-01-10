import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../../../Hooks/useAuthHeaders";
import { getModulesDetails } from "../../../action/batches.actions";

function Modules({batchId}) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  console.log(batchId);

  const getModules = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getModulesDetails({ headers, batchId }));
      const data = res?.payload?.data?.data || [];
      console.log(data);
      setModules(data); // Ensure the sorted data is set
      setLoading(false);
    } catch (err) {
      console.error(err); // Log error for debugging
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getModules();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "white",
        p: 2,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "auto",
        gap: "10px",
      }}
    >
      {modules?.length > 0 ? (
        modules?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a shadow
              borderRadius: "8px", // Rounds the corners
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box>
                {item?.moduleCompletionStatus === "COMPLETED" ? (
                  <CheckCircleIcon sx={{ color: "#3D37D5" }} />
                ) : (
                  <CircleOutlinedIcon />
                )}
              </Box>
              <Box>
                <Typography sx={{ color: "#085186", fontWeight: 600 }}>
                  {item?.module}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 3,
                gap: "5px",
                backgroundColor:
                  item?.moduleCompletionStatus === "COMPLETED" ? "#CDFEE1" : "#E4AEFF",
                py: 1,
                borderRadius: "25px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {item?.moduleCompletionStatus === "COMPLETED" ? (
                  <Image
                    publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735798457/fluent-mdl2_completed_x9l58k.svg"
                    cloudName="dxlzzgbfw"
                  />
                ) : (
                  <Image
                    publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735798457/material-symbols_event-upcoming-outline-rounded_mvhlnh.svg"
                    cloudName="dxlzzgbfw"
                  />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "10px", sm: "13px", md: "13px" },
                  fontWeight: "600",
                  color: item?.moduleCompletionStatus === "COMPLETED" ? "#12472E" : "#52007A",
                }}
              >
                {item?.moduleCompletionStatus === "COMPLETED" ? "COMPLETED" : "Upcoming"}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            flex: 4,
          }}
        >
          <Typography sx={{ color: "grey", fontSize: "12px" }}>
            No Modules Found
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Modules;
