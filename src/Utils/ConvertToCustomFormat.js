export const convertToCustomFormat = (timestamp) => {
  if (!timestamp) return "";

  // ✅ Truncate microseconds to milliseconds: .110479Z → .110Z
  // const cleaned = timestamp.replace(/\.(\d{3})\d*Z$/, ".$1Z");

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid Date";

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short", timeZone });
  const year = date.getFullYear();

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  // console.log(`${day}/${month}/${year} ${time}`);
  return `${day}/${month}/${year} ${time}`;
};
