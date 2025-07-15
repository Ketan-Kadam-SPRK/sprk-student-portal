import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import BatchCard from "./Child/BatchCard";
import { Image } from "cloudinary-react";

import NoDataPageDashboard from "../Common/NoDataPageDashboard";
import dateFormator from "../../Utils/dateFormator";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { formatDateTime } from "../../Utils/dateTimeFormator";
import ErrorHandling from "../Common/ErrorHandling";
import { useNavigate } from "react-router-dom";
import TypingAnimation from "./Child/TypingAnimation";
import { getAllCertificates } from "../Certification/certificate.actions";
import {
  getDashExams,
  getDashJobs,
  getTodaysBatches,
} from "./dashboard.actions";
import StudentStatus from "../Common/student status/StudentStatus";

function Dashboard() {
  function convertToTitleCase(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .split("_") // Split words by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // Join words with a space
  }
  const headers = useAuthHeaders();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentStatus = useSelector(
    (state) => state.authSlice.userDetails?.student_status
  );
  const [batches, setBatches] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  /**
   * Fetches all data required for the dashboard and updates the state
   *
   * Fetches the following data:
   * - Today's batches
   * - All certificates
   * - Upcoming exams
   * - New job postings
   *
   * Processes the data and updates the state with the sorted/extracted data
   *
   * @returns {Promise<void>}
   */
  const fetchAllDashboardData = async () => {
    try {
      setLoading(true);
      const [batchesRes, certificatesRes, examsRes, jobsRes] =
        await Promise.all([
          dispatch(getTodaysBatches({ headers })),
          dispatch(getAllCertificates({ headers })),
          dispatch(getDashExams({ headers })),
          dispatch(getDashJobs({ headers })),
        ]);

      // Extract and process data from responses
      const batchData = batchesRes?.payload?.data?.data || [];
      const sortedBatches = batchData.sort(
        (a, b) => new Date(b.start_time) - new Date(a.start_time)
      );

      const certificatesData = certificatesRes?.payload?.data?.data || [];
      const examsData = examsRes?.payload?.data?.data || [];
      const jobsData = jobsRes?.payload?.data?.data || [];

      // Update state with the processed data
      setBatches(sortedBatches);
      setCertificates(certificatesData);
      setExams(examsData);
      setJobs(jobsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const Events = [];

  if (loading) {
    return <ErrorHandling loadData={loading} />;
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
          gap: 3,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "var(--primary-color)",
            justifyContent: "space-between",
            p: 2,
            borderRadius: "10px",
            flexWrap: "wrap",
            color: "white",
            flex: 3,
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              maxWidth: "400px",
              justifyContent: "space-between",
              minHeight: "170px",
            }}
          >
            <TypingAnimation />

            <Typography
              sx={{
                fontSize: "var(--font-size-small)",
                fontStyle: "italic",
              }}
            >
              " In a world of endless networks, the strongest connection is
              between knowledge and curiosity ".
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              gap: 2,
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <StudentStatus status={studentStatus || "ACTIVE"} />
            <Image
              cloudName="dxlzzgbfw"
              publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1738920467/Educational_video_for_online_education_egzdnt.svg"
              style={{ width: "200px", height: "auto" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            // boxShadow:
            //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            p: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
            >
              Upcoming Events
            </Typography>

            <Image
              style={{
                width: "20px",
                height: "auto",
                objectFit: "contain",
              }}
              publicId={
                "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739253981/red_and_white_megaphone_n6xssx.svg"
              }
              cloudName="dxlzzgbfw"
            />
          </Box>
          <Box sx={{ display: "flex", overflowX: "auto" }}>
            {Events?.length > 0 ? (
              Events?.map((res, index) => (
                <Box
                  key={`${index}`}
                  sx={{
                    display: "flex",
                    p: 2,
                    borderRadius: "10px",
                    gap: 4,
                    minWidth: "250px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    backgroundColor: "#F1F5FF",
                    cursor: "pointer",
                  }}
                  // onClick={() => navigate(`/Exams`)}
                >
                  <Image
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    }}
                    publicId={res?.logo}
                    cloudName={res?.logo?.split("/")[2]}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >{`${res.title}`}</Typography>

                    <Typography
                      sx={{
                        fontSize: "var(--font-size-extra-small)",
                        color: "red",
                        display: "flex", // Ensures proper alignment of icon and text
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: "black", // Color of the bullet
                          borderRadius: "50%", // Makes it circular
                          display: "inline-block",
                          marginRight: "8px", // Space between the bullet and text
                        }}
                      ></Box>
                      {`Start on : ${formatDateTime(res?.start)}`}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <NoDataPageDashboard
                errorImgPublicId={null}
                errorHeading="No Events Yet!"
                errorDescription="We're working on something exciting. Stay tuned!"
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "white",
            p: 2,
            borderRadius: "10px",
            flex: 3,
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            // boxShadow:
            //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
              >
                Today's Sessions
              </Typography>
              <Image
                style={{
                  width: "20px",
                  height: "auto",
                  objectFit: "contain",
                }}
                publicId={
                  "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739253981/calendar-svgrepo-com_2_1_dkekjd.svg"
                }
                cloudName="dxlzzgbfw"
              />
            </Box>
            <Typography fontWeight={500}>{dateFormator(new Date())}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {batches?.length > 0 ? (
              batches?.map((item, index) => (
                <BatchCard key={`${item?.batch_uid}-${index}`} item={item} />
              ))
            ) : (
              <NoDataPageDashboard
                errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1738920467/Educational_video_for_online_education_egzdnt.svg"
                errorHeading="No Sessions Today!"
                errorDescription="Take a break or revise past lessons to stay ahead."
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            // boxShadow:
            //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            p: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
            >
              Exams
              <Image
                style={{
                  width: "20px",
                  height: "auto",
                  objectFit: "contain",
                  marginLeft: "5px",
                }}
                publicId={
                  "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739254460/ndjoyyrgaezboup67csd.png"
                }
                cloudName="dxlzzgbfw"
              />
            </Typography>

            {exams?.length > 0 && (
              <Button
                endIcon={<ChevronRightRoundedIcon />}
                sx={{
                  ml: "auto",
                  fontWeight: "bold",
                  fontSize: "var(--font-size-extra-small)",
                }}
                onClick={() => navigate(`/Exams`)}
              >
                View All
              </Button>
            )}
          </Box>
          {exams?.length > 0 ? (
            exams?.map((res, index) => (
              <Box
                key={`${res?.exam_uid}-${index}`}
                sx={{
                  display: "flex",
                  p: 2,
                  borderRadius: "10px",
                  gap: 4,
                  minWidth: "250px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  backgroundColor: "#F1F5FF",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/Exams`)}
              >
                <Image
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  }}
                  publicId={res?.cou_logo}
                  cloudName={res?.cou_logo?.split("/")[2]}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >{`${res?.cou_name}`}</Typography>
                  <Typography
                    sx={{
                      fontSize: "var(--font-size-small)",
                      color: "#565656",
                      fontWeight: "bold",
                    }}
                  >{`Exam ID: ${res?.exam_uid}`}</Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      color: "red",
                      display: "flex", // Ensures proper alignment of icon and text
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "red", // Color of the bullet
                        borderRadius: "50%", // Makes it circular
                        display: "inline-block",
                        marginRight: "8px", // Space between the bullet and text
                      }}
                    ></Box>
                    {`Start on : ${formatDateTime(res?.exam_startDate)}`}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <NoDataPageDashboard
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736771092/Cup_of_coffee_top_view_clipboard_with_clip_sheet_of_paper_and_two_pencils_sugnga.svg"
              errorHeading="No Exams Yet!"
              errorDescription="Use this time to revise and sharpen your skills."
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "white",
            p: 2,
            borderRadius: "10px",
            flex: 3,
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            // boxShadow:
            //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            minWidth: "300px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
              >
                Certificates
              </Typography>
              <Image
                style={{
                  width: "20px",
                  height: "auto",
                  objectFit: "contain",
                }}
                publicId={
                  "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739253981/certificate-contract-svgrepo-com_1_l211vd.svg"
                }
                cloudName="dxlzzgbfw"
              />
            </Box>

            {certificates?.length > 0 && (
              <Button
                endIcon={<ChevronRightRoundedIcon />}
                sx={{
                  fontWeight: "bold",
                  fontSize: "var(--font-size-extra-small)",
                }}
                onClick={() => navigate(`/Certificates`)}
              >
                View All
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "scroll",
              p: 2,
              alignContent: "flex-start",
              flex: 1,
              height: "auto",
            }}
          >
            {certificates?.length > 0 ? (
              certificates?.map((certificate, index) => (
                <Box
                  key={`${certificate?.boo_uid}-${index}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    p: 2,
                    borderRadius: "10px",
                    alignItems: "center",
                    width: "250px",
                    minWidth: "250px",
                    maxWidth: "300px",
                    flex: 1,
                    overflow: "hidden",
                    backgroundColor: ["READY", "RELEASED"].includes(
                      certificate?.status
                    )
                      ? "var(--background-color)"
                      : "#EFEFEF",
                  }}
                >
                  <Image
                    style={{
                      width: "200px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    publicId={
                      ["RELEASED", "READY"].includes(certificate?.status)
                        ? "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739507762/certificate_1_hts2yk.svg"
                        : "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739507762/Vector_3_f9j8ip.svg"
                      // ? "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737461523/Reward_badge_with_star_and_ribbon_tkvffi.svg"
                      // : "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739185789/Reward_badge_with_star_and_ribbon_2_owdvvg.svg"
                    }
                    cloudName="dxlzzgbfw"
                  />
                  <Typography
                    sx={{
                      fontSize: "var(--font-size-small)",
                      fontWeight: "bold",
                      color: ["RELEASED", "READY"].includes(certificate?.status)
                        ? "black"
                        : "grey",
                    }}
                  >
                    {convertToTitleCase(certificate?.status)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      fontWeight: "bold",
                      // textOverflow: "ellipsis",
                      // overflow: "hidden",
                      // whiteSpace: "nowrap",
                      // width: "100px",
                      textAlign: "center",
                      color: ["RELEASED", "READY"].includes(certificate?.status)
                        ? "#085186"
                        : "grey",
                    }}
                  >
                    {certificate?.cou_name}
                  </Typography>
                </Box>
              ))
            ) : (
              <NoDataPageDashboard
                errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737804838/Certificate_medal_and_graduation_cap_u3nply.svg"
                errorHeading="No Certificates Yet!"
                errorDescription="Enroll in a course to start earning your certificates."
              />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // flexGrow: 10,
            flex: 2,
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",

            p: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
            >
              Recently Added Jobs{" "}
              <Image
                style={{
                  width: "20px",
                  height: "auto",
                  objectFit: "contain",
                  marginLeft: "5px",
                }}
                publicId={
                  "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739254478/ccyolkdgxmljm4bmpkai.png"
                }
                cloudName="dxlzzgbfw"
              />
            </Typography>

            {jobs?.length > 0 && (
              <Button
                endIcon={<ChevronRightRoundedIcon />}
                sx={{
                  ml: "auto",
                  fontWeight: "bold",
                  fontSize: "var(--font-size-extra-small)",
                }}
                onClick={() => navigate(`/Job_Opportunities`)}
              >
                View All
              </Button>
            )}
          </Box>
          {jobs?.length > 0 ? (
            jobs?.map((res, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  p: 2,
                  borderRadius: "10px",
                  gap: 4,
                  minWidth: "250px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  backgroundColor: "#F1F5FF",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/Job_Opportunities/${res?.job_uid}`);
                }}
              >
                <Image
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  }}
                  publicId={res?.comp_logo}
                  cloudName={res?.comp_logo?.split("/")[2]}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {`${res?.post_name} `}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-small)",
                      color: "#565656",
                      fontWeight: "bold",
                    }}
                  >
                    {res?.comp_name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      color: "#858585",
                    }}
                  >{`Posted On: ${formatDateTime(
                    res?.created_at
                  )}`}</Typography>
                </Box>
              </Box>
            ))
          ) : (
            <NoDataPageDashboard
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1738046047/Search_for_a_job_candidate_jeezzw.png"
              errorHeading="No Job Openings Right Now!"
              errorDescription="Keep building your skills while we update jobs!"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
