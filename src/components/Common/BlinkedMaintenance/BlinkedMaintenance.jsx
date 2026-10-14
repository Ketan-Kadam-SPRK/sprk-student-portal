import React from "react";
import Tooltip from "@mui/material/Tooltip";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import styles from "./BlinkedMaintenance.module.css"; // CSS module for animation

const BlinkedMaintenance = ({
  status,
  onClick,
  title = "Click for maintenance details",
}) => {
  const isOngoing = status === "ONGOING";

  const message = isOngoing
    ? "Today maintenance is ongoing"
    : "Maintenance is scheduled for today";

  return (
    <Tooltip title={title} placement="bottom" arrow>
      <div
        className={`${styles.maintenanceStatus} ${
          isOngoing ? styles.ongoing : styles.upcoming
        }`}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {/* Maintenance Icon */}
        <BuildOutlinedIcon className={styles.maintenanceIcon} />

        {/* Desktop scrolling message */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeContent}>
            <span>
              {message} • <strong>Click for details →</strong>
            </span>

            <span>
              {message} • <strong>Click for details →</strong>
            </span>

            <span>
              {message} • <strong>Click for details →</strong>
            </span>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

export default BlinkedMaintenance;