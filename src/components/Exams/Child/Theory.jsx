import {
  Badge,
  Box,
  Button,
  Grid2,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import NoDataPage from "../../Common/NoDataPage";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import { searchFilterData } from "../../../Utils/SearchFilterData";

function Theory({ count }) {
  const data = useSelector((state) => state.examSlice?.examsData);
  const [searchText, setSearchText] = useState("");
  const [toggle, setToggle] = useState("practice");
  const [examData, setExamData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggle = (name) => setToggle(name);

  useEffect(() => {
    let thisData = data?.theory[toggle] || [];
    if (searchText) thisData = searchFilterData(thisData, searchText);
    setExamData(
      [...thisData].sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
      )
    );
  }, [toggle, data, searchText]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
      }}
    >
      {/* ✅ Responsive Vertical Buttons on Mobile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // vertical on mobile, horizontal on desktop
          gap: { xs: 1.5, sm: 2 }, // small gap on mobile
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        {[
          { key: "practice", label: "Practice", count: count?.practice },
          {
            key: "internal_assessment",
            label: "Internal Assessment",
            count: count?.internal_assessment,
          },
          { key: "final", label: "Final", count: count?.final },
        ].map((btn) => (
          <Button
            key={btn.key}
            variant={isMobile ? "contained" : "text"}
            onClick={() => handleToggle(btn.key)}
            sx={{
              width: { xs: "100%", sm: "auto" },
              justifyContent: "space-between",
              backgroundColor:
                toggle === btn.key ? "var(--secondary-color)" : "#f1f3f6",
              color: toggle === btn.key ? "#ffffff" : "var(--secondary-color)",
              textTransform: "none",
              borderBottom: {
                xs: "none",
                sm:
                  toggle === btn.key
                    ? "3px solid var(--secondary-color)"
                    : "2px solid grey",
              },
              borderBottomLeftRadius: {sm:"Default", md:0},
              borderBottomRightRadius: {sm:"Default", md:0},
            }}
            endIcon={
              <Badge
                color="secondary"
                badgeContent={btn.count}
                sx={{ pl: 1, mr: 1 }}
              />
            }
          >
            {btn.label} 
          </Button>
        ))}
      </Box>

      {/* ✅ Responsive Search Bar */}
      <TextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
        variant="outlined"
        size="small"
        sx={{
          width: { xs: "100%", sm: "400px" },
          backgroundColor: "white",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
        }}
        slotProps={{
          input: { startAdornment: <Search sx={{ color: "grey" }} /> },
        }}
      />

      {/* ✅ Exam List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 2,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {examData?.length > 0 ? (
          <Grid2
            container
            spacing={2}
            sx={{ width: "100%", margin: 0, alignItems: "stretch" }}
          >
            {examData.map((item, index) => (
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
