import { Box, Button, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

function Profile() {
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
        minHeight: "100vh",
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
            <img
              src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
              alt=""
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography variant="h3" color="white">
              Hello,
            </Typography>
            <Typography variant="h3" color="white">
              User Name
            </Typography>

            <Typography
              variant="h5"
              color="white"
              sx={{ mt: 2, textAlign: "center" }}
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
            value: "STD457896255",
          })}
          {renderBox({
            Icon: CallIcon,
            title: "Contact Number",
            value: "1234567890",
          })}
          {renderBox({
            Icon: EmailIcon,
            title: "Email",
            value: "9s2m8@example.com",
          })}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Button variant="contained" color="primary">
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
