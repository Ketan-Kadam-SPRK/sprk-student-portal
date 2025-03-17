import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { useAuthHeaders } from "../../../../../Hooks/useAuthHeaders";
import ErrorHandling from "../../../../Common/ErrorHandling";

import { getModulesDetails } from "../../../action/batches.actions";
import StatusStyledComponent from "../../../../Common/StatusStyledComponent/StatusStyledComponent";

function Modules({ batchId }) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [error500, setError500] = useState(false);

  const getModules = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getModulesDetails({ headers, batchId }));
      const data = res?.payload?.data?.data || [];
      const status = res?.payload?.status;
      if (status === 500 || status === 503) {
        setError500(true);
      }
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

  /**
   * Returns the icon for a given status of a module.
   * 
   * @param {string} status The status of the module. Can be "COMPLETED", "IN_PROGRESS", or "PENDING".
   * @returns {React.ReactElement} The icon to be displayed.
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircleIcon sx={{ color: "#3D37D5" }} />;
      case "IN_PROGRESS":
        return <RotateLeftIcon sx={{ color: "#0038A8" }} />;
      case "PENDING":
      default:
        return <CircleOutlinedIcon sx={{ color: "grey" }} />;
    }
  };

  // Function to get the color and background color based on the status
  const getStatusStyles = (status) => {
    let color = "";
    let backgroundColor = "";
    

    switch (status) {
      case "COMPLETED":
        color = "#1F5200";
        backgroundColor = "#CBFFAC";
        break;
      case "IN_PROGRESS":
        color = "#0038A8";
        backgroundColor = "#C1D6FF";
        break;
      case "PENDING":
        color = "#755200";
        backgroundColor = "#FFF3A4";
        break;
      default:
        color = "#000000";
        backgroundColor = "#F5F5F5";
        break;
    }

    return { color, backgroundColor };
  };

  if (loading || error500) {
    return <ErrorHandling error500={error500} loadData={loading} />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px",}}>
              <Box sx={{ display: "flex", alignItems: "center" }}>{getStatusIcon(item?.moduleCompletionStatus)}</Box>
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
                py: 1,
                borderRadius: "25px",
              }}
            >
              <StatusStyledComponent
                value={item?.moduleCompletionStatus}
                {...getStatusStyles(item?.moduleCompletionStatus)} // Spread the returned styles from getStatusStyles
              />
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
