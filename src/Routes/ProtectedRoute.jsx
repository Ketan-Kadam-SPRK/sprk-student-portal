import { Navigate, Outlet, useLocation } from "react-router-dom";

const toTabName = (value = "") => {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("_");
};

const ProtectedRoute = ({ allowedTabs }) => {
  const location = useLocation();

  // first part of URL → matches your tab names
  const currentTab = location.pathname.split("/")[1];

  // allow root redirect
  if (!currentTab) return <Outlet />;

  // check permission
  if (!allowedTabs.includes(currentTab.toUpperCase())) {
    return <Navigate to={`/${toTabName(allowedTabs[0])}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
