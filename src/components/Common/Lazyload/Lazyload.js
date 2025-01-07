import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CustomBackDrop from "../CustomBackDrop";

const MyErrorFallback = () => {
  // Optionally render nothing or a generic loading message
  return null; // Return null to hide the fallback UI
};

const Lazyload = (Component) => (props) => {
  const handleChunkLoadError = (error) => {
    // Log the chunk load error but don't display anything
    if (error.message.includes("Loading chunk")) {
      console.error("Chunk load error:", error);
      return; // Do not trigger any fallback UI for chunk load errors
    }

    // If it's not a chunk load error, we can let the ErrorBoundary handle it normally
    throw error; // Re-throw other errors to be caught by ErrorBoundary
  };

  return (
    <ErrorBoundary
      FallbackComponent={MyErrorFallback}
      onError={handleChunkLoadError}
    >
      <Suspense fallback={<CustomBackDrop loadData={true} />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Lazyload;
