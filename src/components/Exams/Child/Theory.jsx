import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useDispatch } from "react-redux";
import { getTheoryExams } from "../exams.actions";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import ErrorHandling from "../../Common/ErrorHandling";
import NoDataPage from "../../../Utils/NoDataPage";
function Theory() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  const [toggle, setToggle] = useState({
    practice: true,
    internal: false,
    final: false,
  });

  const handleToggle = (name) => {
    setToggle((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    getAllTheoryExams();
  }, []);

  const getAllTheoryExams = async () => {
    try {
      setLoading(true);

      const res = await dispatch(getTheoryExams({ headers }));
      const status = res?.payload?.status;
      const examsData = res?.payload?.data || [];

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        const modified = {
          practice: examsData?.filter(
            (item) => item.assessment_type === "PRACTICE"
          ),
          internal_assessment: examsData?.filter(
            (item) => item.assessment_type === "INTERNAL_ASSESSMENT"
          ),
          final: examsData?.filter((item) => item.assessment_type === "FINAL"),
        };
        setData(modified);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <ErrorHandling error500={false} loadData={loading} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
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
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {data?.practice?.length > 0 ? (
            data?.practice?.map((item, index) => (
              <ExamCard key={index} item={item} />
            ))
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
        {
          <IconButton onClick={() => handleToggle("internal")}>
            {toggle?.internal ? (
              <KeyboardArrowDownRoundedIcon sx={{ color: "white" }} />
            ) : (
              <KeyboardArrowUpRoundedIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        }
      </Box>
      {toggle?.internal && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {data?.internal_assessment?.length > 0 ? (
            data?.internal_assessment?.map((item, index) => (
              <ExamCard key={index} item={item} />
            ))
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
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {data?.final?.length > 0 ? (
            data?.final?.map((item, index) => (
              <ExamCard key={index} item={item} />
            ))
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
