import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BookIcon from "@mui/icons-material/Book";

import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import BoxCard from "../Dashboard/Child/BoxCard";
import BatchCardHorizontal from "./child/BatchCardHorizontal";
import ErrorHandling from "../Common/ErrorHandling";
import NoDataPage from "../Common/NoDataPage";
import { getBatches } from "./action/batches.actions";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
function Batches() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);

  useEffect(() => {
    getStudentBatches();
  }, []);

  /**
   * Fetches the list of student batches and updates the component state.
   *
   * This function dispatches the `getBatches` action to fetch batches from the server.
   * It updates the `batches` state with the retrieved data. If the server returns an error
   * status of 500 or 503, it sets the `error500` state to true. The loading state is managed
   * by setting `loading` to true at the start of the operation and false upon completion.
   */

  const getStudentBatches = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getBatches({ headers }));
      const data = res?.payload?.data?.data || [];
      const status = res?.payload?.status;
      if (status === 500 || status === 503) {
        setError500(true);
      }
      setBatches(data);
      setLoading(false);
    } catch (err) {
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
        overflow: "auto",
        flex: 1,
      }}
    >
      <Helmet>
        <title>{meta.batches.title}</title>
        <meta name="description" content={meta.batches.description} />
        <meta property="og:title" content={meta.batches.title} />
        <meta property="og:description" content={meta.batches.description} />
        <meta property="og:image" content={meta.batches.ogImage} />
        <meta
          property="og:url"
          content={`https://student.sprktechnologies.in${meta.batches.url}`}
        />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <BoxCard
          title="Ongoing Batches"
          number={
            batches?.filter((batch) => batch?.batch_status === "ONGOING")
              ?.length
          }
          image={
            <RotateLeftOutlinedIcon sx={{ color: "white", fontSize: "40px" }} />
          }
          bgColor="var(--secondary-color)"
        />
        <BoxCard
          title="Upcoming Batches"
          number={
            batches?.filter((batch) => batch?.batch_status === "UPCOMING")
              ?.length
          }
          image={
            <ArrowCircleUpOutlinedIcon
              sx={{ color: "white", fontSize: "40px" }}
            />
          }
          bgColor="#8B06B7"
        />
        <BoxCard
          title="Onhold Batches"
          number={
            batches?.filter((batch) => batch?.batch_status === "ONHOLD")?.length
          }
          image={
            <PauseCircleOutlineRoundedIcon
              sx={{ color: "white", fontSize: "40px" }}
            />
          }
          bgColor="#EFC400"
        />

        <BoxCard
          title="Completed Batches"
          number={
            batches?.filter((batch) => batch?.batch_status === "COMPLETED")
              ?.length
          }
          image={
            <CheckCircleOutlineOutlinedIcon
              sx={{ color: "white", fontSize: "40px" }}
            />
          }
          bgColor="#1F7C20"
        />

        <BoxCard
          title="Cancelled Batches"
          number={
            batches?.filter((batch) => batch?.batch_status === "CANCELLED")
              ?.length
          }
          image={<HighlightOffIcon sx={{ color: "white", fontSize: "40px" }} />}
          bgColor="rgb(163, 0, 0)"
        />

        <BoxCard
          title="Total"
          number={batches?.length}
          image={<BookIcon sx={{ color: "white", fontSize: "40px" }} />}
          bgColor="#EB7300"
        />
      </Box>

      <Typography
        sx={{
          textAlign: "center",
          px: 3,
          fontStyle: "italic",
          color: "#4D535A",
        }}
      >
        "Progress is built one session at a time—keep showing up!🚀"
      </Typography>

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
            backgroundColor: "var(--secondary-color)",
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
            My Batches
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {batches?.length > 0 ? (
            batches?.map((item) => (
              <BatchCardHorizontal key={item?.batch_uid} item={item} />
            ))
          ) : (
            <NoDataPage
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737177335/%D0%A1omplete_purchases_r80r2b.svg"
              errorHeading="No batch has been assigned yet!"
              errorDescription="Your batches will appear here once they are assigned to you."
            />
          )}
        </Box>
      </Box>
      {/* </Box> */}
    </Box>
  );
}

export default Batches;
