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
  const { checkPermission } = useCheckPermission();
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [activeBatchIndex, setActiveBatchIndex] = useState({});
  const handleExpandToggle = (courseId) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  const handlePreviousBatch = (courseId, batches) => {
    if (!batches?.length) return;

    setActiveBatchIndex((prev) => {
      const currentIndex = prev?.[courseId] ?? 0;
      if (currentIndex === 0) return prev;
      return {
        ...prev,
        [courseId]: currentIndex - 1,
      };
    });
  };

  const handleNextBatch = (courseId, batches) => {
    if (!batches?.length) return;

    setActiveBatchIndex((prev) => {
      const currentIndex = prev?.[courseId] ?? 0;
      if (currentIndex === batches.length - 1) return prev;
      return {
        ...prev,
        [courseId]: currentIndex + 1,
      };
    });
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
    return {
      color,
      backgroundColor,
    };
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
        overflowX: "hidden",
        "@media (max-width:600px)": {
          p: 1,
          gap: 1.5,
        },
      }}
    >
      {data?.courses?.length > 0 ? (
        data.courses.map((item, index) => {
          const { color, backgroundColor } = getStatusColor(item?.cou_status);
          const isExpanded = expandedCourseId === item?.course_uid;
          const count = item?.completedModuleCount ?? 0;
          const total = item?.modules?.length ?? 0;
          const progress =
            count < 0 || total === 0
              ? 0
              : Math.min(Math.round((count / total) * 100), 100);
          const currentBatchIndex = activeBatchIndex?.[item?.course_uid] ?? 0;
          const currentBatch = item?.batches?.[currentBatchIndex];

          return (
            <Accordion
              key={`${index}-${item?.course_uid}`}
              expanded={isExpanded}
              onChange={() => handleExpandToggle(item?.course_uid)}
              sx={{
                width: "100%",
                minWidth: 0,
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden",
                "&:before": {
                  display: "none",
                },
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
                  p: {
                    xs: 1.5,
                    sm: 2,
                  },
                  alignItems: "flex-start",
                  "& .MuiAccordionSummary-content": {
                    minWidth: 0,
                    width: "100%",
                    margin: 0,
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: 0,
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    marginTop: "8px",
                    flexShrink: 0,
                  },
                  "@media (max-width:600px)": {
                    p: 1.5,
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      marginTop: "5px",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    minWidth: 0,
                    gap: {
                      xs: 0,
                      sm: 1.5,
                    },
                  }}
                >
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    alignItems={{
                      xs: "stretch",
                      sm: "center",
                    }}
                    spacing={{
                      xs: 1.5,
                      sm: 2,
                    }}
                    sx={{
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    {/* ================================================= */}
                    {/* LEFT SECTION */}
                    {/* ================================================= */}

                    <Stack
                      alignItems="center"
                      spacing={1}
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "auto",
                        },
                        minWidth: 0,
                        flexShrink: 0,
                      }}
                    >
                      {/* ================================================= */}
                      {/* MOBILE HEADER */}
                      {/* ================================================= */}

                      <Box
                        sx={{
                          display: {
                            xs: "flex",
                            sm: "none",
                          },
                          width: "100%",
                          minWidth: 0,
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {/* --------------------------------------------- */}
                        {/* TOP ROW - LOGO + STATUS */}
                        {/* --------------------------------------------- */}

                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* LOGO */}

                          <Box
                            sx={{
                              width: 70,
                              height: 70,
                              flexShrink: 0,
                              backgroundColor: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              borderRadius: 1,
                            }}
                          >
                            <img
                              src={item?.course_logo}
                              alt={item?.course_name}
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </Box>

                          {/* STATUS */}

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: 0.5,
                              minWidth: 0,
                              mr: 5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.72rem",
                                color: "white",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                              }}
                            >
                              Modules Status
                            </Typography>
                            <Box sx={{ ml: -4 }}>
                              <StatusStyledComponent
                                value={item?.cou_status}
                                color={color}
                                backgroundColor={backgroundColor}
                              />
                            </Box>
                          </Box>
                        </Box>

                        {/* --------------------------------------------- */}
                        {/* COURSE NAME */}
                        {/* --------------------------------------------- */}

                        <Typography
                          color="white"
                          fontWeight={700}
                          sx={{
                            fontSize: "1rem",
                            lineHeight: 1.25,
                            width: "100%",
                            minWidth: 0,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {item?.course_name}
                        </Typography>
                      </Box>

                      {/* ================================================= */}
                      {/* MOBILE BATCH CAROUSEL */}
                      {/* ================================================= */}

                      <Box
                        sx={{
                          display: {
                            xs: "flex",
                            sm: "none",
                          },
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5,
                          minWidth: 0,
                          mt: 0.5,
                        }}
                      >
                        {/* PREVIOUS */}

                        <IconButton
                          size="small"
                          disabled={
                            !item?.batches?.length || currentBatchIndex === 0
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreviousBatch(
                              item?.course_uid,
                              item?.batches || []
                            );
                          }}
                          sx={{
                            p: 0.3,
                            color: "white",
                            flexShrink: 0,
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              color: "white",
                              fontSize: "25px",
                              fontWeight: 700,
                              mr: 2,
                              lineHeight: 1,
                            }}
                          >
                            ‹
                          </Typography>
                        </IconButton>

                        {/* CURRENT BATCH */}

                        {currentBatch && (
                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              if (checkPermission("BATCHES")) {
                                navigate(`/Batches/${currentBatch}`);
                              }
                            }}
                            sx={{
                              backgroundColor: "white",
                              color: "#3A35C9",
                              borderRadius: "20px",
                              px: {
                                xs: 3,
                                sm: 8,
                              },
                              py: 0.7,
                              maxWidth: "70%",
                              minWidth: 0,
                              cursor: "pointer",
                              overflow: "hidden",
                              textAlign: "center",
                              flexShrink: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {currentBatch}
                            </Typography>
                          </Box>
                        )}

                        {/* NEXT */}

                        <IconButton
                          size="small"
                          disabled={
                            !item?.batches?.length ||
                            currentBatchIndex ===
                              (item?.batches?.length ?? 1) - 1
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextBatch(
                              item?.course_uid,
                              item?.batches || []
                            );
                          }}
                          sx={{
                            p: 0.3,
                            color: "white",
                            flexShrink: 0,
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              color: "white",
                              fontSize: "25px",
                              ml: 2,
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            ›
                          </Typography>
                        </IconButton>
                      </Box>

                      {/* ================================================= */}
                      {/* DESKTOP LOGO */}
                      {/* ================================================= */}

                      <Box
                        sx={{
                          display: {
                            xs: "none",
                            sm: "flex",
                          },
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item?.course_logo}
                          alt={item?.course_name}
                          loading="lazy"
                          style={{
                            width: "100px",
                            height: "100px",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </Stack>

                    {/* ================================================= */}
                    {/* RIGHT SECTION */}
                    {/* ================================================= */}

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        "@media (max-width:600px)": {
                          width: "100%",
                        },
                      }}
                    >
                      {/* ================================================= */}
                      {/* DESKTOP COURSE NAME + STATUS */}
                      {/* ================================================= */}

                      <Box
                        sx={{
                          display: {
                            xs: "none",
                            sm: "flex",
                          },
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 1,
                          width: "100%",
                          minWidth: 0,
                        }}
                      >
                        {/* COURSE NAME */}

                        <Typography
                          variant="h6"
                          color="white"
                          fontWeight={700}
                          sx={{
                            minWidth: 0,
                            maxWidth: "100%",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {item?.course_name}
                        </Typography>

                        {/* STATUS */}

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 1,
                            maxWidth: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "var(--font-size-medium)",
                              color: "white",
                              fontWeight: 200,
                              whiteSpace: "nowrap",
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

                      {/* ================================================= */}
                      {/* PROGRESS */}
                      {/* ================================================= */}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: {
                            xs: 1,
                            sm: 2,
                          },
                          width: "100%",
                          minWidth: 0,
                          // Mobile bottom spacing
                          "@media (max-width:600px)": {
                            mt: 0.5,
                          },
                        }}
                      >
                        {/* LABEL */}

                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.65rem",
                              sm: "var(--font-size-extra-small)",
                            },
                            color: "white",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          Module Progress
                        </Typography>
                        {/* PROGRESS BAR */}
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            flex: 1,
                            minWidth: 0,
                            height: {
                              xs: 4,
                              sm: 5,
                            },
                          }}
                        />
                        {/* PERCENTAGE */}
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.7rem",
                              sm: "var(--font-size-small)",
                            },
                            fontWeight: "bold",
                            color: "white",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {`${progress}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                    justifyContent="flex-start"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "flex",
                      },
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    {item?.batches?.map((batch, batchIndex) => (
                      <IconButton
                        key={batchIndex}
                        id="batch_details_btn"
                        sx={{
                          p: 0,
                          flexShrink: 0,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (checkPermission("BATCHES")) {
                            navigate(`/Batches/${batch}`);
                          }
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
                </Box>
              </AccordionSummary>

              {/* ===================================================== */}
              {/* ACCORDION DETAILS */}
              {/* ===================================================== */}

              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: 4,
                  maxHeight: 300,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {item?.modules?.length > 0 ? (
                  item.modules.map((module, moduleIndex) => (
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
                        overflowWrap: "anywhere",
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
