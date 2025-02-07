import { Badge, Box, Grid2, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import NoDataPage from "../../Common/NoDataPage";

function Theory({ data = [], count }) {
  const [toggle, setToggle] = useState({
    practice: true,
    internal_assessment: false,
    final: false,
  });

  const handleToggle = (name) => {
    setToggle((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        height: "80vh",
        overflowY: "auto",
        flex: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#6560F0",
          color: "white",
          display: "flex",
          px: 1,
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          maxWidth: "100%",
          borderRadius: "5px",
        }}
      >
        <Typography fontSize={"var(--font-size-small)"} fontWeight={600}>
          Practice
        </Typography>{" "}
        <Badge color="error" badgeContent={count?.practice} />
        {
          <IconButton onClick={() => handleToggle("practice")}>
            {toggle?.practice ? (
              <KeyboardArrowDownRoundedIcon sx={{ color: "white" }} />
            ) : (
              <KeyboardArrowUpRoundedIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        }
      </Box>
      {toggle?.practice && (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {data?.practice?.length > 0 ? (
            <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
              {data?.practice.map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                  <ExamCard key={index} item={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <NoDataPage
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736771092/Cup_of_coffee_top_view_clipboard_with_clip_sheet_of_paper_and_two_pencils_sugnga.svg"
              errorHeading="No exams assigned yet!"
              errorDescription="Your exams will appear here once they are scheduled. Stay prepared and keep learning!"
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: "#6560F0",
          color: "white",
          display: "flex",
          px: 1,
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          maxWidth: "100%",
          borderRadius: "5px",
        }}
      >
        <Typography fontSize={"var(--font-size-small)"} fontWeight={600}>
          Internal Assessment
        </Typography>{" "}
        <Badge color="error" badgeContent={count?.internal_assessment} />
        {
          <IconButton onClick={() => handleToggle("internal_assessment")}>
            {toggle?.internal_assessment ? (
              <KeyboardArrowDownRoundedIcon sx={{ color: "white" }} />
            ) : (
              <KeyboardArrowUpRoundedIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        }
      </Box>
      {toggle?.internal_assessment && (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {data?.internal_assessment?.length > 0 ? (
            <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
              {data?.internal_assessment?.map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                  <ExamCard key={index} item={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <NoDataPage
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736771092/Cup_of_coffee_top_view_clipboard_with_clip_sheet_of_paper_and_two_pencils_sugnga.svg"
              errorHeading="No exams assigned yet!"
              errorDescription="Your exams will appear here once they are scheduled. Stay prepared and keep learning!"
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: "#6560F0",
          color: "white",
          display: "flex",
          px: 1,
          justifyContent: "space-between",
          alignItems: "center",
          width: "400px",
          maxWidth: "100%",
          borderRadius: "5px",
        }}
      >
        <Typography fontSize={"var(--font-size-small)"} fontWeight={600}>
          Final
        </Typography>{" "}
        <Badge color="error" badgeContent={count?.final} />
        {
          <IconButton onClick={() => handleToggle("final")}>
            {toggle?.final ? (
              <KeyboardArrowDownRoundedIcon sx={{ color: "white" }} />
            ) : (
              <KeyboardArrowUpRoundedIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        }
      </Box>
      {toggle?.final && (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {data?.final?.length > 0 ? (
            <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
              {data?.final?.map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                  <ExamCard key={index} item={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <NoDataPage
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736771092/Cup_of_coffee_top_view_clipboard_with_clip_sheet_of_paper_and_two_pencils_sugnga.svg"
              errorHeading="No exams assigned yet!"
              errorDescription="Your exams will appear here once they are scheduled. Stay prepared and keep learning!"
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default Theory;
