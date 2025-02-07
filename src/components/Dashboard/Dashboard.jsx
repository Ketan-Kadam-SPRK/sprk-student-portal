import { Grid2, Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import BatchCard from "./Child/BatchCard";
import { Image } from "cloudinary-react";
import { modifyEventJson } from "../../Utils/ModifyEventJson";
import CircularWithValueLabel from "../Common/CircularProgressWithLable";
import BoxCard from "./Child/BoxCard";
import { useSelector } from "react-redux";
import NoDataPageDashboard from "../Common/NoDataPageDashboard";
import dateFormator from "../../Utils/dateFormator";

function Dashboard() {
  const userDetails = useSelector((state) => state.authSlice.userDetails);
  const EventJson = [
    {
      bth_id: "BTH24MARBEXL31",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "Basic Excel",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      bth_status: "BOOKED",
      est_start: "2026-02-26T05:30:00Z",
      est_end: "2026-04-16T07:30:00Z",
      students: 1,
      zone: "Asia/Calcutta",
      week_days: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
      sessions: [
        {
          session_id: "SSN24DDEA7A",
          start: "2026-02-26T05:30:00Z",
          end: "2026-02-26T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN247CD325",
          start: "2026-02-27T05:30:00Z",
          end: "2026-02-27T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN247A19F7",
          start: "2026-03-05T05:30:00Z",
          end: "2026-03-05T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN249D06A5",
          start: "2026-03-06T05:30:00Z",
          end: "2026-03-06T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },

        {
          session_id: "SSN24C4D1EC",
          start: "2026-03-19T05:30:00Z",
          end: "2026-03-19T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24947357",
          start: "2026-03-20T05:30:00Z",
          end: "2026-03-20T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
      ],
    },
    {
      bth_id: "BTH24FEBCJAV1",
      faculty_id: "SPRK24PANB5",
      faculty_name: "Pankaj Pawar",
      course_name: "Core Java",
      course_color: "#2B0948",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483574/sprk/courses/java_mbn80i.svg",
      bth_status: "ONHOLD",
      est_start: "2024-02-24T05:30:00Z",
      est_end: "2024-04-13T07:45:00Z",
      students: 19,
      zone: "Asia/Calcutta",
      week_days: ["SATURDAY"],
      sessions: [
        {
          session_id: "SSN24CF0897",
          start: "2024-02-24T05:30:00Z",
          end: "2024-02-24T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24E12934",
          start: "2024-03-02T05:30:00Z",
          end: "2024-03-02T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN248B00BD",
          start: "2024-03-09T05:30:00Z",
          end: "2024-03-09T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN2457FC44",
          start: "2024-03-16T05:30:00Z",
          end: "2024-03-16T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24965CD1",
          start: "2024-03-23T05:30:00Z",
          end: "2024-03-23T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
      ],
    },

    {
      bth_id: "BTH24MARCPRG2",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "C Programming",
      course_color: "#472D30",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483565/sprk/courses/c_qtljqk.svg",
      bth_status: "BOOKED",
      est_start: "2024-07-09T06:30:00Z",
      est_end: "2025-01-21T08:30:00Z",
      students: 2,
      zone: "Asia/Calcutta",
      week_days: ["TUESDAY", "THURSDAY", "FRIDAY"],
      sessions: [
        {
          session_id: "SSN24D4EFE1",
          start: "2024-07-09T06:30:00Z",
          end: "2024-07-09T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24D0A44A",
          start: "2024-07-16T06:30:00Z",
          end: "2024-07-16T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24865B0A",
          start: "2024-07-23T06:30:00Z",
          end: "2024-07-23T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },

        {
          session_id: "SSN240EBA6A",
          start: "2024-11-12T06:30:00Z",
          end: "2024-11-12T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24A9BF95",
          start: "2024-11-19T06:30:00Z",
          end: "2024-11-19T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
      ],
    },
  ];

  const modifiedData = modifyEventJson(EventJson);

  const latestExams = [
    {
      course_name: "Python",
      course_logo:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483582/sprk/courses/python_x9slrg.svg",
      exam_uid: "E250118aef",
      batch_uid: "BTH25JANPYTH50",
      assigned_by: "Kavita Pankaj Pawar",
      start_date: "2025-01-18T10:33:00Z",
      end_date: "2025-01-19T09:33:00Z",
      duration: null,
      status: null,
      assessment_type: null,
      course_color: "#0A9396",
    },
    {
      course_name: "HTML5",
      course_logo:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483572/sprk/courses/html_htzzt2.svg",
      exam_uid: "E250121e69",
      batch_uid: "BTH24JULHTM52",
      assigned_by: "Kavita Pankaj Pawar",
      start_date: "2025-01-21T10:01:00Z",
      end_date: "2025-01-22T09:01:00Z",
      duration: null,
      status: null,
      assessment_type: null,
      course_color: "#4B0082",
    },
  ];

  const recentJob = [
    {
      job_uid: "JOc96e973843",
      comp_uid: "COMP5f44c46714",
      comp_name: "Tech Innovations Pvt Ltd",
      job_title: "react dev",
      location: "Mumbai",
      location_uid: null,
      required_skills: ["Ca7817df73"],
      vacancies: null,
      job_description: null,
      job_status: "CLOSE",
      expiration_date: null,
      companylogo:
        "http://res.cloudinary.com/duttop4n6/image/upload/v1732712053/z3ajilj63ixshygxkptc.png",
      updatedAt: "2024-11-28T06:13:42.393498Z",
    },
    {
      job_uid: "JOc96e973843",
      comp_uid: "COMP5f44c46714",
      comp_name: "Tech Innovations Pvt Ltd",
      job_title: "react dev",
      location: "Mumbai",
      location_uid: null,
      required_skills: ["Ca7817df73"],
      vacancies: null,
      job_description: null,
      job_status: "CLOSE",
      expiration_date: null,
      companylogo:
        "http://res.cloudinary.com/duttop4n6/image/upload/v1732712053/z3ajilj63ixshygxkptc.png",
      updatedAt: "2024-11-28T06:13:42.393498Z",
    },
  ];

  const certificates = [
    {
      id: 1,
      title: "Ready",
      description: "Full Stack Java",
      imageUrl:
        "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737461523/Reward_badge_with_star_and_ribbon_tkvffi.svg",
    },
    {
      id: 2,
      title: "To_Reviwe",
      description: "React Mastery",
      imageUrl:
        "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737461523/Reward_badge_with_star_and_ribbon_tkvffi.svg",
    },
  ];

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
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            backgroundColor: "#0073E6",
            color: "white",
            borderRadius: "10px",
            flexBasis: "auto",
            p: 2,
            flex: 1,
          }}
        >
          <Typography variant="h5">{`Welcome, Pooja Verma !`}</Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
            }}
          >
            Ready to achieve your next milestone?
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
            flex: 2,
          }}
        >
          <BoxCard
            title="Ongoing"
            number="5"
            image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_fipttr.svg"
            bgColor="#6560F0"
          />

          <BoxCard
            title="Completed"
            number="5"
            image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
            bgColor="#1F7C20"
          />
          <BoxCard
            title="Pending"
            number="5"
            image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_2_himwuf.svg"
            bgColor="#E0BB0D"
          />
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
            >
              Today's Sessions
            </Typography>

            <Typography fontWeight={600}>{dateFormator(new Date())}</Typography>
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
            {modifiedData?.length < 0 ? (
              modifiedData.map((item, index) => (
                <BatchCard key={index} item={item} />
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
            p: 2,
            gap: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
          >
            Exams
          </Typography>
          {latestExams?.length < 0 ? (
            latestExams?.map((res, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  p: 2,
                  borderRadius: "10px",
                  gap: 4,
                  minWidth: "250px",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                }}
              >
                <Image
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  publicId={res?.course_logo}
                  cloudName={res?.course_logo?.split("/")[2]}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">{`${res.course_name} | Exam ID: ${res.exam_uid}`}</Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      color: "grey",
                    }}
                  >
                    {res.batch_uid}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      color: "red",
                    }}
                  >{`Submit before : ${res.end_date}`}</Typography>
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
            minWidth: "300px",
          }}
        >
          <Typography
            sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
          >
            Certificates
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {certificates?.length < 0 ? (
              certificates?.map((certificate) => (
                <Box
                  key={certificate.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                    p: 2,
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "150px",
                  }}
                >
                  <Image
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    publicId={certificate.imageUrl}
                    cloudName="dxlzzgbfw"
                  />
                  <Typography
                    sx={{
                      fontSize: "var(--font-size-small)",
                      fontWeight: "bold",
                    }}
                  >
                    {certificate.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      fontWeight: "bold",
                    }}
                  >
                    {certificate.description}
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
          <Typography
            sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
          >
            Recently Added Jobs
          </Typography>
          {recentJob?.length < 0 ? (
            recentJob?.map((res, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  p: 2,
                  borderRadius: "10px",
                  gap: 4,
                  minWidth: "250px",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                }}
              >
                <Image
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  publicId={res?.companylogo}
                  cloudName={res?.companylogo?.split("/")[2]}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">{`${res.job_title} `}</Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      color: "grey",
                    }}
                  >
                    {res.comp_name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                    }}
                  >{`Posted On: ${res.updatedAt}`}</Typography>
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
