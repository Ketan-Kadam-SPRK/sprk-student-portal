import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoxCard from "../Dashboard/Child/BoxCard";
import BatchCardHorizontal from "./child/BatchCardHorizontal";
import { useDispatch } from "react-redux";
import { getBatches } from "./action/batches.actions";
import ErrorHandling from "../Common/ErrorHandling";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";

function Batches() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudentBatches();
  }, []);

  const getStudentBatches = async () => {
    console.log("getStudentBatches");
    setLoading(true);
    try {
      const res = await dispatch(getBatches({ headers }));
      const data = res?.payload?.data?.data || [];
      setBatches(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) {
    return <ErrorHandling error500={false} loadData={loading} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          //   justifyContent: "space-around",
          gap: 2,
        }}
      >
        <BoxCard
          title="Ongoing Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_fipttr.svg"
          bgColor="#6560F0"
        />

        <BoxCard
          title="Upcoming Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
          bgColor="#8B06B7"
        />
        <BoxCard
          title="Onhold Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_2_himwuf.svg"
          bgColor="#EFC400"
        />

        <BoxCard
          title="Completed Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_fipttr.svg"
          bgColor="#1F7C20"
        />

        <BoxCard
          title="Total"
          number="203"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
          bgColor="#EB7300"
        />
      </Box>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: "1px solid grey",
          borderRadius: "10px",
          flex: 1,
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          My Batches
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            flex: 1,
            overflow: "auto",
          }}
        >
          {batches?.length > 0 ? (
            batches?.map((item) => (
              <BatchCardHorizontal key={item.batch_uid} item={item} />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "grey" }}>
                No Batches Available
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Batches;
