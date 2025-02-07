import React from "react";
import { Box, Grid2 } from "@mui/material";
import ExamCard from "./ExamCard";
import NoDataPage from "../../Common/NoDataPage";

function Practical({ data = [] }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "50px",
        flexWrap: "wrap",
        p: 2,
        height: "80vh",
        overflowY: "auto",
        flex: 1,
        width: "100%",
      }}
    >
      {data?.length > 0 ? (
        <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
          {data?.map((item, index) => (
            <Grid2
              key={item.exam_uid || index}
              item={item}
              size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
            >
              <ExamCard key={item.exam_uid || index} item={item} />
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
  );
}

export default Practical;
