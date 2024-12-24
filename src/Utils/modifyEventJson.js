export function modifyEventJson(jsonData) {
  // Convert jsonData to an array if it's not already an array
  const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

  const modifiedData = dataArray.flatMap((entry) => {
    const {
      bth_id,
      faculty_name,
      course_name,
      sessions,
      bth_status,
      course_color,
      est_start,
      est_end,
      students,
      week_days,
      faculty_id,
      course_img,
    } = entry || {};
    const modifiedEvents = sessions?.map((event) => {
      const { session_id, start, end, conflict, taken_by } = event || {};
      return {
        bth_id,
        faculty_name,
        course_name,
        start: start ? new Date(start) : null,
        end: end ? new Date(end) : null,
        course_color,
        bth_status,
        est_start: est_start ? new Date(est_start) : null,
        est_end: est_end ? new Date(est_end) : null,
        session_id,
        conflict,
        students,
        week_days: week_days ? week_days : [],
        faculty_id,
        taken_by,
        course_img,
      };
    });
    return modifiedEvents || [];
  });

  const destructureData = modifiedData.map((event) => {
    const {
      bth_id,
      faculty_name,
      course_name,
      course_color,
      bth_status,
      est_start,
      est_end,
      start,
      end,
      session_id,
      conflict,
      students,
      week_days,
      faculty_id,
      taken_by,
      course_img,
    } = event;
    return {
      bth_id,
      faculty_name,
      course_name,
      course_color,
      bth_status,
      est_start,
      est_end,
      start,
      end,
      session_id,
      conflict,
      students,
      week_days,
      faculty_id,
      taken_by,
      course_img,
    };
  });

  return destructureData;
}
