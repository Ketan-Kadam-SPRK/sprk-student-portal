import { formatForDisplay } from "../../../Utils/formateForDisplay";

function StatusStyledComponent({ color, backgroundColor, value }) {
  return (
    <div
      style={{
        color: color,
        backgroundColor: backgroundColor,
        textAlign: "center",
        borderRadius: "20px",
        height: "35px",
        padding: "15px",
        minWidth: "150px",
        fontWeight: "bold",
        display: "flex",
        fontSize: "14px",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "200px",
      }}
    >
      <p
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
          margin: 0,
        }}
      >
        {formatForDisplay(value)}
      </p>
    </div>
  );
}

export default StatusStyledComponent;
