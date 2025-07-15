import React from "react";
import Tooltip from "@mui/material/Tooltip";
import styles from "./BlinkedStatus.module.css"; // CSS module for animation

const BlinkedStatus = ({ status }) => {
  return (
    <div className="flex items-center gap-2">
      {status === "DISCONTINUED" && (
        <Tooltip
          title="Your have been discontinued. For activation, contact administration."
          placement="right"
          arrow
        >
          <div className={styles.blinkingLight}></div>
        </Tooltip>
      )}
    </div>
  );
};

export default BlinkedStatus;
