import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { Image } from "cloudinary-react";
import StatusComponent from "./StatusComponent";
import CircularProgressWithLabel from "../../Common/CircularProgressWithLable";
import { useNavigate } from "react-router-dom";
import { getWeekdayFromTimestamp } from "../../../Utils/dateTimeFormator";
import LightTooltip from "../../Common/LightTooltip";
function BatchCardHorizontal({ item = {} }) {
  const navigate = useNavigate();

  const returnFormatedtime = (timestamp) => {
    return `${new Date(timestamp).getHours()}:
    ${
      new Date(timestamp).getMinutes() === 0
        ? "00"
        : new Date(timestamp).getMinutes()
    }  ${new Date(timestamp).getHours() >= 12 ? "PM" : "AM"}`;
  };

  const renderTooltip = ({ data }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1,
        }}
      >
        <Typography sx={{ fontSize: "var(--font-size-small)" }}>
          {new Date(data?.start_time).toDateString()}
        </Typography>
        <Typography sx={{ fontSize: "var(--font-size-small)" }}>{`
                 ${returnFormatedtime(
                   data?.start_time
                 )}   to  ${returnFormatedtime(data.end_time)}
              `}</Typography>
      </Box>
    );
  };
  return (
    <Box
      key={item?.batch_uid}
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
          publicId={item?.course_image_url}
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
              navigate(`/Batches/${item?.batch_uid}`);
            }}
          >
            {item?.batch_uid}
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
            value={item?.batch_progress || 0} // Assuming `item.progress` is the percentage value
            sx={{ flex: 1 }}
          />
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
              color: "#085186",
            }}
          >
            {`${item?.batch_progress || 0}%`}
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
          {item?.sessions?.length > 0 ? (
            item?.sessions?.map((item, index) => (
              <LightTooltip
                key={index}
                title={renderTooltip({ data: item })}
                arrow
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: 1,
                    py: 2,
                    gap: 1,
                    backgroundColor: item?.conducted ? "grey" : "#0073E6",
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
                    {getWeekdayFromTimestamp(item?.start_time).slice(0, 3)}
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
                      {returnFormatedtime(item?.start_time)}
                    </Typography>
                  </Box>
                </Box>
              </LightTooltip>
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
        <StatusComponent value={item?.batch_status} />
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
