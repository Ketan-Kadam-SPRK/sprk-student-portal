import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { Image } from "cloudinary-react";
import StatusComponent from "./StatusComponent";

function BatchCardHorizontal({ item = {} }) {
  return (
    <Box
      sx={{
        backgroundColor: "#EDF6FF",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        gap: 4,
        flexWrap: "wrap",
        flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
        // height: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Image
          cloudName="dxlzzgbfw"
          publicId={item?.course_img}
          width="100"
          height="100"
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >
            {item?.bth_id}
          </Typography>
          <StatusStyledComponent
            color="#085186"
            backgroundColor="#D2E9FA"
            value={item?.course_name}
          />
          <Typography
            sx={{
              fontSize: "var(--font-size-extra-small)",
              color: "#909090",
              fontWeight: "bold",
            }}
          >{`by ${item?.faculty_name}`}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={item?.progress || 0} // Assuming `item.progress` is the percentage value
            sx={{ flex: 1 }}
          />
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
              color: "#085186",
            }}
          >
            {`${item?.progress || 0}%`}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {item.week_days.map((day) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 1,
                py: 2,
                gap: 1,
                backgroundColor: "grey",
                width: "90px",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "var(--font-size-extra-small)",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {day.slice(0, 3)}
              </Typography>

              <Box
                sx={{
                  p: 0.5,
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  10:00 AM
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <StatusComponent value={item.bth_status} />
    </Box>
  );
}

export default BatchCardHorizontal;
