import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { Image } from "cloudinary-react";
import StatusComponent from "./StatusComponent";
import CircularProgressWithLabel from "../../Common/CircularProgressWithLable";
import { useNavigate } from "react-router-dom";
import { getWeekdayFromTimestamp } from "../../../Utils/dateTimeFormator";

function BatchCardHorizontal({ item = {} }) {
  const navigate = useNavigate();
  return (
    <Box
      key={item.bth_id}
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
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/Batches/${item?.bth_id}`);
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
              fontWeight: "500",
            }}
          >{`By ${item?.faculty_name}`}</Typography>
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
          {item.session_week?.length > 0 ? (
            item.session_week.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  px: 1,
                  py: 2,
                  gap: 1,
                  backgroundColor: item.isConducated ? "grey" : "#0073E6",
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
                  {getWeekdayFromTimestamp(item.start).slice(0, 3)}
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
                    {` ${new Date(item.start).getHours()}:
                  ${new Date(item.start).getMinutes()}  ${
                      new Date(item.start).getHours() >= 12 ? "PM" : "AM"
                    }`}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography
              sx={{
                fontSize: "var(--font-size-extra-small)",
                color: "#909090",
                fontWeight: "500",
              }}
            >
              No sessions available on this week
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "space-between",
        }}
      >
        <StatusComponent value={item.bth_status} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <Typography fontSize={"var(--font-size-extra-small)"}>
            Attendance
          </Typography>
          <CircularProgressWithLabel value={4} totalValue={5} />
        </Box>
      </Box>
    </Box>
  );
}

export default BatchCardHorizontal;
