import React, { useEffect, useState } from "react";
import { Box, Grid2, TextField } from "@mui/material";
import ExamCard from "./ExamCard";

import NoDataPage from "../../Common/NoDataPage";
import { useSelector } from "react-redux";
import { searchFilterData } from "../../../Utils/SearchFilterData";
import { Search } from "@mui/icons-material";

function Practical() {
  const data =
    useSelector((state) => state.examSlice.examsData?.practical) || [];
  const [examData, setExamData] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let thisData = data || [];

    if (searchText) {
      thisData = searchFilterData(thisData, searchText);
    }
    let sorted = [...thisData]?.sort(
      (a, b) => new Date(b.start_date) - new Date(a.start_date)
    );
    setExamData(sorted);
  }, [data, searchText]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
      }}
    >
      <TextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
        variant="outlined"
        size="small"
        sx={{
          width: "400px",
          maxWidth: "100%",
          backgroundColor: "white",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
        slotProps={{
          input: {
            startAdornment: <Search sx={{ color: "grey" }} />,
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          py: 2,
          px: {xs:1,sm:2},
          height: "100vh",
          overflowY: "auto",
                  // border: "1px solid red",
          // flex: 1,
        }}
      >
        {examData?.length > 0 ? (
          <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
            {examData?.map((item, index) => (
              <Grid2
                key={item.exam_uid || index}
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
    </Box>
  );
}

export default Practical;
