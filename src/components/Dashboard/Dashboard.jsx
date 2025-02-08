import { Grid2, Box, Typography, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import BatchCard from "./Child/BatchCard";
import { Image } from "cloudinary-react";
import { modifyEventJson } from "../../Utils/ModifyEventJson";
import CircularWithValueLabel from "../Common/CircularProgressWithLable";
import BoxCard from "./Child/BoxCard";
import { useSelector } from "react-redux";
import NoDataPageDashboard from "../Common/NoDataPageDashboard";
import dateFormator from "../../Utils/dateFormator";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getDashExams,
  getDashJobs,
  getTodaysBatches,
} from "./dashboard.actions";
import { getAllCertificates } from "../Certification/certificate.actions";

function Dashboard() {
  const userDetails = useSelector((state) => state.authSlice.userDetails);
  const headers = useAuthHeaders();
  const dispatch = useDispatch();
  const [batches, setBatches] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    getTodaysBatchData();
    getCertificateDashboard();
    getExams();
    getJobs();
  }, []);
  const getTodaysBatchData = async () => {
    try {
      const res = await dispatch(getTodaysBatches({ headers }));
      console.log(res);
      const data = res?.payload?.data?.data || [];
      const sorted = data?.sort(
        (a, b) => new Date(b.start_time) - new Date(a.start_time)
      );
      setBatches(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  const getCertificateDashboard = async () => {
    try {
      const res = await dispatch(getAllCertificates({ headers }));
      const data = res?.payload?.data?.data || [];
      setCertificates(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getExams = async () => {
    try {
      const res = await dispatch(getDashExams({ headers }));
      const data = res?.payload?.data?.data || [];

      setExams(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobs = async () => {
    try {
      const res = await dispatch(getDashJobs({ headers }));
      const data = res?.payload?.data?.data || [];
      setJobs(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            {batches?.length > 0 ? (
              batches.map((item, index) => (
                <BatchCard key={`${item.batch_uid}-${index}`} item={item} />
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
          {exams?.length > 0 ? (
            exams?.map((res, index) => (
              <Box
                key={`${res.exam_uid}-${index}`}
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
                  publicId={res?.cou_logo}
                  cloudName={res?.cou_logo?.split("/")[2]}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >{`${res.cou_name} | Exam ID: ${res.exam_uid}`}</Typography>

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-extra-small)",
                      color: "red",
                    }}
                  >{`Submit before : ${res.exam_endDate}`}</Typography>
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
                  key={`${certificate.boo_uid}-${index}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                    p: 2,
                    borderRadius: "10px",
                    // justifyContent: "center",
                    alignItems: "center",
                    width: "150px",
                    minWidth: "150px",
                    flex: 1,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{
                      width: "80px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737461523/Reward_badge_with_star_and_ribbon_tkvffi.svg"
                    cloudName="dxlzzgbfw"
                  />
                  <Typography
                    sx={{
                      fontSize: "var(--font-size-small)",
                      fontWeight: "bold",
                    }}
                  >
                    {certificate.status?.toLowerCase()}
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
                    }}
                  >
                    {certificate.cou_name}
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
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                }}
              >
                <Image
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  publicId={res?.comp_logo}
                  cloudName={res?.comp_logo?.split("/")[2]}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">{`${res.post_name} `}</Typography>

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
                  >{`Posted On: ${res.created_at}`}</Typography>
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
