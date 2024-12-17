import React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../../Utils/LogOut";

/**
 * @memberof Sidebar
 * @class ProfileMenu
 * Component to render a profile menu
 * @param {{ handleMenuClose: function, isMenuOpen: boolean }} props
 * @returns {JSX.Element} The profile menu component
 */

function ProfileMenu({ handleMenuClose, isMenuOpen }) {
  const navigate = useNavigate();
  const logout = LogOut();
const userProfilePic = null;
  // const userProfilePic = useSelector((state) => state.profile.userProfilePic);
  const userDetails = useSelector((state) => state.authSlice.userDetails);

  /**
   * @memberof ProfileMenu
   * Copies the employee id to the clipboard
   * @function
   */
  const handleEmpIdClick = () => {
    navigator.clipboard.writeText(userDetails?.emp_id);
    toast.success("Copied to clipboard");
  };

  /**
   * @memberof ProfileMenu
   * Logs out the current user, clears local storage and redirects to the login page
   * @function
   * @async
   * @returns {undefined}
   */

  return (
    <Menu
      sx={{ mt: isMenuOpen ? "49px" : "0px" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem sx={{ display: "flex", gap: "10px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Display user profile picture if available */}
          {userProfilePic ? (
            <img
              alt="userProfile"
              src={userProfilePic}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              loading="lazy"
            />
          ) : (
            // Display a default avatar if no user profile picture
            <Avatar>
              <AccountCircleIcon
                sx={{
                  width: "32px",
                  height: "32px",
                  aspectRatio: 1,
                  textAlign: "center",
                  padding: "0px",
                }}
              />
            </Avatar>
          )}
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#085084",
              width: "180px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={handleEmpIdClick}
          >
            {/* Display user details (employee id) */}
            {userDetails?.emp_id}
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>{userDetails?.name}</Typography>
        </Box>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/Profile");
        }}
        sx={{ gap: "5%", mt: 1 }}
      >
        <PersonOutlineIcon fontSize="medium" />
        My Profile
      </MenuItem>
      <MenuItem onClick={logout} sx={{ gap: "5%", my: 1 }}>
        <LogoutIcon /> Logout
      </MenuItem>
    </Menu>
  );
}

export default ProfileMenu;
