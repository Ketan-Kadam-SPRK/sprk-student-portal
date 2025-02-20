import { Typography, Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  convertToLocalTime,
  getRemainingTime,
} from "../../../Utils/dateTimeFormator";
import { Image } from "cloudinary-react";

function BatchCard({ item }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const RemainingDiv = () => {
    const endTime = new Date(item?.end_time);
    const startTime = new Date(item?.start_time);

    if (currentTime >= startTime && currentTime <= endTime) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#F00D0D",
            padding: "5px 10px",
            borderRadius: "15px",
            minWidth: "100px",
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: "var(--font-size-extra-small)" }}
          >
            Live
          </Typography>
        </Box>
      );
    } else if (currentTime > endTime) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#1EB600",
            padding: "5px 10px",
            borderRadius: "15px",
            minWidth: "100px",
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: "var(--font-size-extra-small)" }}
          >
            COMPLETED
          </Typography>
        </Box>
      );
    } else if (currentTime < startTime) {
      return (
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography
            sx={{
              color: "#B24040",
              fontWeight: "bold",
              fontSize: "var(--font-size-small)",
            }}
          >
            {getRemainingTime(item?.start_time)}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  const batchTiming = useMemo(
    () =>
      `${convertToLocalTime(item?.start_time)} - ${convertToLocalTime(
        item?.end_time
      )}`,
    [item]
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        p: "20px",
        backgroundColor: `${item?.cou_color}30`,
        borderRadius: "10px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        flexWrap: "wrap",
        m: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
          publicId={item?.cou_img_url}
          cloudName={item?.cou_img_url?.split("/")[2]}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{ fontSize: "var(--font-size-small)", fontWeight: "bold" }}
          >
            {`${item?.course_name} | ${item?.batch_uid}`}
          </Typography>
          <Typography
            sx={{ color: "grey", fontSize: "var(--font-size-extra-small)" }}
          >
            {item?.faculty_name}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ p: 1, backgroundColor: "#FFDF60", borderRadius: "10px" }}>
          <Typography
            sx={{
              fontSize: "var(--font-size-extra-small)",
              fontWeight: "bold",
            }}
          >
            {batchTiming}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            minWidth: "100px",
          }}
        >
          <RemainingDiv />
        </Box>
      </Box>
    </Box>
  );
}

export default BatchCard;
