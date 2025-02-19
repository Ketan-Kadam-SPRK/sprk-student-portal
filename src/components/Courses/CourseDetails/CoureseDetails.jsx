import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { Image } from "cloudinary-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCourseGrpDetailsBYId } from "../course.actions";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import ErrorHandling from "../../Common/ErrorHandling";
import NoDataPage from "../../Common/NoDataPage";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
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

  const { color, backgroundColor } = getStatusColor(data?.status);

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
          flexWrap: "wrap",
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

        <Box
          sx={{ display: "flex", alignItems: "center", alignContent: "center" }}
        >
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
          {data?.courses?.length ? (
            <StatusStyledComponent
              value={data?.status}
              color={color}
              backgroundColor={backgroundColor}
            />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>NA</Typography>
          )}
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
        {data?.courses?.length > 0 && (
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
                        sx={{
                          marginLeft: 2,
                          fontSize: "16px",
                          color: "#6E6E6E",
                        }}
                      >
                        No Key Features Available
                      </Typography>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

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
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "var(--font-size-medium)",
              }}
            >
              Ready to Learn? Here’s Your List of Courses!
            </Typography>
            <Image
              publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739600628/book_shelf_v84akg.svg"
              style={{
                width: "30px",
                height: "auto",
                objectFit: "cover",
              }}
              cloudName="dxlzzgbfw"
            />
          </Box>
          <Box
            sx={{
              // height: "100%",
              minHeight: "70vh",
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
                  key={`${index}-${item?.course_uid}`}
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      p: 2,
                      borderRadius: "10px",

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
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            {item?.course_name}{" "}
                            {item?.is_completed && (
                              <CheckCircleRoundedIcon color="white" />
                            )}
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
                              <IconButton
                                key={batchIndex}
                                onClick={() => navigate(`/Batches/${batch}`)}
                              >
                                <StatusStyledComponent
                                  value={batch}
                                  color={"#3A35C9"}
                                  backgroundColor={"white"}
                                />
                              </IconButton>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <StatusStyledComponent
                          value={"Ongoing"}
                          color={"#3A35C9"}
                          backgroundColor={"white"}
                        />
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
                    </Box>
                  </Box>
                  {expandedCourseId === item?.course_uid && (
                    <Box
                      sx={{
                        // maxHeight:
                        //   expandedCourseId === item?.courseId ? "200px" : "0px",
                        transition: "max-height 0.3s ease",
                        backgroundColor: "white",
                        p: 2,
                        mx: 2,
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
                              color: "#085186",
                              fontWeight: "600",
                              p: 2,
                              fontSize: "var(--font-size-small)",
                              borderRadius: "10px",
                              boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
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
              <NoDataPage
                errorImgPublicId={
                  "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739602175/No_data_found_kxvcuy.svg"
                }
                errorHeading={"No Data Available."}
                errorDescription={""}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CoureseDetails;
