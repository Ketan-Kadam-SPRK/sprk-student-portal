import React from "react";
import Lottie from "lottie-light-react";
import SprkLoader from "../../Lottie/SprkLoading.json";

/**
 * A CustomBackDrop component that displays a lottie loading animation
 * with a transparent background, while the data is being loaded.
 * @param {boolean} loadData - Whether to display the animation or not
 * @returns - A JSX Element containing the animation
 */
function CustomBackDrop({ loadData }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Lottie
        animationData={SprkLoader}
        loop={loadData}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
}

export default CustomBackDrop;
