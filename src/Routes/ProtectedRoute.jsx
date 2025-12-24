import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedTabs }) => {
  const location = useLocation();

  // first part of URL → matches your tab names
  const currentTab = location.pathname.split("/")[1];

  // allow root redirect
  if (!currentTab) return <Outlet />;

  // check permission
  if (!allowedTabs.includes(currentTab)) {
    return <Navigate to={`/${allowedTabs[0]}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
