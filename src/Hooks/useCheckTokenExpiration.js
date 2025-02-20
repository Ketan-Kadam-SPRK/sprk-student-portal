import { useEffect, useCallback, useRef, useState } from "react";
// import * as jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../components/Login/store/authSlice";
import { freshToken } from "../components/Login/store/login.actions";
import { useAuthHeaders } from "./useAuthHeaders";
import { jwtDecode } from "jwt-decode";
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
  const headers = useAuthHeaders();
  const [isLoading, setLoading] = useState(false); // Loading state
  const [isSwalOpen, setSwalOpen] = useState(false); // Swal open state

  const logout = useCallback(() => {
    localStorage.clear(); // Avoid this if using redux-persist
    localStorage.removeItem("token"); // Remove only the necessary keys
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

  const refreshTokenInProgress = useRef(false);

  const refreshToken = async () => {
    if (refreshTokenInProgress.current) return { success: false };

    refreshTokenInProgress.current = true;
    setLoading(true);

    try {
      const data = await dispatch(freshToken({ headers })).unwrap();
      const newAccessToken = data?.token;

      if (!newAccessToken) {
        logout();
        setSwalOpen(false);
        return { success: false };
      }

      // const decodedToken = jwtDecode(newAccessToken);
      localStorage.setItem("token", newAccessToken);
      await dispatch(setLogin({ token: newAccessToken }));
      alertCanceledRef.current = false;
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Error in refreshToken:", error);
      swal.close();
      logout();
      return { success: false, error };
    } finally {
      refreshTokenInProgress.current = false;
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
    const timeUntilExpiration = decodedToken.exp - currentTime;
    if (timeUntilExpiration <= 0) {
      logout();

      swal({
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        icon: "warning",
      });
      return;
    }

    const alertThreshold = 600; // 10 minutes

    if (timeUntilExpiration < alertThreshold && !alertCanceledRef.current) {
      let timeRemaining = timeUntilExpiration;

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return minutes > 0
          ? `${minutes} minutes and ${remainingSeconds} seconds`
          : `${remainingSeconds} seconds`;
      };

      let swalTimerInterval;

      Swal.fire({
        icon: "question",
        title: `Session Expiration Warning`,
        html: `Your session is about to expire in ${formatTime(
          timeRemaining
        )}.`,
        showCancelButton: true,
        confirmButtonColor: "#239A60",
        confirmButtonText: "Restore",
        // ? '<i class="fa fa-spinner fa-spin"></i> Loading...'
        // : "Restore",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => false,
        preConfirm: () => {
          clearInterval(swalTimerInterval); // Clear interval before starting the refresh
          // setLoading(true);
          return refreshToken()
            .then((result) => {
              if (result.success) {
                alertCanceledRef.current = true;
                setTimeout(() => {
                  alertCanceledRef.current = false;
                }, 60000);
              } else {
                alertCanceledRef.current = false;
                throw result.error;
              }
            })
            .finally(() => setLoading(false));
        },
        didOpen: () => {
          const swalElement = Swal.getHtmlContainer();
          swalTimerInterval = setInterval(() => {
            if (timeUntilExpiration <= 0) {
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
          clearInterval(swalTimerInterval);
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
            setLoading(false);
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
  }, [rtoken, logout]);

  useEffect(() => {
    const checkTokenWithInterval = () => {
      if (rtoken && !isSwalOpen) {
        return setInterval(checkTokenExpiration, 10000);
      }
      return null;
    };

    const handleWindowFocus = () => {
      checkTokenExpiration(); // Recheck expiration when window gains focus
    };

    const interval = checkTokenWithInterval();
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [rtoken, isSwalOpen, checkTokenExpiration]);

  return {
    checkTokenExpiration,
  };
};

export default useCheckTokenExpiration;
