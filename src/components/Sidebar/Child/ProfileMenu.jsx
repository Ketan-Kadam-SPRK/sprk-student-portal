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
import FeedbackDialog from "./FeedbackDialog";
import { Image } from "cloudinary-react"; // Ensure this is installed or replace with <img src="..." />

/**
 * @memberof Sidebar
 * @class ProfileMenu
 * Component to render a profile menu
 * @param {{ handleMenuClose: function, isMenuOpen: boolean }} props
 * @returns {JSX.Element} The profile menu component
 */

const ProfileMenu = forwardRef(({ handleMenuClose, isMenuOpen = false }, ref) => {
  const navigate = useNavigate();
  const logout = LogOut();
  const userProfilePic =
    useSelector((state) => state.authSlice.userProfilePic) || "";
  const userDetails = useSelector((state) => state.authSlice.userDetails);

  const handleIdClick = () => {
    navigator.clipboard.writeText(userDetails?.student_id);
    toast.success("Copied to clipboard");
  };

  const [isFeedbackOpen, setFeedbackOpen] = React.useState(false);

  const handleFeedbackOpen = () => {
    setFeedbackOpen(true);
    handleMenuClose();
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  return (
    <>
      <Menu
        aria-hidden={isMenuOpen ? "false" : "true"}
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
        MenuListProps={{
          autoFocusItem: false,
        }}
      >
        <MenuItem sx={{ display: "flex", gap: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                color: "var(--sidebar-bg-color)",
                fontWeight: "600",
                cursor: "pointer",
                width: "120px",
                wordBreak: "break-all",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              title={userDetails?.name}
            >
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

        <MenuItem onClick={handleFeedbackOpen}>
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1753951462/newsprk/Vector_3_wfostn.svg"
            cloudName="dxlzzgbfw"
            style={{ width: 24, height: 24, marginRight: 10, }}
          />
          FeedBack
        </MenuItem>

        <MenuItem onClick={logout} sx={{ gap: "5%", my: 1 }}>
          <LogoutIcon /> Logout
        </MenuItem>
      </Menu>

      <FeedbackDialog
        open={isFeedbackOpen}
        handleClose={handleFeedbackClose}
      />
    </>
  );
});

export default ProfileMenu;
