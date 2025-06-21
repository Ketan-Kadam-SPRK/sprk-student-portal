import { Badge, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";

import Theory from "./Child/Theory";
import Practical from "./Child/Practical";
import Project from "./Child/Project";
import { getAllExams } from "./exams.actions";
import ErrorHandling from "../Common/ErrorHandling";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { setExamsData } from "./examSlice";

const buttonStyle = {
  borderRadius: "5px",
  padding: "10px",
  backgroundColor: "white",
  color: "var(--secondary-color)",
  fontWeight: "bold",
  fontSize: "14px",
  gap: "10px",
};
function Exams() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error500, setError500] = useState(false);
  const [count, setCount] = useState({
    practice: 0,
    internal_assessment: 0,
    final: 0,
    practical: 0,
    project: 0,
  });

  const handleTabChange = (newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  useEffect(() => {
    getAllTheoryExams();
  }, []);

  /**
   * getAllTheoryExams
   * Fetches all theory exams and sets the count for ongoing and scheduled exams
   * @function
   * @return {void}
   */
  const getAllTheoryExams = async () => {
    try {
      setLoading(true);

      const res = await dispatch(getAllExams({ headers }));
      const status = res?.payload?.status;
      const examsData = res?.payload?.data?.data || [];

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        const modified = {
          theory: {
            practice: examsData?.filter(
              (item) => item.assessment_type === "PRACTICE"
            ),
            internal_assessment: examsData?.filter(
              (item) => item.assessment_type === "INTERNAL_ASSESSMENT"
            ),
            final: examsData?.filter(
              (item) => item.assessment_type === "FINAL"
            ),
          },
          practical: examsData?.filter(
            (item) => item.assessment_type === "PRACTICAL"
          ),
          project: examsData?.filter(
            (item) => item.assessment_type === "PROJECT"
          ),
        };

        dispatch(setExamsData({ examsData: modified }));

        setCount({
          practice:
            modified?.theory?.practice?.filter((res) =>
              ["SCHEDULED", "ONGOING"].includes(res.status)
            ).length || 0,
          internal_assessment:
            modified?.theory?.internal_assessment?.filter((res) =>
              ["SCHEDULED", "ONGOING"].includes(res.status)
            )?.length || 0,
          final:
            modified?.theory?.final?.filter((res) =>
              ["SCHEDULED", "ONGOING"].includes(res.status)
            )?.length || 0,
          practical:
            modified?.practical?.filter((res) =>
              ["SCHEDULED", "ONGOING"].includes(res.status)
            )?.length || 0,
          project:
            modified?.project?.filter((res) =>
              ["SCHEDULED", "ONGOING"].includes(res.status)
            )?.length || 0,
        });
        setData(modified);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" fontWeight={"600"}>
            Your Exams
          </Typography>
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1740202998/your_exam_hrlt8t.svg"
            style={{
              width: "auto",
              height: "40px",
              objectFit: "contain",
              marginLeft: "5px",
            }}
            cloudName="dxlzzgbfw"
          />
        </Box>
        <Typography fontSize={"var(--font-size-medium)"} color="#4D535A">
          Track your upcoming exams here
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, overflowY: "auto" }}>
          <Button
            sx={{
              ...buttonStyle,
              backgroundColor:
                activeTab === 0
                  ? "var(--secondary-color)"
                  : "var(--background-color)",
              color: activeTab === 0 && "white",
              minWidth: "150px",
            }}
            onClick={() => handleTabChange(0)}
            endIcon={
              <Badge
                badgeContent={
                  count.practice + count.internal_assessment + count.final
                }
                color="secondary"
              ></Badge>
            }
          >
            Theory
          </Button>
          <Button
            sx={{
              ...buttonStyle,
              backgroundColor:
                activeTab === 1
                  ? "var(--secondary-color)"
                  : "var(--background-color)",
              color: activeTab === 1 && "white",
              minWidth: "150px",
            }}
            onClick={() => handleTabChange(1)}
            endIcon={
              <Badge badgeContent={count.practical} color="secondary"></Badge>
            }
          >
            Practical
          </Button>
          <Button
            sx={{
              ...buttonStyle,
              backgroundColor:
                activeTab === 2
                  ? "var(--secondary-color)"
                  : "var(--background-color)",
              color: activeTab === 2 && "white",
              minWidth: "150px",
            }}
            onClick={() => handleTabChange(2)}
            endIcon={
              <Badge badgeContent={count.project} color="secondary"></Badge>
            }
          >
            Project
          </Button>
        </Box>
        <Box sx={{ flex: 1, py: 2 }}>
          {activeTab === 0 && <Theory data={data?.theory} count={count} />}
          {activeTab === 1 && <Practical data={data?.practical} />}
          {activeTab === 2 && <Project data={data?.project} />}
        </Box>
      </Box>
    </Box>
  );
}

export default Exams;
