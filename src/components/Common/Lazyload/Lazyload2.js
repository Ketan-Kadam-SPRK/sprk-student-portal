import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";

const Lazyload2 = (Component) => (props) =>
  (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );

export default Lazyload2;
