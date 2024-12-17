import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin, setLogout } from "../components/Login/store/authSlice";

export const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    window.localStorage.clear();
    localStorage.clear();
    localStorage.removeItem("persist:auth");

    dispatch(setLogout());
    dispatch(
      setLogin({
        user: null,
        token: null,
        userId: null,
      })
    );
  };

  return logout;
};
