import React, { forwardRef } from "react";
import { Box, MenuItem, Typography, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
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

const ProfileMenu = forwardRef(
  ({ handleMenuClose, isMenuOpen = null }, ref) => {
    const navigate = useNavigate();
    const logout = LogOut();
    const userProfilePic = null;
    // const userProfilePic = useSelector((state) => state.profile.userProfilePic);
    const userDetails = useSelector((state) => state.authSlice.userDetails);

    /**
     * @memberof ProfileMenu
     * Logs out the current user, clears local storage and redirects to the login page
     * @function
     * @async
     * @returns {undefined}
     */

    const handleIdClick = () => {
      navigator.clipboard.writeText(userDetails?.student_id);
      toast.success("Copied to clipboard");
    };

    return (
      <Menu
        aria-hidden={isMenuOpen ? "false" : "true"} // Apply aria-hidden based on focus state
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
        // Ensure autoFocusItem is not being passed or is handled as a boolean
        MenuListProps={{
          autoFocusItem: false, // If necessary, explicitly set autoFocusItem to false
        }}
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
          <Box sx={{ cursor: "pointer" }} onClick={handleIdClick}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#085084",
                fontWeight: "600",
                cursor: "pointer",
                width: "120px",
                wordBreak: "break-all",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {/* Display user details (employee id) */}
              {userDetails?.name}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {userDetails?.student_id}
            </Typography>
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
);

export default ProfileMenu;
