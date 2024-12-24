import { formatForDisplay } from "../../../Utils/formateForDisplay";

function StatusStyledComponent({ color, backgroundColor, value }) {
  return (
    <div
      style={{
        color: color,
        backgroundColor: backgroundColor,
        textAlign: "center",
        borderRadius: "20px",
        height: "30px",
        padding: "15px",
        minWidth: "150px",
        fontWeight: "bold",
        display: "flex",
        fontSize: "14px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {formatForDisplay(value)}
    </div>
  );
}

export default StatusStyledComponent;
