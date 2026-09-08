import React, { useEffect, useState } from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";

function StatusComponent({ value = "NA" }) {
  const [data, setData] = useState({
    color: "white",
    backgroundColor: "#FF0000",
    value: "NA",
  });

  useEffect(() => {
    let color = "white";
    let backgroundColor = "#FF0000";
    if (value === "ONGOING") {
      color = "#0038A8";
      backgroundColor = "#C1D6FF";
    } else if (value === "COMPLETED") {
      color = "#1F5200";
      backgroundColor = "#CBFFAC";
    } else if (value === "UPCOMING") {
      color = "#52007A";
      backgroundColor = "#E4AEFF";
    } else if (value === "ONHOLD") {
      color = "#755200";
      backgroundColor = "#FFF3A4";
    } else if (value === "CANCELLED") {
      color = "rgb(184, 57, 57)";
      backgroundColor = "rgb(255, 188, 176)";
    }

    setData({
      color: color,
      backgroundColor: backgroundColor,
      value: value,
    });
  }, []);

  return (
    <StatusStyledComponent
      color={data.color}
      backgroundColor={data.backgroundColor}
      value={data.value}
    />
  );
}

export default StatusComponent;
