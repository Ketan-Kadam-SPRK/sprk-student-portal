import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const formatSegment = (segment) => {
  return segment
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const useCheckPermission = () => {
  const allowedTabs = useSelector(
    (state) => state.authSlice.entitlements || []
  );

  const checkPermission = (tabName) => {
    const normalizedTab = tabName.toUpperCase();
    const hasAccess = allowedTabs.includes(normalizedTab);

    if (!hasAccess) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: `You do not have access to view ${formatSegment(tabName)} Tab.`,
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  };

  return { checkPermission };
};
