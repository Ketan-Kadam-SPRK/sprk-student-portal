import React from "react";
import styles from "./box.module.css";
import { Box, Typography } from "@mui/material";
import { Image } from "cloudinary-react";

function BoxCard({
  title = "Completed",
  number = 5,
  image = "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg",
  bgColor = "#FFFFFF",
}) {
  return (
    <Box className={styles.boxContainer} sx={{ backgroundColor: bgColor }}>
      <Typography className={styles.boxTitle}>{title}</Typography>

      <Box className={styles.boxContent}>
        <Typography className={styles.boxNumber}>{number}</Typography>
        <Image
          className={styles.imageContainer}
          cloudName="dxlzzgbfw"
          publicId={image}
          width="30"
          height="30"
        />
      </Box>
    </Box>
  );
}

export default BoxCard;
