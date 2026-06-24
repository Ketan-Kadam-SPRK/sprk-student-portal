import {
  Box,
  LinearProgress,
  Typography,
  IconButton,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState } from "react";
import NoDataPage from "../../Common/NoDataPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { useCheckPermission } from "../../../Utils/checkPermission";

const CourseList = ({ data, navigate }) => {
  console.log("Data..", data);
  const { checkPermission } = useCheckPermission();

  const [expandedCourseId, setExpandedCourseId] = useState(null);

  const handleExpandToggle = (courseId) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  const getStatusColor = (status) => {
    let color = "";
    let backgroundColor = "";
    switch (status) {
      case "ONGOING":
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
      case "CANCELLED":
        color = "#A30000";
        backgroundColor = "#FFC0C0";
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
          const { color, backgroundColor } = getStatusColor(item?.cou_status);
          const isExpanded = expandedCourseId === item?.course_uid;

          const count = item?.completedModuleCount ?? 0;
          const total = item?.modules?.length ?? 0;
          const progress =
            count < 0 || total === 0
              ? 0
              : Math.min(Math.round((count / total) * 100), 100);

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
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                sx={{
                  backgroundColor: item?.course_color,
                  borderRadius: 2,
                  p: 2,
                  alignItems: "flex-start",
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    marginTop: "8px",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  {/* LEFT - Image + Batches */}
                  <Stack alignItems="center" spacing={1}>
                    <img
                      src={item?.course_logo}
                      alt={item?.course_name}
                      loading="lazy"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ overflowX: "auto" }}
                    >
                      {item?.batches?.map((batch, batchIndex) => (
                        <IconButton
                          key={batchIndex}
                          id="batch_details_btn"
                          onClick={() => {
                            checkPermission("BATCHES") &&
                              navigate(`/Batches/${batch}`);
                          }}
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

                  {/* RIGHT - Name + Progress + Status */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {/* Row 1 - Course Name + Status */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" color="white" fontWeight={700}>
                        {item?.course_name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row", md: "row" },
                          alignItems: {
                            xs: "flex-start",
                            sm: "center",
                            md: "center",
                          },
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "var(--font-size-medium)",
                            color: "white",
                            fontWeight: 200,
                          }}
                        >
                          Modules Status :
                        </Typography>
                        <StatusStyledComponent
                          value={item?.cou_status}
                          color={color}
                          backgroundColor={backgroundColor}
                        />
                      </Box>
                    </Box>

                    {/* Row 2 - Module Progress | Bar | % */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "var(--font-size-extra-small)",
                          color: "white",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Module Progress
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ flex: 1 }}
                      />
                      <Typography
                        sx={{
                          fontSize: "var(--font-size-small)",
                          fontWeight: "bold",
                          color: "white",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {`${progress}%`}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: 4,
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
