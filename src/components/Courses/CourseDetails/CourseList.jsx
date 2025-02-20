import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useState } from "react";
import NoDataPage from "../../Common/NoDataPage";
import { Image } from "cloudinary-react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";

const CourseList = ({ data, navigate }) => {
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const handleExpandToggle = (courseId) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  const getStatusColor = (status) => {
    let color = "";
    let backgroundColor = "";
    switch (status) {
      case "ON_GOING":
        color = "#0038A8";
        backgroundColor = "#C1D6FF";
        break;
      case "COMPLETED":
        color = "#368C00";
        backgroundColor = "#CBFFAC";
        break;
      case "EXPIRED":
        color = "#3D3D3D";
        backgroundColor = "#D1D1D1";
        break;
      case "PENDING":
        color = "#755200";
        backgroundColor = "#FFF3A4";
        break;
      default:
        color = "black";
        backgroundColor = "white";
        break;
    }
    return { color, backgroundColor };
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        overflowY: "auto",
      }}
    >
      {data?.courses?.length > 0 ? (
        data?.courses?.map((item, index) => {
          const { color, backgroundColor } = getStatusColor(item?.status);
          const isExpanded = expandedCourseId === item?.course_uid;

          return (
            <Accordion
              key={`${index}-${item?.course_uid}`}
              expanded={isExpanded}
              onChange={() => handleExpandToggle(item?.course_uid)}
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  isExpanded ? (
                    <ExpandLess sx={{ color: "white", fontSize: 30 }} />
                  ) : (
                    <ExpandMore sx={{ color: "white", fontSize: 30 }} />
                  )
                }
                sx={{
                  backgroundColor: item?.course_color,
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                  flexWrap={"wrap"}
                >
                  <Image
                    publicId={item?.course_logo}
                    style={{ width: 70, height: 70, objectFit: "contain" }}
                    cloudName={item?.course_logo?.split("/")[0]}
                  />
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" color="white" fontWeight={700}>
                      {item?.course_name}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ overflowX: "auto" }}
                    >
                      {item?.batches?.map((batch, batchIndex) => (
                        <IconButton
                          key={batchIndex}
                          onClick={() => navigate(`/Batches/${batch}`)}
                        >
                          <StatusStyledComponent
                            value={batch}
                            color="#3A35C9"
                            backgroundColor="white"
                          />
                        </IconButton>
                      ))}
                    </Stack>
                  </Stack>
                  <StatusStyledComponent
                    value={item?.status}
                    color={color}
                    backgroundColor={backgroundColor}
                  />
                </Stack>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: 2,
                  maxHeight: 300,
                  overflowY: "auto",
                }}
              >
                {item?.modules?.length > 0 ? (
                  item?.modules?.map((module, moduleIndex) => (
                    <Typography
                      key={moduleIndex}
                      sx={{
                        color: "#085186",
                        fontWeight: 600,
                        p: 2,
                        my: 2,

                        fontSize: "0.875rem",
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    >
                      {`${moduleIndex + 1}. ${module}`}
                    </Typography>
                  ))
                ) : (
                  <Typography
                    sx={{
                      color: "gray",
                      fontWeight: 600,
                      p: 2,
                      fontSize: "0.875rem",
                      textAlign: "center",
                    }}
                  >
                    No Modules Available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <NoDataPage
          errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739602175/No_data_found_kxvcuy.svg"
          errorHeading="No Data Available."
        />
      )}
    </Box>
  );
};

export default CourseList;
