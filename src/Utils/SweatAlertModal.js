import swal from "sweetalert";

export const showAlert = (
  title,
  text,
  icon,
  button = "OK",
  dangerMode = false
) => {
  swal({
    title,
    text,
    icon,
    button,
    dangerMode,
  });
};
