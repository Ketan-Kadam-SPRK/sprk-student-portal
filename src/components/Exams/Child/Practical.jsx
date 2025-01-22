import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ExamCard from "./ExamCard";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import ErrorHandling from "../../Common/ErrorHandling";
import { useDispatch } from "react-redux";
import { getPracticalExams } from "../exams.actions";
import NoDataPage from "../../../Utils/NoDataPage";

function Practical() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // Added error state
  const [error500, setError500] = useState(false);

  useEffect(() => {
    getExams();
  }, []);

  const getExams = async () => {
    try {
      setLoading(true);
      setError(false);
      setError500(false);

      const res = await dispatch(getPracticalExams({ headers }));
      const status = res?.payload?.status;
      const examsData = res?.payload?.data || [];
      console.log(res);

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        setData(examsData);
      }
    } catch (err) {
      console.error("Error fetching practical exams:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading || error) {
    return <ErrorHandling error500={error500} loadData={loading} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        gap: 2,
        p: 2,
        height: "80vh",
        overflowY: "auto",
        flexWrap: "wrap",
        flex: 1,
      }}
    >
      {data?.length > 0 ? (
        data?.map((item, index) => (
          <ExamCard key={item.exam_uid || index} item={item} />
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

export default Practical;
