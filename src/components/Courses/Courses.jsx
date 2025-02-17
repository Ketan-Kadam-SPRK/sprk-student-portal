import React, { useEffect, useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import CourseGrpCard from "./child/CourseGrpCard";
import { getCourseGrpDetails } from "./course.actions";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import ErrorHandling from "../Common/ErrorHandling";
import NoDataPage from "../Common/NoDataPage";
import { Image } from "cloudinary-react";
import { objectShallowCompare } from "@mui/x-data-grid/hooks/utils/useGridSelector";

const Courses = () => {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);

  const getCourseDetailsAPi = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getCourseGrpDetails({ headers }));
      const status = res?.payload?.status;
      const data = (await res.payload.data?.data) || [];
      const sorted = data?.sort(
        (a, b) => new Date(b.booking_date) - new Date(a.booking_date)
      );
      if (status === 500 || status === 503) {
        setError500(true);
      }
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

  if (loading || error500) {
    return <ErrorHandling error500={error500} loadData={loading} />;
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
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Your Programs at a Glance{" "}
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739265190/diary-education-learning-pencil-school-study-svgrepo-com_1_qyg6bi.svg"
            style={{
              width: "30px",
              height: "auto",
              objectFit: "contain",
            }}
            cloudName="dxlzzgbfw"
          />
        </Typography>
        <Typography fontSize={"var(--font-size-medium)"} color="#4D535A">
          The road to mastery is through continuous learning. Stay curious, stay
          inspired.{" "}
        </Typography>
      </Box>

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
            // flex: 1,
            p: 2,
            overflow: "auto",
            height: "100vh",
            width: "100%",
          }}
        >
          {courseData?.length > 0 ? (
            <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
              {courseData?.map((item, index) => (
                <Grid2
                  key={`${index}-${item.cg_uid}-${item.bcn}`}
                  size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                >
                  <CourseGrpCard item={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <NoDataPage
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737363456/Online_education_with_laptop_and_books_zsko0t.svg"
              errorHeading="No Course Groups Yet!"
              errorDescription="Looks like you’re not enrolled in any course groups yet. Once you join a course, all the details will show up here."
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Courses;
