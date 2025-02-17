export function convertToLocalTime(utcString) {
  if (!utcString) return "Invalid Time"; // Handle null or undefined cases

  const date = new Date(utcString);
  if (isNaN(date.getTime())) return "Invalid Time"; // Handle parsing errors

  return date
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" am", " AM")
    .replace(" pm", " PM"); // Ensure AM/PM is uppercase
}

export function getRemainingTime(targetTimeUTC) {
  const now = new Date(); // Current date and time
  const targetTime = new Date(targetTimeUTC); // Target date and time

  const diffInMs = targetTime - now; // Difference in milliseconds
  if (diffInMs <= 0) return "Time is up";

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} secs to go`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} mins to go`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hrs to go`;
  } else {
    return `${diffInDays} days to go`;
  }
}

// Example usage:
const targetTimeUTC = "2026-04-16T05:30:00Z";
console.log(getRemainingTime(targetTimeUTC));

export function getWeekdayFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[date.getUTCDay()];
}

export const formatDateTimeRange = (start, end, locale = "en-US") => {
  const dateOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const formattedStartDate = new Date(start).toLocaleDateString(
    "en-GB",
    dateOptions
  );
  const formattedStartTime = new Date(start).toLocaleTimeString(
    locale,
    timeOptions
  );
  const formattedEndTime = new Date(end).toLocaleTimeString(
    locale,
    timeOptions
  );

  return `${formattedStartDate} | ${formattedStartTime} - ${formattedEndTime}`;
};

export function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${formattedDate.replace(/ /g, " ")} | ${hours}:${minutes} ${ampm}`;
}
