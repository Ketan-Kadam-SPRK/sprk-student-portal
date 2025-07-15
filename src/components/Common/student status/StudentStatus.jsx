import StatusStyledComponent from "../StatusStyledComponent/StatusStyledComponent";

function StudentStatus({ status }) {
  const getColorAndBackground = (status) => {
    switch (status) {
      case "ACTIVE":
        return { color: "#1C4963", backgroundColor: "#DDEBFF" };
      case "PASSED_OUT":
        return { color: "#239A60", backgroundColor: "#B0F7CC" };
      case "ACADEMIC_DROPOUT":
        return { color: "#381465", backgroundColor: "#E0C8FF" };
      case "FINANCIAL_DROPOUT":
        return { color: "#783B09", backgroundColor: "#FFFFB8" };
      case "DISCONTINUED":
        return { color: "#8B0000", backgroundColor: "#FFE4B5CC" };
      default:
        return { color: "", backgroundColor: "" };
    }
  };

  const { color, backgroundColor } = getColorAndBackground(status);
  return (
    <StatusStyledComponent
      color={color}
      backgroundColor={backgroundColor}
      value={status}
    />
  );
}

export default StudentStatus;
