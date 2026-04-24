const tabNames = [
  "DASHBOARD",
  "COURSE_GROUPS",
  "BATCHES",
  "EXAMS",
  "LEAVES",
  "EVENTS",
  "BOOKINGS",
  "RECEIPTS",
  "CERTIFICATES",
  "JOB_OPPORTUNITIES",
  "EXPLORE_COURSES",
];

export default function rearrengePermission(permissions = []) {
  return permissions
    .filter((perm) => tabNames.includes(perm))
    .sort((a, b) => tabNames.indexOf(a) - tabNames.indexOf(b));
}
