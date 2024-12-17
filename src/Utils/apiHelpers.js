import { showAlert } from "./SweatAlertModal";

export const handleResponse = (data) => {
  if (data?.message !== null) {
    showAlert("Success", data?.message, "success");
  } else if (data?.error !== null) {
    showAlert("Failed", data?.error, "error", "OK", true);
  }

  return data;
};

export const handleError = (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
    return;
  }
  const errorMessage =
    error.response?.data?.error || "An error occurred. Please try again later.";
  showAlert("Error", errorMessage, "error", "OK", true);
  throw error;
};
