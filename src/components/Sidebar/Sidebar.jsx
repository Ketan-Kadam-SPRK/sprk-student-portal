import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Image } from "cloudinary-react";
import Styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector, useDispatch } from "react-redux";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Collapse } from "@mui/material";
import Breadcrumb from "./Child/Breadcrumb";
import { Avatar } from "@mui/material";
// import { setUserProfilePic } from "../Profile/store/profileSlice";
// import { getUserPic } from "../Profile/store/profile.actions";
import { useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { useAuthHeaders } from "../../hooks/useAuthHeaders";
import { tabMapping } from "./Child/ActiveTabsObject";
import {
  AppBar,
  Drawer,
  DrawerHeader,
  headingTextStyle,
} from "./Child/MuiDrawerStyle";
// import ListItemWIcon from "./Child/ListItemWIcon";
import SidebarItem from "./Child/SidebarItem";
// import NotificationMenu from "./Child/NotificationMenu";
import ProfileMenu from "./Child/ProfileMenu";
import RoutesConfig from "../../Routes/RoutesConfig";

/**
 * @class Sidebar
 * @description
 * Renders the sidebar component
 * @returns {JSX.Element} The rendered component
 *  **/
function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  // useConvertImgToBase64();

  const userDetails = useSelector((state) => state.authSlice.userDetails) || {};
  // const userProfilePic = useSelector((state) => state.profile.userProfilePic) || {};
  // const headers = useAuthHeaders() ||;
  const tabName = useSelector((state) => state.authSlice.tabName);
  const notificationsData = useSelector((state) => state.authSlice?.notifiData);
  const userProfilePic = null;
  // State to manage the main sidebar open/close state
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openNoti, setOpenNoti] = React.useState(null);
  const isNotiOpen = Boolean(openNoti);

  const isMenuOpen = Boolean(anchorEl);

  const location = useLocation();
  const locationPath = location.pathname;

  let activeTab = localStorage.setItem("activeTab", locationPath.split("/")[1]);

  for (const path in tabMapping) {
    if (locationPath.startsWith(path)) {
      activeTab = tabMapping[path];
      break;
    }
  }

  const setActiveTab = (tabName) => {
    localStorage.setItem("activeTab", tabName);
  };

  useEffect(() => {
    setActiveTab(locationPath?.split("/")[1]);
  }, []);

  useEffect(() => {
    setActiveTab(activeTab);
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotiMenuOpen = (event) => {
    setOpenNoti(event.currentTarget);
  };

  const handleNotiMenuClose = () => {
    setOpenNoti(null);
  };

  // Function to open the main sidebar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Function to close the main sidebar
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   getProfilePic();
  // }, [userDetails]);

  /**
   * @memberof Sidebar
   * Fetches the user's profile picture if it exists.
   * If the picture exists, it dispatches an action to store the picture in the state.
   * If the picture does not exist, it dispatches an action to set the picture as null.
   */
  // const getProfilePic = () => {
  //   if (userDetails?.profile === true) {
  //     dispatch(getUserPic({ headers })).then((res) => {
  //       dispatch(setUserProfilePic({ userProfilePic: res?.payload }));
  //     });
  //   } else {
  //     dispatch(setUserProfilePic({ userProfilePic: null }));
  //   }
  // };

  /**
   * @memberof Sidebar
   * Toggles the sidebar open or closed by negating the current open state.
   * @returns {void}
   */
  const handleToggleSidebar = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box
      className="sidebar-div"
      sx={{
        display: "grid",
        height: "100vh",
        gridTemplateRows: "64px 1fr",
        width: "100%",
      }}
    >
      <CssBaseline />
      <div style={{ width: "100%" }}>
        <AppBar
          position="fixed"
          // open={open}
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 0px 0px 0px",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar className={Styles.toolbarStyle}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                // onClick={handleDrawerOpen }
                onClick={handleToggleSidebar}
                edge="start"
                sx={{
                  marginRight: 1,
                  // ...(open && { display: 'none' }),
                  color: "#e4e8ed",
                  // display: { sx: "block", sm: "block", md: "none" },
                  display: {
                    xs: "block", // visible on extra small screens
                    sm: "block", // visible on small screens
                  },
                  "@media (min-width: 769px)": {
                    display: "none", // hide after 768px
                  },
                }}
              >
                {/* {open ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
                {/* </IconButton> */}
                <MenuIcon sx={{ color: "#888888" }} />
              </IconButton>
              <Box>
                {/* Display the logo */}
                <Image
                  className={Styles.logo}
                  publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1690809251/sprk-logoRR_isa0xp.svg"
                  cloudName="dxlzzgbfw"
                />
              </Box>
            </Box>
            <Box className={Styles.notificationBox}>
              <IconButton
                size="large"
                edge="start"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleNotiMenuOpen}
                color="auto"
                className={Styles.styleNotification}
              >
                <Badge
                  badgeContent={notificationsData?.unseenCount}
                  color="error"
                >
                  <NotificationsIcon size="large" color="action" />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="start"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="auto"
                className={Styles.profileMenuStyle}
              >
                {userProfilePic ? (
                  <img
                    src={userProfilePic}
                    className={Styles.ProfileStyle}
                    alt="profile-pic"
                    // loading="lazy"
                  />
                ) : (
                  <Avatar>
                    <AccountCircleIcon className={Styles.avtarStyle} />
                  </Avatar>
                )}
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                      md: "flex",
                      lg: "flex",
                    },
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography className={Styles.empIdStyle}>
                    {" "}
                    {userDetails?.emp_id}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ color: "grey" }} />
                </Box>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <ProfileMenu
          handleMenuClose={handleMenuClose}
          isMenuOpen={isMenuOpen}
        />
        {/* <NotificationMenu
          isNotiOpen={isNotiOpen}
          handleNotiMenuClose={handleNotiMenuClose}
        /> */}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          // backgroundColor: "var(--secondry-color)",
        }}
      >
        <div className={open ? Styles.DrawerDiv : Styles.DrawerDiv2}>
          <Drawer
            variant="permanent"
            open={open}
            className={Styles.drawer}
            // onMouseEnter={handleDrawerOpen}
            // onMouseLeave={handleDrawerClose}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon size="large" color="primary" />
                    ) : (
                      <ChevronLeftIcon size="large" color="primary" />
                    )}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    // gap:1
                  }}
                >
                  <Typography sx={{ ...headingTextStyle, mt: 3 }}>
                    Overview
                  </Typography>
                  <SidebarItem
                    title="Dashboard"
                    icon={PeopleAltIcon}
                    open={open}
                    isActive={activeTab === "Dashboard"}
                    onClick={() => {
                      navigate("/Dashboard");
                      handleTabClick("Dashboard");
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "var(--font-size-small)",
                      fontWeight: "bold",
                      color: "white",
                      mt: 3,
                    }}
                  >
                    My Schedule
                  </Typography>
                  <SidebarItem
                    title="Attendance"
                    icon={PeopleAltIcon}
                    open={open}
                    isActive={activeTab === "Attendance"}
                    onClick={() => {
                      navigate("/Attendance");
                      handleTabClick("Attendance");
                    }}
                  />
                  <SidebarItem
                    title="Exam & Project"
                    icon={PeopleAltIcon}
                    open={open}
                    isActive={activeTab === "Exam"}
                    onClick={() => {
                      navigate("/Exam");
                      handleTabClick("Exam");
                    }}
                  />

                  <Typography sx={{ ...headingTextStyle, mt: 3 }}>
                    Course Details
                  </Typography>
                  <SidebarItem
                    title="Payments"
                    icon={PeopleAltIcon}
                    open={open}
                    isActive={activeTab === "Payments"}
                    onClick={() => {
                      navigate("/Payments");
                      handleTabClick("Payments");
                    }}
                  />

                  <Typography sx={{ ...headingTextStyle, mt: 3 }}>
                    Career
                  </Typography>
                  <SidebarItem
                    title="Certificates"
                    icon={PeopleAltIcon}
                    open={open}
                    isActive={activeTab === "Certificates"}
                    onClick={() => {
                      navigate("/Certificates");
                      handleTabClick("Certificates");
                    }}
                  />

                  <SidebarItem
                    title="Job Opportunities"
                    icon={PeopleAltIcon}
                    open={open}
                    isActive={activeTab === "Job_Opportunities"}
                    onClick={() => {
                      navigate("/Job_Opportunities");
                      handleTabClick("Job_Opportunities");
                    }}
                  />
                </List>
              </div>
              <div>
                <Divider />
              </div>
            </div>
          </Drawer>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            height: "calc(100vh - 65px)",
            //  width:`calc(100% - ${drawerWidth})`,
            overflow: "auto",

            zIndex: (theme) => theme.zIndex.drawer + 0,
          }}
        >
          <Breadcrumb />
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: "100%",
            }}
          >
            <RoutesConfig />
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default Sidebar;
