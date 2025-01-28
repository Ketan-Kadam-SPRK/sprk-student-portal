import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { Image } from "cloudinary-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCourseGrpDetailsBYId } from "../course.actions";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import ErrorHandling from "../../Common/ErrorHandling";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";

function CoureseDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headers = useAuthHeaders();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);
  const [error404, setError404] = useState(false);
  const { courseId } = useParams();
  console.log(courseId);

  // const [data, setData] = useState(dummyData);
  const [expandedCourseId, setExpandedCourseId] = useState(null); // Track expanded course

  const getCourseDetailsAPi = async () => {
    try {
      setLoading(true);

      const res = await dispatch(
        getCourseGrpDetailsBYId({ headers, id: courseId })
      );
      const status = res?.payload?.status;
      const data = res?.payload?.data?.data || {};
      console.log(res);

      if (status === 500 || status === 503) {
        setError500(true);
      } else if (status === 404 || status === 400) {
        setError404(true);
      } else {
        setData(data);
      }
      setLoading(false);

      console.log(res);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseDetailsAPi();
  }, [courseId]);

  const getStatusProperties = (status) => {
    switch (status) {
      case "ONGOING":
        return {
          style: { bgcolor: "#DDEBFF", color: "#0038A8" },
          icon: <RotateRightIcon sx={{ color: "#0038A8" }} />,
        };
      case "COMPLETED":
        return {
          style: { bgcolor: "#CBFFAC", color: "#368C00" },
          icon: <CheckCircleOutlineIcon sx={{ color: "#368C00" }} />,
        };
      case "EXPIRED":
        return {
          style: { bgcolor: "#D1D1D1", color: "#3D3D3D" },
          icon: <InfoRoundedIcon sx={{ color: "#3D3D3D" }} />,
        };
      default:
        return {
          style: { bgcolor: "#FFFFB8", color: "#783B09" },
          icon: <PauseCircleOutlineIcon />,
        };
    }
  };

  const handleExpandToggle = (courseId) => {
    // Toggle the expanded state of the course
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  if (loading || error500 || error404) {
    return (
      <ErrorHandling
        error500={error500}
        loadData={loading}
        notFound={error404}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // minHeight: "100vh",
        overflow: "auto",
        flex: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          gap: "20px",
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: "flex" }}>
          <Button
            variant="outlined"
            sx={{ color: "#747474" }}
            onClick={() => navigate(-1)}
          >
            {<ArrowBackIcon />}
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              marginRight: "10px",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            COURSE GROUP STATUS :
          </Typography>
          {/* Display Batch Status with Styling */}
          <Box
            sx={{
              width: "150px",
              borderRadius: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px", // Add spacing between icon and text
              padding: "5px",
              // ...getStatusProperties(data.course_Status).style,
            }}
          >
            {/* {getStatusProperties(data.course_Status).icon}{" "} */}
            {/* Render the icon */}
            {/* <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              {data.course_Status
                ? data.course_Status.replace("_", " ").toUpperCase()
                : "NA"}
            </Typography> */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          p: 2,
          // minHeight: "100vh",
          flex: 1,
          // overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Accordion sx={{ p: 2 }}>
            <AccordionSummary
              expandIcon={
                <InfoRoundedIcon
                  sx={{ fontSize: "30px", color: "#0073E6 !important" }}
                />
              }
            >
              <Image
                publicId={data?.cg_logo}
                style={{
                  width: "70px",
                  height: "auto",
                  objectFit: "cover",
                }}
                cloudName={data?.cg_logo?.split("/")[0]}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "20px", sm: "25px", md: "30px" },
                  fontWeight: "bold",
                  ml: 2,
                }}
              >
                {data?.cg_name || "NA"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Box style={{ color: "#0074BD", fontWeight: 600 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#464646" }}
                  >
                    Course Overview
                  </Typography>
                  <Typography sx={{ color: "#6E6E6E" }}>
                    {data?.cg_overview || "No Overview Available"}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#464646" }}
                  >
                    Key Features
                  </Typography>
                  {data?.key_features?.length > 0 ? (
                    data?.key_features?.map((item, featureIndex) => (
                      <Typography
                        key={item.id}
                        sx={{
                          marginLeft: 2,
                          fontSize: "16px",
                          color: "#6E6E6E",
                        }}
                      >
                        {`${featureIndex + 1}. ${item?.feature}`}
                      </Typography>
                    ))
                  ) : (
                    <Typography
                      sx={{ marginLeft: 2, fontSize: "16px", color: "#6E6E6E" }}
                    >
                      No Key Features Available
                    </Typography>
                  )}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
            // height: "100%",
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
              Here’s the list of courses in this course group
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              overflowY: "auto",
            }}
          >
            {data?.courses?.length > 0 ? (
              data?.courses?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    borderRadius: "10px",
                    p: 2,
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                    backgroundColor: `${item?.course_color}`,
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                  onClick={() => handleExpandToggle(item?.course_uid)} // Handle card click
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                        // flexWrap: "wrap",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Image
                        publicId={item?.course_logo}
                        style={{
                          width: "70px",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        cloudName={item?.course_logo?.split("/")[0]}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "var(--font-size-medium)",
                            fontWeight: "700",
                          }}
                        >
                          {item?.course_name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "10px",
                            // p: 2,
                            borderRadius: "10px",
                            alignItems: "center",
                            overflow: "auto",
                            maxWidth: {
                              xs: "40vw",
                              sm: "40vw",
                              md: "40vw",
                              lg: "60vw",
                            },
                          }}
                        >
                          {item?.batches?.map((batch, batchIndex) => (
                            <StatusStyledComponent
                              key={batchIndex}
                              value={batch}
                              color={"black"}
                              backgroundColor={"white"}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      sx={
                        {
                          // cursor: "pointer",
                          // position: "absolute",
                          // top: "50%",
                          // transform: "translateY(-50%)",
                          // right: "10px",
                        }
                      }
                    >
                      {expandedCourseId === item?.course_uid ? (
                        <ExpandLessRounded
                          sx={{ color: "white", fontSize: "30px" }}
                        />
                      ) : (
                        <ExpandMoreRounded
                          sx={{ color: "white", fontSize: "30px" }}
                        />
                      )}
                    </IconButton>
                  </Box>
                  {expandedCourseId === item?.course_uid && (
                    <Box
                      sx={{
                        // maxHeight:
                        //   expandedCourseId === item?.courseId ? "200px" : "0px",
                        transition: "max-height 0.3s ease",
                        backgroundColor: "white",
                        p: 2,
                        borderRadius: "10px",
                        gap: "10px",
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "300px",
                        overflow: "auto",
                      }}
                    >
                      {item?.modules?.length > 0 ? (
                        item?.modules?.map((module, moduleIndex) => (
                          <Typography
                            key={moduleIndex}
                            sx={{
                              color: "var(--sidebar-bg-color)",
                              fontWeight: "600",
                              p: 2,
                              fontSize: "var(--font-size-small)",
                              borderRadius: "10px",
                              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                            }}
                          >
                            {`${moduleIndex + 1}. ${module}`}
                          </Typography>
                        ))
                      ) : (
                        <Typography
                          sx={{
                            color: "var(--sidebar-bg-color)",
                            fontWeight: "600",
                            p: 2,
                            fontSize: "var(--font-size-small)",
                            borderRadius: "10px",
                            textAlign: "center",
                          }}
                        >
                          No Modules Available
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  color: "var(--sidebar-bg-color)",
                  fontWeight: "600",
                  p: 2,
                  fontSize: "var(--font-size-small)",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                No Courses Available
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CoureseDetails;
