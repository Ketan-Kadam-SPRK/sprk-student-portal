import React from "react";
// import Error_404 from "../ErrorPages/Error_404";
import Error_500 from "../Error Pages/Error_500";
import CustomBackDrop from "./CustomBackDrop";
import Error_404 from "../Error Pages/Error_404";

/**
 * @function
 * @description Handles displaying the proper error page for different
 *              scenarios.
 * @param {boolean} error500 - If true, displays the 500 error page.
 * @param {boolean} hasPermission - If true, displays the 404 error page.
 * @param {boolean} loadData - If true, displays a loading circle.
 * @returns {ReactElement} A React component to be rendered.
 */
function ErrorHandling({
  error500 = false,
  loadData = false,
  notFound = false,
}) {
  return (
    <div>
      {!loadData && error500 && <Error_500 />}
      {loadData && <CustomBackDrop loadData={loadData} />}
      {!loadData && !error500 && notFound && <Error_404 />}
    </div>
  );
}

export default ErrorHandling;
