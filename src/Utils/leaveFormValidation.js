export const leaveFormValidation = (formData) => {
  const errors = {
    start: null,
    end: null,
    reason: null,
  };

  const today = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(today.getFullYear() - 5);

  const fiveYearsLater = new Date();
  fiveYearsLater.setFullYear(today.getFullYear() + 5);

  const startDate = new Date(formData?.start);
  const endDate = new Date(formData?.end);

  const sixMonthsLater = new Date(startDate);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

  // --- Start Date Validation ---
  if (!formData?.start || isNaN(startDate.getTime())) {
    errors.start = "Please enter a valid start date";
  } else if (startDate < fiveYearsAgo || startDate > fiveYearsLater) {
    errors.start = "Start date must be within the past 5 years or next 5 years";
  }

  // --- End Date Validation ---
  if (!formData?.end || isNaN(endDate.getTime())) {
    errors.end = "Please enter a valid end date";
  } else if (endDate < fiveYearsAgo || endDate > fiveYearsLater) {
    errors.end = "End date must be within the past 5 years or next 5 years";
  }

  // --- Start/End Comparison ---
  if (formData?.start && formData?.end) {
    if (startDate > endDate) {
      errors.start = "Start date cannot be after end date";
      errors.end = "End date cannot be before start date";
    } else if (endDate > sixMonthsLater) {
      errors.start =
        "The difference between start and end date cannot be greater than six months";
      errors.end =
        "The difference between start and end date cannot be greater than six months";
    }
  }

  // --- Reason Validation ---
  const reason = formData?.reason?.trim();
  if (!reason) {
    errors.reason = "Reason is required";
  } else if (reason.length < 10) {
    errors.reason = "Reason must be at least 10 characters long";
  } else if (reason.length > 500) {
    errors.reason = "Reason should be less than 500 characters";
  }

  return errors;
};
