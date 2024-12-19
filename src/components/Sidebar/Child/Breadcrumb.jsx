import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Breadcrumb component to display the current route path
 * @returns {ReactElement} A styled <div> with links to each path segment
 */
const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumbLinkStyle = {
    color: "white", // White text color
    fontSize:  "var(--font-size-small)"    ,
    fontWeight: "bold",
    textDecoration: "none",
    marginRight: "5px", // Adjust spacing between breadcrumbs
  };

  // Function to transform a path segment (e.g., employee_manangement to Employee Management)
  const formatSegment = (segment) => {
    return segment
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(139deg, var(--table-header-bg-color) 11.37%, var(--sidebar-bg-color) 64.56%)",
        padding: "7px 5px",
        color: "white",
        position: "fixed",
        width: "100%",
        zIndex: 999,
      }}
    >
      {pathSegments.map((segment, index) => (
        <span key={index}>
          <Link
            to={"/" + pathSegments.slice(0, index + 1).join("/")}
            style={{ ...breadcrumbLinkStyle }}
          >
            {formatSegment(segment)}
          </Link>
          {index < pathSegments.length - 1 && " / "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
