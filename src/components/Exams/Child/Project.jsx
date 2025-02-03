import React from "react";
import { Box } from "@mui/material";
import ExamCard from "./ExamCard";

import NoDataPage from "../../../Utils/NoDataPage";

function Project({ data = [] }) {
  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",

        gap: 3,
        p: 2,
        height: "80vh",
        overflowY: "auto",
        flex: 1,
        height: "100%",
      }}
    >
      {data?.length > 0 ? (
        data?.map((item, index) => (
          <ExamCard key={item.id || index} item={item} />
        ))
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

export default Project;
