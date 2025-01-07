import { useSelector } from "react-redux";

/**
 * useAuthHeaders
 *
 * A custom hook to get the HTTP headers object containing the Bearer token
 * obtained from the Redux store.
 *
 * Returns an object with the following properties:
 * - "ngrok-skip-browser-warning": true
 * - "Content-Type": "application/json"
 * - Authorization: "Bearer <token>"
 */
export const useAuthHeaders = () => {
  const rtoken = useSelector((state) => state.authSlice.token);
  return {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json",
    Authorization: `Bearer ${rtoken}`,
  };
};
