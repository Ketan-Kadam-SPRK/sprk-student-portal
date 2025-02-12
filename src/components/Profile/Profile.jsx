import { Box, Button, Dialog, Typography, Avatar } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useSelector } from "react-redux";
import ChangePassword from "./Modal/ChangePassword";
import LogoutAll from "./Modal/LogoutAll";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Profile() {
  const userDetails = useSelector((state) => state.authSlice.userDetails) || {};
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const handleToogleChangePassword = () => {
    setOpenChangePassword(!openChangePassword);
  };

  const [openLogout, setOpenLogout] = useState(false);
  const handleLogoutModal = () => {
    setOpenLogout(!openLogout);
  };

  const renderBox = ({ Icon, title, value }) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#D8D6FF",
            borderRadius: "5px",
            p: 1,
          }}
        >
          <Icon sx={{ color: "#3A33E6", fontSize: "30px" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontWeight={"bold"}>{title}</Typography>
          <Typography
            sx={{
              color: "#2F2F2FDE",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // minHeight: "100vh",
        overflow: "auto",
        flex: 1,
        p: {
          xs: 3,
          sm: 4,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            gap: 5,
            p: 3,
            justifyContent: { xs: "center", sm: "center", md: "flex-start" },
            backgroundColor: "#6560F0",
            flexWrap: "wrap",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <Box>
            {/* <img
              src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
              alt=""
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            /> */}
            <Avatar
              sx={{
                width: "200px",
                height: "auto",
                p: 0,
              }}
            >
              <AccountCircleIcon
                sx={{
                  width: "200px",
                  height: "auto",
                  // aspectRatio: 1,
                  textAlign: "center",
                  padding: "0px",
                }}
              />
            </Avatar>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography variant="h3" color="white">
              Hello,
            </Typography>
            <Typography variant="h3" color="white">
              {userDetails?.name || ""}
            </Typography>

            <Typography
              variant="h5"
              color="white"
              sx={{ mt: 4, textAlign: "center" }}
            >
              "Education is the most powerful weapon which you can use to change
              the world."
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: 3,
          }}
        >
          {renderBox({
            Icon: PersonIcon,
            title: "Student ID",
            value: `${userDetails?.student_id || ""}`,
          })}
          {renderBox({
            Icon: CallIcon,
            title: "Contact Number",
            value: `${userDetails?.phone || ""}`,
          })}
          {renderBox({
            Icon: EmailIcon,
            title: "Email",
            value: `${userDetails?.email || ""}`,
          })}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleToogleChangePassword}
            >
              Change Password
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogoutModal}
            >
              Logout All
            </Button>
          </Box>
          <Dialog open={openChangePassword} maxWidth="sm">
            <ChangePassword handleClose={handleToogleChangePassword} />
          </Dialog>

          <Dialog open={openLogout} maxWidth="sm">
            <LogoutAll handleClose={handleLogoutModal} />
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
