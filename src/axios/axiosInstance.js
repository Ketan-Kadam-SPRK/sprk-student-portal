// axiosInstance.js
import axios from "axios";
import swal from "sweetalert";
import { store } from "../store";
import { setLogout } from "../state/authState"; // Your logout action

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
});

const logout = async (errorMsg) => {
  try {
    // Dispatch logout action directly from the store
    // await store.dispatch(setLogout());
    // Clear local storage
    await localStorage.clear();

    // Manually remove persisted auth key (if not removed by purge)
    await localStorage.removeItem("persist:auth");

    // Optionally: Clear cookies if you are using them
    document.cookie = "";

    // Clear session storage if applicable
    sessionStorage.clear();

    // Show Swal and handle navigation after it's confirmed
    await swal({
      title: "Warning!",
      text:
        errorMsg ||
        "Your account may have been updated. To ensure you have access to the updated information, please log in again.",
      icon: "warning",
      confirmButtonText: "OK",
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((value) => {
      if (value) {
        store.dispatch(setLogout());
      }
    });

    // After alert is confirmed, reload the page and navigate to login
    // window.location.replace("/login");
  } catch (error) {
    console.error("Error during logout process: ", error);
  }
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const errorMsg = error.response.data.error;

      if (error.response.status === 403 || error.response.status === 401) {
        try {
          await logout(errorMsg);
        } catch (logoutError) {
          console.error("Error during logout: ", logoutError);
        }
      }
    } else {
      console.error("Network Error: Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
