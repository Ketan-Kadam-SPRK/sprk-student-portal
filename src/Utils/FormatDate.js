const FormatDate = (timestamp, daysToSubtract = 0) => {
    if (!timestamp) return "";
  
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
  
    date.setDate(date.getDate() - daysToSubtract);
  
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
  
    if (isNaN(day)) {
      return "";
    }
  
    return `${day}/${month}/${year}`;
  };
  
  export default FormatDate;
  