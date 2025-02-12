import { Badge, Box, Button, Grid2, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExamCard from "./ExamCard";

import NoDataPage from "../../Common/NoDataPage";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import { searchFilterData } from "../../../Utils/SearchFilterData";

function Theory({ count }) {
  const data = useSelector((state) => state.examSlice?.examsData);
  const [searchText, setSearchText] = useState("");
  console.log(data);
  const [toggle, setToggle] = useState("practice");
  // const myData = data || [];
  console.log(data);

  const handleToggle = (name) => {
    setToggle(name);
  };

  const [examData, setExamData] = useState([]);

  useEffect(() => {
    let thisData = data?.theory[toggle] || [];

    if (searchText) {
      thisData = searchFilterData(thisData, searchText);
    }
    let sorted = [...thisData]?.sort(
      (a, b) => new Date(b.start_date) - new Date(a.start_date)
    );
    setExamData(sorted);
  }, [toggle, data, searchText]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          // variant="text"
          sx={{
            minWidth: "120px",
            display: "flex",
            gap: 2,
            px: 2,
            alignItems: "center",
            color: toggle === "practice" ? "#6560F0" : "grey",
            fontWeight: "bold",
            borderBottom: toggle === "practice" ? "4px solid #6560F0" : "",
          }}
          onClick={() => handleToggle("practice")}
        >
          Practice <Badge color="secondary" badgeContent={count?.practice} />
        </Button>
        <Button
          // variant="text"
          sx={{
            minWidth: "120px",
            display: "flex",
            gap: 2,
            px: 2,
            alignItems: "center",
            color: toggle === "internal_assessment" ? "#6560F0" : "grey",
            fontWeight: "bold",
            borderBottom:
              toggle === "internal_assessment" ? "4px solid #6560F0" : "",
          }}
          onClick={() => handleToggle("internal_assessment")}
        >
          Internal Assessment
          <Badge color="secondary" badgeContent={count?.internal_assessment} />
        </Button>

        <Button
          variant="text"
          sx={{
            minWidth: "120px",
            display: "flex",
            gap: 2,
            px: 2,
            alignItems: "center",
            color: toggle === "final" ? "#6560F0" : "grey",
            fontWeight: "bold",
            borderBottom: toggle === "final" ? "4px solid #6560F0" : "",
          }}
          onClick={() => handleToggle("final")}
        >
          Final <Badge color="secondary" badgeContent={count?.final} />
        </Button>
      </Box>
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
          p: 2,
          height: "100vh",
          overflowY: "auto",
          // flex: 1,
        }}
      >
        {examData?.length > 0 ? (
          <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
            {examData?.map((item, index) => (
              <Grid2
                key={`${item.exam_uid}-${index}`}
                size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
              >
                <ExamCard item={item} />
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

export default Theory;
