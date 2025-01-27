import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CourseGrpCard from "./child/CourseGrpCard";
import { getCourseGrpDetails } from "./course.actions";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import ErrorHandling from "../Common/ErrorHandling";
import NoDataPage from "../../Utils/NoDataPage";

const Courses = () => {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourseDetailsAPi = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getCourseGrpDetails({ headers }));
      const data = (await res.payload.data?.data) || [];
      const sorted = data?.sort((a, b) => b.booking_date - a.booking_date);
      setCourseData(sorted);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseDetailsAPi();
  }, []);

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
        // minHeight: "100vh",
        overflow: "auto",
        flex: 1,
      }}
    >
      <Typography variant="h4" fontWeight={"bold"}>
        Your Programs at a Glance{" "}
      </Typography>
      <Typography fontSize={"var(--font-size-medium)"}>
        The road to mastery is through continuous learning. Stay curious, stay
        inspired.{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#6560F0",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "600",
              fontSize: "var(--font-size-medium)",
            }}
          >
            My Course Groups
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            flex: 1,
            p: 2,
            overflow: "auto",
            height: "100vh",
            width: "100%",
          }}
        >
          {courseData?.length > 0 ? (
            courseData?.map((item, index) => (
              <CourseGrpCard
                key={`${index}-${item.cg_uid}-${item.bcn}`}
                item={item}
              />
            ))
          ) : (
            <NoDataPage
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737363456/Online_education_with_laptop_and_books_zsko0t.svg"
              errorHeading="No Course Groups Yet!"
              errorDescription="Looks like you’re not enrolled in any course groups yet.  Once you join a course, all the details will show up here. "
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Courses;
