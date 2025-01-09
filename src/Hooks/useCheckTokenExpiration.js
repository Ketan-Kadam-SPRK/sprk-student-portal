import { useEffect, useCallback, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../state/authState";
import { freshToken } from "../component/Profile/store/profile.actions";
import { useAuthHeaders } from "./useAuthHeaders";

/**
 * @class useCheckTokenExpiration
 * Hook to check if the token has expired and refresh it if it is about to expire.
 *
 * @returns {{ checkTokenExpiration: () => void }}
 */
const useCheckTokenExpiration = () => {
  const dispatch = useDispatch();
  const rtoken = useSelector((state) => state.authSlice.token);
  const alertCanceledRef = useRef(false);
  const checkTokenExpirationRef = useRef();
  const headers = useAuthHeaders();
  const [isLoading, setLoading] = useState(false); // Loading state
  const [isSwalOpen, setSwalOpen] = useState(false); // Swal open state

  const logout = useCallback(() => {
    localStorage.clear();
    localStorage.removeItem("persist:auth");
    dispatch(setLogout());
  }, [dispatch]);

  /**
   * @memberof useCheckTokenExpiration
   * Refreshes the access token by calling the freshToken API.
   *
   * @returns {Promise<{success: boolean, error?: Error}>}
   *  A promise that resolves with an object containing a success boolean.
   *  If the refresh is successful, the success property is true and no error is returned.
   *  If the refresh fails, the success property is false and the error property is the error that occurred.
   */
  const refreshToken = async () => {
    setLoading(true); // Set loading state
    try {
      const data = await dispatch(freshToken({ headers })).unwrap(); // Use `.unwrap()` to handle the returned payload directly
      const newAccessToken = data?.token;

      const decodedToken = jwtDecode(newAccessToken);

      // Store the new token and update Redux state
      localStorage.setItem("token", newAccessToken);
      const userId = decodedToken.sub;

      dispatch(
        setLogin({
          token: newAccessToken,
          userId: userId,
        })
      );

      setLoading(false);

      // Successfully refreshed token
      if (!data?.token) {
        logout();
        setSwalOpen(false);

        return { success: false };
      }
      if (data?.token) {
        return { success: true };
      }
    } catch (error) {
      console.error("Error in refreshToken:", error);
      setLoading(false);
      swal.close();
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        logout();
      }
      // Return error status
      return { success: false, error };
    } finally {
      // Clear loading state regardless of success or failure
      setLoading(false);
    }
  };

  const checkTokenExpiration = useCallback(async () => {
    if (!rtoken) {
      Swal.close();
      return;
    }

    const decodedToken = jwtDecode(rtoken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      logout();
      // swal({
      //   title: "Session Expired",
      //   text: "Your session has expired. Please log in again.",
      //   icon: "warning",
      // });
    } else {
      const timeUntilExpiration = decodedToken.exp - currentTime;
      const alertThreshold = 600; // 10 minutes
      if (timeUntilExpiration <= 0) {
        logout();
        return;
      }

      if (timeUntilExpiration < alertThreshold && !alertCanceledRef.current) {
        let timeRemaining = timeUntilExpiration;

        const formatTime = (seconds) => {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          return minutes > 0
            ? `${minutes} minutes and ${remainingSeconds} seconds`
            : `${remainingSeconds} seconds`;
        };

        let swalTimerInterval; // Declare the interval variable in a broader scope

        Swal.fire({
          icon: "question",
          title: `Session Expiration Warning`,
          html: `Your session is about to expire in ${formatTime(
            timeRemaining
          )}.`,
          showCancelButton: true,
          confirmButtonColor: "#239A60",
          confirmButtonText: isLoading
            ? '<i class="fa fa-spinner fa-spin"></i> Loading...'
            : "OK",
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading(),
          preConfirm: () => {
            clearInterval(swalTimerInterval); // Clear interval before starting the refresh
            setLoading(true);
            return refreshToken()
              .then((result) => {
                if (result.success) {
                  alertCanceledRef.current = true;
                } else {
                  alertCanceledRef.current = false;
                  throw result.error;
                }
              })
              .finally(() => setLoading(false));
          },
          didOpen: () => {
            const swalElement = Swal.getHtmlContainer(); // Get Swal's HTML container
            swalTimerInterval = setInterval(() => {
              if (timeRemaining <= 0) {
                clearInterval(swalTimerInterval);
                Swal.close();
                logout();
              } else {
                timeRemaining -= 1;
                swalElement.textContent = `Your session is about to expire in ${formatTime(
                  timeRemaining
                )}.`;
              }
            }, 1000);
          },
          willClose: () => {
            clearInterval(swalTimerInterval); // Clear the interval when Swal closes
          },
        })
          .then((result) => {
            setSwalOpen(false);
            if (result.isConfirmed) {
              Swal.fire({
                title: "Success!",
                confirmButtonColor: "#239A60",
                text: "Your session has been restored.",
                icon: "success",
              });
            } else {
              alertCanceledRef.current = true;
              setTimeout(() => {
                alertCanceledRef.current = false;
              }, 60000);
            }
          })
          .catch((error) => {
            console.error("Error refreshing token:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to refresh token. Please log in again.",
              icon: "error",
            }).then(() => {
              logout();
            });
          });

        setSwalOpen(true);
      }
    }
  }, [rtoken, logout]);

  // Start interval when rtoken changes and isSwalOpen is false
  useEffect(() => {
    if (rtoken && !isSwalOpen) {
      const interval = setInterval(checkTokenExpiration, 10000);
      checkTokenExpirationRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [rtoken, isSwalOpen, checkTokenExpiration]);

  return {
    checkTokenExpiration,
  };
};

export default useCheckTokenExpiration;
